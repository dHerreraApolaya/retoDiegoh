import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';
import { generateKeyPairSync } from 'node:crypto';
import { isSensitivePath } from '../check-sensitive-files.mjs';
import { normalizeGitPatch } from '../normalize-git-patch.mjs';

test('blocks credential files even when force-added despite gitignore', () => {
  for (const file of [
    '.env',
    '.env.production',
    'release.keystore',
    'nested/debug.keystore',
    'private.pem',
    'AuthKey.p8',
    'service-account-prod.json',
    '.aws/credentials',
  ]) {
    assert.equal(isSensitivePath(file), true, file);
  }
  assert.equal(isSensitivePath('android/app/debug.keystore'), false);
  assert.equal(isSensitivePath('.env.example'), false);
  assert.equal(isSensitivePath('src/Card.ts'), false);
});

test('scanner rejects a synthetic private-key fixture and accepts a safe placeholder', () => {
  const require = createRequire(import.meta.url);
  const scanner = path.join(
    path.dirname(require.resolve('secretlint/package.json')),
    'bin/secretlint.js',
  );
  const run = input =>
    spawnSync(process.execPath, [scanner, '--stdinFileName=fixture.txt'], {
      input,
      encoding: 'utf8',
    });
  // Ephemeral test-only key, generated in memory and never saved or logged.
  const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const fixture = privateKey.export({ type: 'pkcs1', format: 'pem' });
  const rejected = run(fixture);
  assert.equal(
    rejected.status,
    1,
    'scanner must reject the synthetic key marker',
  );
  assert.equal(run('YOUR_API_KEY\n').status, 0);
  for (const marker of ['+', '-']) {
    const patch = fixture
      .split('\n')
      .map(line => marker + line)
      .join('\n');
    assert.equal(run(normalizeGitPatch(Buffer.from(patch))).status, 1);
  }
});

test('staged scan detects an indexed secret even after the worktree is cleaned', () => {
  // Git hooks export repository/index overrides. cwd alone does not isolate Git.
  const env = Object.fromEntries(
    Object.entries(process.env).filter(([name]) => !name.startsWith('GIT_')),
  );
  const directory = mkdtempSync(path.join(tmpdir(), 'reto-staged-scan-'));
  const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
  const file = path.join(directory, 'fixture.txt');
  try {
    assert.equal(
      spawnSync('git', ['init', '--quiet'], { cwd: directory, env }).status,
      0,
    );
    writeFileSync(file, privateKey.export({ type: 'pkcs1', format: 'pem' }));
    assert.equal(
      spawnSync('git', ['add', 'fixture.txt'], { cwd: directory, env }).status,
      0,
    );
    writeFileSync(file, 'YOUR_API_KEY\n');
    const script = fileURLToPath(
      new URL('../check-staged-secrets.mjs', import.meta.url),
    );
    const result = spawnSync(process.execPath, [script], {
      cwd: directory,
      env,
      encoding: 'utf8',
    });
    assert.equal(
      result.status,
      1,
      'a cleaned worktree must not hide an indexed leak',
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
