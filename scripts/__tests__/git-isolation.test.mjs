import assert from 'node:assert/strict';
import { test } from 'node:test';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

test('staged-secret fixtures preserve an enclosing hook repository and index', () => {
  const directory = mkdtempSync(path.join(tmpdir(), 'reto-hook-context-'));
  const env = Object.fromEntries(
    Object.entries(process.env).filter(
      ([name]) => !name.startsWith('GIT_') && name !== 'NODE_TEST_CONTEXT',
    ),
  );
  const git = args => spawnSync('git', args, { cwd: directory, env });
  try {
    assert.equal(git(['init', '--quiet']).status, 0);
    writeFileSync(path.join(directory, 'marker.txt'), 'safe fixture\n');
    assert.equal(git(['add', 'marker.txt']).status, 0);
    const gitDirectory = path.join(directory, '.git');
    const indexPath = path.join(gitDirectory, 'index');
    const beforeIndex = readFileSync(indexPath);
    const beforeConfig = readFileSync(path.join(gitDirectory, 'config'));
    const target = fileURLToPath(
      new URL('./secret-policy.test.mjs', import.meta.url),
    );
    const result = spawnSync(
      process.execPath,
      ['--test', '--test-name-pattern=staged scan detects', target],
      {
        cwd: directory,
        env: {
          ...env,
          GIT_DIR: gitDirectory,
          GIT_COMMON_DIR: gitDirectory,
          GIT_INDEX_FILE: indexPath,
        },
        encoding: 'utf8',
      },
    );
    assert.deepEqual(
      readFileSync(indexPath),
      beforeIndex,
      'hook index must stay unchanged',
    );
    assert.deepEqual(
      readFileSync(path.join(gitDirectory, 'config')),
      beforeConfig,
      'hook configuration must stay unchanged',
    );
    assert.equal(
      result.status,
      0,
      'fixture scanner must pass with inherited hook Git variables',
    );
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
