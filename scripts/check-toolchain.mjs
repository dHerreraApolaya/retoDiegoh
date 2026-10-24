import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import process from 'node:process';

export function validateToolchain({
  manifest,
  nodeVersion,
  userAgent,
  pins,
  locks,
}) {
  const errors = [];
  const expectedNode = manifest.engines.node;
  const expectedPnpm = manifest.packageManager.replace('pnpm@', '');
  if (nodeVersion !== expectedNode) {
    errors.push(`Use Node ${expectedNode}; found ${nodeVersion}. Run nvm use.`);
  }
  if (pins.some(pin => pin !== expectedNode)) {
    errors.push('Node pins must match package.json engines.node.');
  }
  if (manifest.engines.pnpm !== expectedPnpm) {
    errors.push('pnpm engine must match packageManager.');
  }
  if (!userAgent?.startsWith(`pnpm/${expectedPnpm} `)) {
    errors.push(
      `Use pnpm ${expectedPnpm}; npm/yarn and other pnpm versions are unsupported.`,
    );
  }
  if (locks.length) {
    errors.push(
      `Remove competing lockfiles: ${locks.join(', ')}. Commit pnpm-lock.yaml only.`,
    );
  }
  const dependencies = manifest.dependencies ?? {};
  const devDependencies = manifest.devDependencies ?? {};
  const reactNative = dependencies['react-native'];
  if (reactNative) {
    const helpers = {
      ...Object.fromEntries(
        Object.entries(dependencies).filter(([name]) =>
          name.startsWith('@react-native/'),
        ),
      ),
      ...Object.fromEntries(
        Object.entries(devDependencies).filter(([name]) =>
          name.startsWith('@react-native/'),
        ),
      ),
    };
    if (Object.values(helpers).some(version => version !== reactNative)) {
      errors.push(
        'React Native and its @react-native helper packages must use the same exact version.',
      );
    }
  }
  if (
    dependencies.react &&
    devDependencies['react-test-renderer'] !== dependencies.react
  ) {
    errors.push(
      'React and react-test-renderer must use the same exact version.',
    );
  }
  const firebase = Object.entries(dependencies).filter(([name]) =>
    name.startsWith('@react-native-firebase/'),
  );
  if (new Set(firebase.map(([, version]) => version)).size > 1) {
    errors.push(
      'React Native Firebase modules must use the same exact version.',
    );
  }
  return errors;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const manifest = JSON.parse(readFileSync('package.json', 'utf8'));
  const errors = validateToolchain({
    manifest,
    nodeVersion: process.versions.node,
    userAgent: process.env.npm_config_user_agent,
    pins: ['.nvmrc', '.node-version'].map(file =>
      readFileSync(file, 'utf8').trim(),
    ),
    locks: ['package-lock.json', 'yarn.lock', 'npm-shrinkwrap.json'].filter(
      existsSync,
    ),
  });
  if (errors.length) {
    process.stderr.write(`${errors.join('\n')}\n`);
    process.exitCode = 1;
  } else {
    process.stdout.write(
      `Toolchain verified: Node ${manifest.engines.node}, ${manifest.packageManager}.\n`,
    );
  }
}
