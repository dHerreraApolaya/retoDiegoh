import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateToolchain } from '../check-toolchain.mjs';

const baseline = {
  manifest: {
    engines: { node: '24.22.1', pnpm: '10.34.8' },
    packageManager: 'pnpm@10.34.8',
  },
  nodeVersion: '24.22.1',
  userAgent: 'pnpm/10.34.8 npm/? node/v24.22.1',
  pins: ['24.22.1', '24.22.1'],
  locks: [],
};

test('accepts the agreed toolchain', () => {
  assert.deepEqual(validateToolchain(baseline), []);
});

test('rejects unsupported Node and other package managers', () => {
  assert.equal(
    validateToolchain({
      ...baseline,
      nodeVersion: '22.20.0',
      userAgent: 'npm/10.9.3',
    }).length,
    2,
  );
});

test('rejects a different pnpm patch version', () => {
  assert.equal(
    validateToolchain({ ...baseline, userAgent: 'pnpm/10.34.7 npm/?' }).length,
    1,
  );
});

test('rejects drifting pins and competing lockfiles', () => {
  assert.equal(
    validateToolchain({ ...baseline, pins: ['24.22.0'], locks: ['yarn.lock'] })
      .length,
    2,
  );
});

test('rejects mixed React Native helper and React renderer versions', () => {
  const errors = validateToolchain({
    ...baseline,
    manifest: {
      ...baseline.manifest,
      dependencies: { react: '19.2.3', 'react-native': '0.87.1' },
      devDependencies: {
        '@react-native/jest-preset': '0.86.0',
        'react-test-renderer': '19.1.0',
      },
    },
  });
  assert.equal(errors.length, 2);
});

test('rejects mixed Firebase native module versions', () => {
  assert.equal(
    validateToolchain({
      ...baseline,
      manifest: {
        ...baseline.manifest,
        dependencies: {
          '@react-native-firebase/app': '27.1.0',
          '@react-native-firebase/auth': '27.0.0',
        },
      },
    }).length,
    1,
  );
});
