export function normalizeGitPatch(patch) {
  return patch
    .toString('utf8')
    .split('\n')
    .map(line => {
      if (line.startsWith('+++ ') || line.startsWith('--- ')) {
        return line;
      }
      return /^[ +-]/.test(line) ? line.slice(1) : line;
    })
    .join('\n');
}
