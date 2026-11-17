import { mkdir, readdir, readFile, writeFile, unlink, lstat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadArticles, validateArticleLinks } from './content.mjs';
import { createMindmaps } from './mindmaps.mjs';

const contentRoot = fileURLToPath(new URL('../content/', import.meta.url));
const output = fileURLToPath(new URL('../mindmaps/', import.meta.url));
const check = process.argv.includes('--check');
const articles = await loadArticles(contentRoot);
validateArticleLinks(articles);
const maps = createMindmaps(articles, contentRoot);
const expected = new Map(maps.map(map => [`${map.slug}.md`, map.source]));
try {
  if ((await lstat(output)).isSymbolicLink()) throw new Error('mindmaps 目录不能是符号链接');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
  if (check) throw new Error('缺少导图目录，请先运行 npm run maps');
  await mkdir(output);
}
const differences = [];
for (const file of await readdir(output)) {
  if (!file.endsWith('.md')) continue;
  const full = path.join(output, file);
  if (!(await lstat(full)).isFile()) throw new Error('导图文件不能是符号链接或目录');
  const previous = await readFile(full, 'utf8');
  if (!previous.startsWith('---\ngenerated_by: note-mindmaps\n')) {
    if (expected.has(file)) throw new Error(`拒绝覆盖手写文件：${file}`);
    continue;
  }
  if (!expected.has(file)) {
    differences.push(file);
    if (!check) await unlink(full);
  }
}
for (const [file, source] of expected) {
  const full = path.join(output, file);
  let previous;
  try { previous = await readFile(full, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  if (previous !== source) {
    differences.push(file);
    if (!check) await writeFile(full, source);
  }
}
if (check && differences.length) throw new Error(`导图需要同步，请运行 npm run maps：${differences.join('、')}`);
console.log(`${check ? '导图同步检查通过' : '导图已同步'}：${maps.length} 张，${maps[0].noteCount} 篇公开笔记，${maps[0].pointCount} 个关键知识点。`);
