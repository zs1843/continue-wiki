import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const files = {};
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) throw new Error('不能打包符号链接');
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.isFile() && entry.name !== 'release-manifest.json') files[path.relative(root, file).replaceAll(path.sep, '/')] = createHash('sha256').update(await readFile(file)).digest('hex');
  }
}
await walk(root);
await writeFile(path.join(root, 'release-manifest.json'), JSON.stringify({ version: 1, files }, null, 2) + '\n');
console.log(`已生成 ${Object.keys(files).length} 个文件的 SHA-256 发布清单。`);
