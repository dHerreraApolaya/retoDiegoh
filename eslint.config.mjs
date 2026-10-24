import reactNative from '@react-native/eslint-config/flat';
import query from '@tanstack/eslint-plugin-query';
import hooks from 'eslint-plugin-react-hooks';

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
