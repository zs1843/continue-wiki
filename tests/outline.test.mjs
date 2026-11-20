import test from 'node:test';
import assert from 'node:assert/strict';
import { buildOutline, activeHeadingIndex } from '../src/lib/outline.mjs';

test('阅读大纲保留同级、嵌套与跳级标题，不生成虚构章节', () => {
  const headings = [
    { depth: 2, slug: '一', text: '一' },
    { depth: 3, slug: '子', text: '子' },
    { depth: 5, slug: '深', text: '深' },
    { depth: 3, slug: '另', text: '另' },
    { depth: 2, slug: '二', text: '二' },
  ];
  const tree = buildOutline(headings);
  assert.deepEqual(tree.map(h => h.slug), ['一', '二']);
  assert.deepEqual(tree[0].children.map(h => h.slug), ['子', '另']);
  assert.equal(tree[0].children[0].children[0].depth, 5);
  assert.equal(headings[0].children, undefined);
  assert.deepEqual(buildOutline([]), []);
});
test('阅读定位处理大幅跳转、标题间长段落及最后一节无法滚至顶部', () => {
  assert.equal(activeHeadingIndex([], 90), -1);
  assert.equal(activeHeadingIndex([200, 800], 90), 0);
  assert.equal(activeHeadingIndex([-2000, -1000, 90, 700], 90), 2);
  assert.equal(activeHeadingIndex([-100, 500, 1500], 90), 0);
  assert.equal(activeHeadingIndex([-100, 500, 700], 90, true), 2);
});
