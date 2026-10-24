import reactNative from '@react-native/eslint-config/flat';
import query from '@tanstack/eslint-plugin-query';
import hooks from 'eslint-plugin-react-hooks';

const snapshotMatchers = [
  'toMatchSnapshot',
  'toMatchInlineSnapshot',
  'toThrowErrorMatchingSnapshot',
  'toThrowErrorMatchingInlineSnapshot',
];
const snapshotRestrictions = Object.fromEntries(
  [
    '',
    'not.',
    'resolves.',
    'rejects.',
    'resolves.not.',
    'rejects.not.',
  ].flatMap(prefix =>
    snapshotMatchers.map(matcher => [
      `${prefix}${matcher}`,
      'Assert observable behavior with semantic queries; snapshot tests are prohibited.',
    ]),
  ),
);

export default [
  {
    ignores: [
      '**/node_modules/**',
      'coverage/**',
      'vendor/**',
      'android/**',
      'ios/**',
      '.husky/**',
      '.agents/skills/react-native-best-practices/**',
    ],
  },
  ...reactNative,
  ...query.configs['flat/recommended'],
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      ...hooks.configs.flat['recommended-latest'].rules,
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    rules: {
      'no-console': 'error',
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'jest/no-restricted-matchers': ['error', snapshotRestrictions],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            'react-native/Libraries/**',
            'react-native/src/private/**',
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: { '@typescript-eslint/no-explicit-any': 'error' },
  },
];
