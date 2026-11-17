import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm, copyFile, symlink, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { parse } from '@markmap/parse';
import { loadArticles, validateMetadata } from '../scripts/content.mjs';
import { createMindmaps } from '../scripts/mindmaps.mjs';

const project = fileURLToPath(new URL('../', import.meta.url));
async function fixture(run) {
  const root = await mkdtemp(path.join(tmpdir(), 'note-mindmaps-'));
  try { await run(root); } finally { await rm(root, { recursive: true, force: true }); }
}
function article({ title = '公开概念', slug = 'concept', status = 'published', label = '关键机制', heading = '中文章节' } = {}) {
  return `---\ntitle: ${JSON.stringify(title)}\nslug: ${slug}\nstatus: ${status}\nmindmap:\n  - label: ${JSON.stringify(label)}\n    heading: ${JSON.stringify(heading)}\n---\n\n## 中文章节\n\n概念说明。\n`;
}
function collectLinks(tree) {
  const links = [];
  const visit = value => {
    if (value && typeof value === 'object') {
      if (value.type === 'link') links.push(value.url);
      Object.values(value).forEach(visit);
    }
  };
  visit(tree);
  return links;
}
test('导图只包含公开笔记，跨主题生成，节点可以定位中文章节', () => fixture(async root => {
  await mkdir(path.join(root, '01-AI'));
  await mkdir(path.join(root, '02-阅读'));
  await writeFile(path.join(root, '01-AI/a.md'), article());
  await writeFile(path.join(root, '02-阅读/b.md'), article({ slug: 'reading', title: '阅读方法' }));
  await writeFile(path.join(root, '01-AI/private.md'), article({ slug: 'private-draft', title: '私人草稿标题', status: 'draft', label: '私人关键点' }));
  const maps = createMindmaps(await loadArticles(root), root);
  assert.equal(maps.length, 3);
  assert.equal(maps[0].noteCount, 2);
  assert.equal(maps[0].pointCount, 2);
  assert.deepEqual(maps.slice(1).map(map => map.title), ['AI', '阅读']);
  for (const map of maps) {
    assert.doesNotMatch(map.source, /private-draft|私人草稿标题|私人关键点/);
    const links = collectLinks(parse(map.markdown).root);
    assert.ok(links.length > 0);
    assert.ok(links.every(link => link.startsWith('/notes/')));
  }
  assert.ok(collectLinks(parse(maps[0].markdown).root).includes(`/notes/concept/#${encodeURIComponent('中文章节')}`));
}));

test('错误的知识点元数据与失效章节被拒绝', () => fixture(async root => {
  for (const mindmap of ['wrong', [{ label: '' }], [{ label: '多行\n文字' }], [{ label: '有效', heading: 42 }], Array.from({ length: 9 }, () => ({ label: '过多' }))]) {
    assert.throws(() => validateMetadata({ title: '概念', slug: 'concept', mindmap }), /mindmap|导图/);
  }
  await writeFile(path.join(root, 'a.md'), article({ heading: '已被删除的章节' }));
  await assert.rejects(loadArticles(root), /导图指向不存在的章节/);
}));

test('节点中的 Markdown 和 HTML 作为文字显示，不生成额外链接', () => fixture(async root => {
  await writeFile(path.join(root, 'a.md'), article({ title: '[伪链接](javascript:alert(1))\n# 伪分支 <img src=x>', label: '[额外链接](/notes/private-draft/)' }));
  const map = createMindmaps(await loadArticles(root), root)[0];
  const links = collectLinks(parse(map.markdown).root);
  assert.equal(links.length, 2);
  assert.ok(links.every(link => link.startsWith('/notes/concept/')));
  assert.doesNotMatch(map.markdown, /<img|\n# 伪分支/);
}));

test('整理后的改动触发同步检查，生成器幂等并清理过期导图、保护手写文件', () => fixture(async root => {
  await mkdir(path.join(root, 'scripts'));
  await mkdir(path.join(root, 'content/01-分类'), { recursive: true });
  for (const file of ['content.mjs', 'mindmaps.mjs', 'generate-mindmaps.mjs']) await copyFile(path.join(project, 'scripts', file), path.join(root, 'scripts', file));
  await symlink(path.join(project, 'node_modules'), path.join(root, 'node_modules'));
  const file = path.join(root, 'content/01-分类/a.md');
  await writeFile(file, article());
  const run = (...args) => spawnSync(process.execPath, [path.join(root, 'scripts/generate-mindmaps.mjs'), ...args], { encoding: 'utf8' });
  let result = run();
  assert.equal(result.status, 0, result.stderr);
  assert.equal(run('--check').status, 0);
  const before = await readFile(path.join(root, 'mindmaps/knowledge.md'), 'utf8');
  assert.equal(run().status, 0);
  assert.equal(await readFile(path.join(root, 'mindmaps/knowledge.md'), 'utf8'), before);
  await writeFile(file, article({ label: '更新后的关键机制' }));
  assert.notEqual(run('--check').status, 0);
  assert.equal(run().status, 0);
  assert.match(await readFile(path.join(root, 'mindmaps/knowledge.md'), 'utf8'), /更新后的关键机制/);
  await writeFile(path.join(root, 'mindmaps/手写资料.md'), '# 保留手写资料\n');
  await rm(file);
  assert.equal(run().status, 0);
  assert.deepEqual((await readdir(path.join(root, 'mindmaps'))).sort(), ['knowledge.md', '手写资料.md'].sort());
  await writeFile(path.join(root, 'mindmaps/knowledge.md'), '# 手写覆盖保护\n');
  result = run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /拒绝覆盖手写文件/);
  assert.equal(await readFile(path.join(root, 'mindmaps/knowledge.md'), 'utf8'), '# 手写覆盖保护\n');
}));
