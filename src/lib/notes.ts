import { getCollection } from 'astro:content';
import { validateMetadata, cleanFolder } from '../../scripts/content.mjs';

export async function publishedNotes() {
  const entries = await getCollection('notes');
  return entries.map(entry => ({
    ...entry,
    data: validateMetadata(entry.data),
    folders: entry.id.split('/').slice(0, -1).map(cleanFolder),
  })).filter(entry => entry.data.status === 'published')
    .sort((a, b) => a.id.localeCompare(b.id, 'en'));
}

export type Note = Awaited<ReturnType<typeof publishedNotes>>[number];

export type TreeNode = { label: string; key: string; folders: TreeNode[]; notes: Note[] };
export function buildTree(notes: Note[]): TreeNode {
  const root: TreeNode = { label: '', key: '', folders: [], notes: [] };
  for (const note of notes) {
    let node = root;
    for (const label of note.folders) {
      const key = `${node.key}/${label}`;
      let child = node.folders.find(folder => folder.key === key);
      if (!child) {
        child = { label, key, folders: [], notes: [] };
        node.folders.push(child);
      }
      node = child;
    }
    node.notes.push(note);
  }
  const sort = (node: TreeNode) => {
    node.notes.sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999) || a.data.title.localeCompare(b.data.title, 'zh'));
    node.folders.forEach(sort);
  };
  sort(root);
  return root;
}
