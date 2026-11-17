import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, copyFile, readFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

test('新建命令产生默认草稿，拒绝覆盖和越界路径', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'ai-wiki-new-note-'));
  try {
    await mkdir(path.join(root, 'scripts'));
    await mkdir(path.join(root, 'content'));
    const script = path.join(root, 'scripts', 'new-note.mjs');
    await copyFile(fileURLToPath(new URL('../scripts/new-note.mjs', import.meta.url)), script);
    const create = (...args) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });
    const result = create('01-分类/子分类', 'new-topic', '新主题');
    assert.equal(result.status, 0, result.stderr);
    const destination = path.join(root, 'content/01-分类/子分类/new-topic.md');
    const first = await readFile(destination, 'utf8');
    assert.match(first, /status: draft/);
    assert.match(first, /## 参考/);
    assert.notEqual(create('01-分类/子分类', 'new-topic', '另一个标题').status, 0);
    assert.equal(await readFile(destination, 'utf8'), first);
    assert.notEqual(create('../outside', 'escape', '越界').status, 0);
  } finally { await rm(root, { recursive: true, force: true }); }
});
