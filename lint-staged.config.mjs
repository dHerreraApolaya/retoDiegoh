export default {
  '*.{js,jsx,ts,tsx,cjs,mjs}': ['eslint --max-warnings=0', 'prettier --check'],
  '*.{json,md,yml,yaml}': ['prettier --check'],
};
