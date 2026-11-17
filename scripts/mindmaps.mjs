import path from 'node:path';
import { createHash } from 'node:crypto';
import { cleanFolder } from './content.mjs';

/** @typedef {import('./content.mjs').Metadata & {file:string}} MapNote */
/** @typedef {{key:string,label:string,notes:MapNote[]}} MapGroup */
/** @typedef {{slug:string,title:string,groups:MapGroup[],overview:boolean,noteCount:number,pointCount:number,updated?:string,markdown:string,source:string}} Mindmap */

// 只输出纯文字节点和站内链接，不把正文、HTML 或私人草稿带进导图。
export function escapeLabel(text) {
  return text.replace(/\s+/g, ' ').trim().replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replace(/[\\`*_{}\[\]()#!|~]/g, '\\$&');
}
/** @param {MapNote} note @param {import('./content.mjs').MindmapPoint} [point] */
export function noteHref(note, point) {
  return `/notes/${note.slug}/${point?.heading ? `#${encodeURIComponent(point.heading)}` : ''}`;
}
function noteLines(note, indent = '') {
  const lines = [`${indent}- [${escapeLabel(note.title)}](${noteHref(note)})`];
  for (const point of note.mindmap ?? []) lines.push(`${indent}  - [${escapeLabel(point.label)}](${noteHref(note, point)})`);
  return lines;
}
/** @param {MapNote[]} articles @param {string} contentRoot @returns {Mindmap[]} */
export function createMindmaps(articles, contentRoot) {
  const groups = new Map();
  for (const note of articles.filter(note => note.status === 'published').sort((a, b) => a.file.localeCompare(b.file, 'en'))) {
    const folders = path.relative(contentRoot, note.file).split(path.sep).slice(0, -1);
    const key = folders[0] ?? '';
    if (!groups.has(key)) groups.set(key, { key, label: key ? cleanFolder(key) || key : '未分类', notes: [] });
    groups.get(key).notes.push(note);
  }
  const allGroups = [...groups.values()];
  for (const group of allGroups) group.notes.sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title, 'zh'));
  const finish = (slug, title, selectedGroups, overview) => {
    const notes = selectedGroups.flatMap(group => group.notes);
    const lines = [`# ${escapeLabel(title)}`, ''];
    for (const group of selectedGroups) {
      if (overview) lines.push(`## ${escapeLabel(group.label)}`, '');
      lines.push(...group.notes.flatMap(note => noteLines(note)), '');
    }
    const markdown = lines.join('\n');
    return {
      slug, title, groups: selectedGroups, overview,
      noteCount: notes.length,
      pointCount: notes.reduce((sum, note) => sum + (note.mindmap?.length ?? 0), 0),
      updated: notes.map(note => note.updated).filter(Boolean).sort().at(-1),
      markdown,
      // 明确标记生成文件的所有权，生成器只维护自己的文件。
      source: `---\ngenerated_by: note-mindmaps\ntitle: ${JSON.stringify(title)}\nslug: ${slug}\n---\n\n${markdown}`,
    };
  };
  return [
    finish('knowledge', '知识总览', allGroups, true),
    ...allGroups.map(group => finish(`topic-${createHash('sha256').update(group.key).digest('hex').slice(0, 10)}`, group.label, [group], false)),
  ];
}
