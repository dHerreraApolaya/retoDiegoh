import {existsSync, readFileSync, readdirSync} from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// Deliberately scoped to project-owned Markdown and simple inline file links.
const root = process.cwd();
const ownedSkills = [
  'build-feature',
  'native-integration',
  'review-change',
  'mobile-security-review',
];
const targets = [
  'README.md',
  'AGENTS.md',
  'SECURITY.md',
  'docs',
  'specs',
  '.github/AGENTS.md',
  '.github/pull_request_template.md',
  ...ownedSkills.map(name => `.agents/skills/${name}/SKILL.md`),
];

function markdownFiles(target) {
  const absolute = path.resolve(root, target);
  if (!existsSync(absolute)) {
    throw new Error(`Missing documentation entry point: ${target}`);
  }
  if (target.endsWith('.md')) {
    return [absolute];
  }
  return readdirSync(absolute, {withFileTypes: true}).flatMap(entry => {
    const child = path.join(target, entry.name);
    if (entry.isDirectory()) {
      return markdownFiles(child);
    }
    return entry.name.endsWith('.md') ? [path.resolve(root, child)] : [];
  });
}

let checkedLinks = 0;
const failures = [];
const files = [...new Set(targets.flatMap(markdownFiles))];
for (const file of files) {
  const markdown = readFileSync(file, 'utf8').replace(/```[^]*?```/g, '');
  for (const match of markdown.matchAll(/\[[^\]\n]*\]\(([^)\n]+)\)/g)) {
    const target = match[1].trim().replace(/^<|>$/g, '');
    if (/^(?:[a-z][a-z\d+.-]*:|#)/i.test(target)) {
      continue;
    }
    const localPath = decodeURIComponent(target.split(/[?#]/)[0]);
    if (!localPath) {
      continue;
    }
    checkedLinks += 1;
    if (!existsSync(path.resolve(path.dirname(file), localPath))) {
      failures.push(`${path.relative(root, file)} -> ${target}`);
    }
  }
}

if (failures.length) {
  process.stderr.write(`Broken local documentation links:\n${failures.join('\n')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`Checked ${checkedLinks} local links in ${files.length} project-owned Markdown files.\n`);
}
