import { execFileSync, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import { normalizeGitPatch } from './normalize-git-patch.mjs';

const require = createRequire(import.meta.url);
const pkg = require.resolve('secretlint/package.json');
const scanner = path.join(path.dirname(pkg), 'bin/secretlint.js');
let patch;
try {
  const shallow = execFileSync(
    'git',
    ['rev-parse', '--is-shallow-repository'],
    {
      encoding: 'utf8',
    },
  ).trim();
  if (shallow === 'true') {
    throw new Error('Incomplete Git history');
  }
  patch = execFileSync(
    'git',
    [
      'log',
      '--all',
      '--format=',
      '--no-ext-diff',
      '-p',
      '--',
      '.',
      ':(exclude)android/app/debug.keystore',
    ],
    { maxBuffer: 64 * 1024 * 1024 },
  );
} catch {
  // Exception buffers may contain unmasked historical secrets: never print them.
  process.stderr.write(
    'Unable to scan full Git history. Fetch complete history and check the patch size limit.\n',
  );
  process.exit(2);
}

if (!patch.length) {
  process.stdout.write('No Git history content to scan.\n');
} else {
  const result = spawnSync(
    process.execPath,
    [scanner, '--stdinFileName=history.patch'],
    {
      input: normalizeGitPatch(patch),
      maxBuffer: 8 * 1024 * 1024,
      encoding: 'utf8',
    },
  );
  // Secretlint masks detected values by default. Never disable that behavior.
  process.stdout.write(result.stdout ?? '');
  process.stderr.write(result.stderr ?? '');
  process.exitCode = result.status ?? 2;
}
