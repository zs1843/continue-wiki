import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm, symlink, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { loadArticles, validateMetadata, validateArticleLinks, validateArticleAssets } from '../scripts/content.mjs';

async function fixture(run) {
  const root = await mkdtemp(path.join(tmpdir(), 'ai-wiki-content-'));
  try { await run(root); } finally { await rm(root, { recursive: true, force: true }); }
}
const note = (slug, extra = '', body = '') => `---\ntitle: "${slug}"\nslug: ${slug}\n${extra}---\n${body}`;
test('新文章默认草稿；错误发布状态、日期和字段类型被拒绝', () => {
  assert.equal(validateMetadata({ title: '示例', slug: 'example' }).status, 'draft');
  for (const data of [{ status: 'public' }, { order: '1' }, { updated: '2026-02-31' }, { title: '' }, { slug: '../escape' }]) {
    assert.throws(() => validateMetadata({ title: '示例', slug: 'example', ...data }));
  }
});
test('新增嵌套文件夹被发现，重复 slug 使检查失败', () => fixture(async root => {
  await mkdir(path.join(root, '分类', '子分类'), { recursive: true });
  await writeFile(path.join(root, '分类', '子分类', 'a.md'), note('example'));
  assert.equal((await loadArticles(root)).length, 1);
  await writeFile(path.join(root, 'b.md'), note('example'));
  await assert.rejects(loadArticles(root), /重复 slug/);
}));
test('公开文章不能链接草稿、缺失页面和不存在的锚点', () => fixture(async root => {
  await writeFile(path.join(root, 'draft.md'), note('private-draft'));
  for (const link of ['/notes/private-draft/', '/notes/missing/', '#missing']) {
    await writeFile(path.join(root, 'public.md'), note('public-note', 'status: published\n', `[链接](${link})`));
    const articles = await loadArticles(root);
    assert.throws(() => validateArticleLinks(articles), /无效站内链接/);
  }
}));
test('有效中文锚点和外部来源链接通过检查', () => fixture(async root => {
  await writeFile(path.join(root, 'public.md'), note('public-note', 'status: published\n', '## 概念\n\n[定位](#概念)\n\n[来源](https://example.com/reference)'));
  const articles = await loadArticles(root);
  assert.doesNotThrow(() => validateArticleLinks(articles));
}));
test('符号链接不能将内容根目录之外的资料带入构建', () => fixture(async root => {
  await symlink('/private/tmp', path.join(root, 'outside'));
  await assert.rejects(loadArticles(root), /符号链接/);
}));

test('正文配图及原图链接可发布，缺失图片和图片符号链接被拒绝', () => fixture(async root => {
  const content = path.join(root, 'content'), publicRoot = path.join(root, 'public');
  await mkdir(content);
  await mkdir(path.join(publicRoot, 'images'), { recursive: true });
  await writeFile(path.join(content, 'public.md'), note('public-note', 'status: published\n', '[![流程图](/images/mcp-flow.svg)](/images/mcp-flow.svg)'));
  const articles = await loadArticles(content);
  assert.doesNotThrow(() => validateArticleLinks(articles));
  await assert.rejects(validateArticleAssets(articles, publicRoot), /图片不存在/);
  const image = path.join(publicRoot, 'images/mcp-flow.svg');
  await writeFile(image, '<svg xmlns="http://www.w3.org/2000/svg"/>');
  await assert.doesNotReject(validateArticleAssets(articles, publicRoot));
  await rm(image);
  await symlink(path.join(content, 'public.md'), image);
  await assert.rejects(validateArticleAssets(articles, publicRoot), /本地真实文件/);
}));

test('图片路径不能绕过站内链接检查', () => fixture(async root => {
  for (const link of ['/images/../private.svg', '/images/private.txt', '/images/%2e%2e/private.svg']) {
    await writeFile(path.join(root, 'public.md'), note('public-note', 'status: published\n', `![图片](${link})`));
    const articles = await loadArticles(root);
    assert.throws(() => validateArticleLinks(articles), /无效站内链接/);
  }
}));
