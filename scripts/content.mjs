import { readdir, readFile, lstat } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import GithubSlugger from 'github-slugger';

/** @typedef {{label:string,heading?:string}} MindmapPoint */
/** @typedef {{title:string,slug:string,status:'draft'|'published',order?:number,updated?:string,mindmap?:MindmapPoint[]}} Metadata */
/** @returns {Metadata} */
export function validateMetadata(data) {
  if (!data || typeof data !== 'object') throw new Error('缺少文章元数据');
  if (typeof data.title !== 'string' || !data.title.trim()) throw new Error('title 必须是非空字符串');
  if (typeof data.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug)) throw new Error('slug 必须是小写英文、数字和单连字符');
  const status = data.status ?? 'draft';
  if (!['draft', 'published'].includes(status)) throw new Error('status 仅支持 draft 或 published');
  if (data.order !== undefined && (!Number.isInteger(data.order) || data.order < 0)) throw new Error('order 必须为非负整数');
  if (data.updated !== undefined && (typeof data.updated !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.updated) || !Number.isFinite(Date.parse(data.updated)) || new Date(data.updated).toISOString().slice(0, 10) !== data.updated)) throw new Error('updated 必须是有效的日期字符串 YYYY-MM-DD（加引号）');
  let mindmap;
  if (data.mindmap !== undefined) {
    if (!Array.isArray(data.mindmap) || data.mindmap.length > 8) throw new Error('mindmap 必须是最多 8 个关键知识点的数组');
    mindmap = data.mindmap.map(point => {
      if (!point || typeof point !== 'object' || typeof point.label !== 'string' || !point.label.trim() || point.label.length > 100 || /[\r\n\x00-\x1f]/.test(point.label)) throw new Error('导图知识点 label 必须是 1–100 字的单行文字');
      if (point.heading !== undefined && (typeof point.heading !== 'string' || !point.heading.trim() || /[\r\n\x00-\x1f]/.test(point.heading))) throw new Error('导图 heading 必须是有效的章节锚点');
      return { label: point.label.trim(), ...(point.heading === undefined ? {} : { heading: point.heading.trim() }) };
    });
  }
  return { title: data.title.trim(), slug: data.slug, status, order: data.order, updated: data.updated, ...(mindmap ? { mindmap } : {}) };
}
export const cleanFolder = folder => folder.replace(/^\d+[-_ ]*/, '');
const localImage = /^\/images\/[a-z0-9]+(?:[a-z0-9-]*[a-z0-9])?\.(?:png|jpe?g|webp|svg)$/;

export async function markdownFiles(root) {
  const files = [];
  if ((await lstat(root)).isSymbolicLink()) throw new Error('内容根目录不能为符号链接');
  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      if (entry.isSymbolicLink()) throw new Error('内容目录不允许符号链接');
      const file = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(file);
      else if (entry.isFile() && file.endsWith('.md')) files.push(file);
    }
  }
  await walk(root);
  return files.sort();
}
export async function loadArticles(root) {
  const articles = [], slugs = new Set();
  for (const file of await markdownFiles(root)) {
    const { data, content } = matter(await readFile(file, 'utf8'));
    let metadata;
    try { metadata = validateMetadata(data); } catch (error) { throw new Error(`${path.relative(root, file)}: ${error.message}`); }
    if (slugs.has(metadata.slug)) throw new Error(`重复 slug: ${metadata.slug}`);
    slugs.add(metadata.slug);
    const tree = unified().use(remarkParse).use(remarkGfm).parse(content);
    const headings = new Set(), links = [], slugger = new GithubSlugger(), definitions = new Map();
    visit(tree, 'heading', heading => {
      let text = '';
      visit(heading, node => { if (node.type === 'text' || node.type === 'inlineCode') text += node.value; });
      headings.add(slugger.slug(text));
    });
    visit(tree, 'definition', node => definitions.set(node.identifier, node.url));
    visit(tree, node => {
      if (node.type === 'link' || node.type === 'image') links.push(node.url);
      if (node.type === 'linkReference' || node.type === 'imageReference') {
        if (!definitions.has(node.identifier)) throw new Error('未定义的 Markdown 引用');
        links.push(definitions.get(node.identifier));
      }
      // 原始 HTML 会绕开 Markdown 链接与内容边界检查，首版仅允许标准 Markdown。
      if (node.type === 'html' && !/^\s*<!--[\s\S]*-->\s*$/.test(node.value)) throw new Error(`${metadata.slug}: 请使用 Markdown，不要嵌入 HTML`);
    });
    if (metadata.status === 'published') {
      for (const point of metadata.mindmap ?? []) {
        if (point.heading && !headings.has(point.heading)) throw new Error(`${metadata.slug}: 导图指向不存在的章节 ${point.heading}`);
      }
    }
    articles.push({ ...metadata, file, content, headings, links });
  }
  return articles;
}
export function validateArticleLinks(articles) {
  const published = new Map(articles.filter(a => a.status === 'published').map(a => [a.slug, a]));
  for (const article of published.values()) {
    for (const link of article.links) {
      if (/^https?:\/\//.test(link)) continue;
      if (link === '/') continue;
      if (localImage.test(link)) continue;
      const match = link.match(/^\/notes\/([a-z0-9-]+)\/(?:#(.+))?$/);
      const target = link.startsWith('#') ? article : match ? published.get(match[1]) : undefined;
      const hash = link.startsWith('#') ? link.slice(1) : match?.[2];
      if (!target || (hash && !target.headings.has(decodeURIComponent(hash)))) throw new Error(`${article.slug}: 无效站内链接或链接指向草稿 ${link}`);
    }
  }
}

export async function validateArticleAssets(articles, publicRoot) {
  const images = new Set(articles.filter(article => article.status === 'published').flatMap(article => article.links).filter(link => localImage.test(link)));
  if (!images.size) return;
  const directory = path.join(publicRoot, 'images');
  const directoryInfo = await lstat(directory);
  if (directoryInfo.isSymbolicLink() || !directoryInfo.isDirectory()) throw new Error('图片目录必须是 public 内的真实目录');
  for (const link of images) {
    const file = path.join(publicRoot, link.slice(1));
    let info;
    try { info = await lstat(file); } catch { throw new Error(`笔记图片不存在：${link}`); }
    if (info.isSymbolicLink() || !info.isFile()) throw new Error(`笔记图片必须是本地真实文件：${link}`);
  }
}
