import { mkdir, writeFile, lstat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const [folder, slug, title] = process.argv.slice(2);
if (!folder || !slug || !title || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('用法：npm run new -- "05-新分类" "new-topic" "文章标题"');
const root = fileURLToPath(new URL('../content/', import.meta.url));
const destination = path.resolve(root, folder);
if (!destination.startsWith(root) || folder.split(/[\\/]/).some(p => !p || p === '..' || p === '.')) throw new Error('分类必须位于 content 内');
let cursor = root;
for (const part of folder.split(/[\\/]/)) {
  cursor = path.join(cursor, part);
  try { if ((await lstat(cursor)).isSymbolicLink()) throw new Error('分类目录不能为符号链接'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
await mkdir(destination, { recursive: true });
const text = `---\ntitle: ${JSON.stringify(title)}\nslug: ${slug}\nstatus: draft\nmindmap: []\nupdated: "${new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai' }).format(new Date())}"\n---\n\n<!-- 直接解释概念定义与核心含义。按需补充示例，并说明与已有笔记的关系。关键论断注明出处；书籍记录已知的书名/作者/章节或页码，文章记录标题/作者/链接。不转录选题原话，不写整理过程自述。主题不限于 AI。发布前在 mindmap 中提炼 1–4 个正文关键点，可用 heading 指向真实章节。完成后 npm run build 自动同步导图。参见 docs/content-writing.md。 -->\n\n## 参考\n\n`;
await writeFile(path.join(destination, `${slug}.md`), text, { flag: 'wx' });
console.log('已创建草稿，不会覆盖已有文章。整理核对后将 status 改为 published。');
