import { readFile, readdir, lstat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';
import { loadArticles, cleanFolder } from './content.mjs';
import { createMindmaps } from './mindmaps.mjs';
const root = fileURLToPath(new URL('../dist/', import.meta.url));
const allowed = new Set(['_astro', 'pagefind', 'notes', 'mindmaps', 'images', 'index.html', '404.html', 'favicon.svg', 'sitemap.xml', 'release-manifest.json']);
for (const name of await readdir(root)) if (!allowed.has(name)) throw new Error(`产物包含非预期文件：${name}`);
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) throw new Error('产物不能包含符号链接');
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else files.push(file);
  }
}
await walk(root);
const pages = new Map();
for (const file of files.filter(file => file.endsWith('.html'))) pages.set(file, load(await readFile(file, 'utf8')));
for (const [file, $] of pages) {
  for (const el of $('a[href],script[src],link[href],img[src]').toArray()) {
    const link = $(el).attr('href') ?? $(el).attr('src');
    if (!link || /^(?:https?:|mailto:|data:)/.test(link)) continue;
    if (link.startsWith('//')) throw new Error('不允许协议相对链接');
    const currentPath = `/${path.relative(root, file).replaceAll(path.sep, '/')}`;
    const url = new URL(link, `https://local.invalid${currentPath}`);
    let target = path.join(root, decodeURIComponent(url.pathname));
    if (url.pathname.endsWith('/')) target = path.join(target, 'index.html');
    try { if (!(await lstat(target)).isFile()) throw new Error(); } catch { throw new Error(`产物断链：${path.relative(root, file)} -> ${link}`); }
    if (url.hash && pages.has(target)) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (!pages.get(target)('[id]').toArray().some(el => pages.get(target)(el).attr('id') === id)) throw new Error(`标题锚点不存在：${link}`);
    }
  }
}
const articles = await loadArticles(fileURLToPath(new URL('../content/', import.meta.url)));
const expected = new Set(articles.filter(a => a.status === 'published').map(a => a.slug));
const contentRoot = fileURLToPath(new URL('../content/', import.meta.url));
const home = pages.get(path.join(root, 'index.html'));
for (const article of articles.filter(a => a.status === 'published')) {
  const folderNames = path.relative(contentRoot, article.file).split(path.sep).slice(0, -1).map(cleanFolder);
  const expectedParents = folderNames.map((_, i) => `/${folderNames.slice(0, i + 1).join('/')}`);
  const navLink = home('nav a.note-link').filter((_, el) => home(el).attr('href') === `/notes/${article.slug}/`);
  const actualParents = navLink.parents('details').toArray().reverse().map(el => home(el).attr('data-folder'));
  if (navLink.length !== 1 || JSON.stringify(actualParents) !== JSON.stringify(expectedParents)) throw new Error(`目录与内容文件夹不一致：${article.slug}`);
}
const generated = (await readdir(path.join(root, 'notes'))).sort();
if (generated.length !== expected.size || generated.some(slug => !expected.has(slug))) throw new Error('公开文章路由与发布清单不一致');
const maps = createMindmaps(articles, contentRoot);
for (const map of maps) {
  const page = pages.get(path.join(root, 'mindmaps', map.slug, 'index.html'));
  if (!page) throw new Error(`导图页面缺失：${map.slug}`);
  const serialized = JSON.parse(page('#mindmap-data').text());
  const urls = [];
  function collect(node) {
    if (node && typeof node === 'object') {
      if (node.type === 'link') urls.push(node.url);
      for (const value of Object.values(node)) collect(value);
    }
  }
  collect(serialized);
  for (const link of urls) {
    const url = new URL(link, 'https://local.invalid');
    const target = pages.get(path.join(root, decodeURIComponent(url.pathname), 'index.html'));
    if (url.origin !== 'https://local.invalid' || !expected.has(url.pathname.split('/')[2]) || !target) throw new Error(`导图链接不指向公开笔记：${link}`);
    if (url.hash && !target('[id]').toArray().some(el => target(el).attr('id') === decodeURIComponent(url.hash.slice(1)))) throw new Error(`导图章节不存在：${link}`);
  }
}
for (const draft of articles.filter(a => a.status === 'draft')) {
  for (const file of files.filter(file => /\.(html|xml|json|js)$/.test(file))) {
    const text = await readFile(file, 'utf8');
    if (text.includes(`/notes/${draft.slug}/`) || text.includes(draft.title)) throw new Error('草稿泄露到公开产物');
  }
}
console.log(`产物检查通过：${pages.size} 个 HTML 页面，站内链接、资源引用及草稿隔离正常。`);
