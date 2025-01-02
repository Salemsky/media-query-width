import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { gzipSync } from 'node:zlib';

import { minify_sync } from 'terser';

import pkg from './package.json' with { type: 'json' };

transform('index.mjs', pkg.exports['.']);
transform('lite.mjs', pkg.exports['./lite']);

function write(file, data) {
  const defs = {
    compress: true,
    mangle: { toplevel: true },
  };

  data = minify_sync(data, defs).code || '';

  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, data);

  const [raw, gzip] = [Buffer.byteLength(data), gzipSync(data).byteLength].map(
    (n) => (n < 1024 ? `${n} b` : `${(n / 1024).toFixed(2)} kb`),
  );

  console.log('%s - %s (%s)', file, raw, gzip);
}

function transform(src, mod) {
  const data = readFileSync(src, 'utf8');

  write(mod.require, data.replace('export const', 'exports.'));
  write(mod.import, data);
}
