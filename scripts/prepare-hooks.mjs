import husky from 'husky';

if (!process.env.CI && process.env.NODE_ENV !== 'production') {
  const message = husky();
  if (message) {
    process.stderr.write(`${message}\n`);
    process.exitCode = 1;
  }
}
