module.exports = {
  preset: '@react-native/jest-preset',
  watchman: false,
  testPathIgnorePatterns: ['/node_modules/', '/scripts/__tests__/'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
};
