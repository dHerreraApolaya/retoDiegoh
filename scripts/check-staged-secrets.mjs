import { execFileSync, spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const require = createRequire(import.meta.url);
const scanner = path.join(
  path.dirname(require.resolve('secretlint/package.json')),
  'bin/secretlint.js',
);
const config = fileURLToPath(new URL('../.secretlintrc.json', import.meta.url));
const files = execFileSync(
  'git',
  ['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z'],
  { encoding: 'utf8' },
)
  .split('\0')
  .filter(Boolean);

for (const file of files) {
  if (file === 'android/app/debug.keystore') {
    continue;
  }
  // Read the index, not the worktree: unstaged edits must not hide a staged leak.
  let content;
  try {
    content = execFileSync('git', ['show', `:0:${file}`], {
      maxBuffer: 32 * 1024 * 1024,
    });
  } catch {
    // Git exception buffers can contain unmasked file contents.
    process.stderr.write(
      'Unable to read a staged file; check index state and the scan size limit.\n',
    );
    process.exitCode = 2;
    continue;
  }
  if (content.includes(0)) {
    continue; // Known credential file paths are checked separately, even for binaries.
  }
  const result = spawnSync(
    process.execPath,
    [
      scanner,
      `--stdinFileName=${file}`,
      '--secretlintrc',
      config,
      '--no-gitignore',
    ],
    {
      input: content,
      encoding: 'utf8',
      maxBuffer: 8 * 1024 * 1024,
    },
  );
  process.stdout.write(result.stdout ?? '');
  process.stderr.write(result.stderr ?? '');
  if (result.status !== 0) {
    process.exitCode = result.status ?? 2;
  }
}
