import assert from 'node:assert/strict';
import { test } from 'node:test';
import { transformFileSync } from '@babel/core';
import { ESLint } from 'eslint';

test('the project Babel pipeline compiles the app with React memoization', () => {
  const result = transformFileSync('App.tsx');
  assert.match(result.code, /react\/compiler-runtime/);
  assert.match(result.code, /react\.memo_cache_sentinel/);
});

const eslint = new ESLint();

async function lintRules(source) {
  const [result] = await eslint.lintText(source, {
    filePath: 'src/HookPolicyFixture.tsx',
  });
  return result.messages.map(message => message.ruleId);
}

test('missing effect dependencies fail the project lint rules', async () => {
  const rules = await lintRules(`
    import { useEffect } from 'react';
    export function useNotify(value: string, notify: (value: string) => void) {
      useEffect(() => { notify(value); }, []);
    }
  `);
  assert.ok(rules.includes('react-hooks/exhaustive-deps'));
});

test('mutating props and copying derived state into effects are rejected', async () => {
  const rules = await lintRules(`
    import { useEffect, useState } from 'react';
    export function BadExample({ item }: { item: { name: string } }) {
      const [label, setLabel] = useState('');
      item.name = 'changed';
      useEffect(() => { setLabel(item.name); }, [item.name]);
      return <>{label}</>;
    }
  `);
  assert.ok(rules.includes('react-hooks/immutability'));
  assert.ok(rules.includes('react-hooks/set-state-in-effect'));
});
