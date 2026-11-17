import path from 'node:path';
import { loadArticles } from '../../scripts/content.mjs';
import { createMindmaps } from '../../scripts/mindmaps.mjs';

export async function publishedMindmaps() {
  const root = path.resolve('content');
  return createMindmaps(await loadArticles(root), root);
}
export type Mindmap = Awaited<ReturnType<typeof publishedMindmaps>>[number];
