import { strictEqual } from 'node:assert';
import { describe, test } from 'node:test';

import { mediaQueryWidth } from '../index.mjs';

/**
 * @template {Record<string, number>} t1
 * @template {Record<string, number>} t2
 * @template {number} t3
 * @param {Parameters<typeof mediaQueryWidth.bind<t1, t2, t3>>[0]} ctx
 * @param {Array<import('..').Params<t3, t1, t2>>} args
 * @returns {import('..').Fn<{c?: 'red'}>}
 */
const mqw = (ctx, ...args) => mediaQueryWidth.bind(ctx)(...args);

const arr = [
  ['display:block;'],
  'color:',
  (/** @type {{c?: string}} */ { c }) => c,
  ';',
  { zIndex: 1 },
];

describe('mediaQueryWidth', () => {
  test('single binding context', () => {
    const fn = mqw({ a: 160 }, { min: 'a' });
    strictEqual(fn(), '@media (min-width:10em)');
  });

  test('multiple binding context', () => {
    const fn = mqw({ min: { a: 160 }, max: {} }, { min: 'a' });
    strictEqual(fn(), '@media (min-width:10em)');
  });

  test('custom width', () => {
    const fn = mqw({ a: 400 }, { min: 'a' });
    strictEqual(fn(), '@media (min-width:25em)');
  });

  test('override size', () => {
    const fn = mqw({ a: 160 }, { size: 1, min: 'a' });
    strictEqual(fn(), '@media (min-width:160px)');
  });

  test('min and max', () => {
    const fn = mqw({ a: 160, b: 320 }, { min: 'a', max: 'b' });
    strictEqual(fn(), '@media (min-width:10em) and (max-width:20em)');
  });

  test('undefined value', () => {
    const fn = mqw({}, { size: 1, min: undefined, max: undefined });
    strictEqual(fn(), '');
  });

  test('accept prop using template', () => {
    const fn = mqw({})`${[arr]}`;
    strictEqual(fn({ c: 'red' }), 'display:block;color:red;z-index:1;');
  });

  test('accept prop using array', () => {
    const fn = mqw({})([[arr]]);
    strictEqual(fn({ c: 'red' }), 'display:block;color:red;z-index:1;');
  });

  test('returns empty', () => {
    const fn = mqw({})``,
      fn1 = mqw({})(['']);
    strictEqual(fn() || fn1(), '');
  });

  test('query with template', () => {
    const fn = mqw({ a: 160 }, { min: 'a' })`display:block;`;
		strictEqual(fn(), '@media (min-width:10em){display:block;}');
  });
});

