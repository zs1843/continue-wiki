import { fileURLToPath } from 'node:url';
import { loadArticles, validateArticleLinks, validateArticleAssets } from './content.mjs';
const root = fileURLToPath(new URL('../content/', import.meta.url));
const articles = await loadArticles(root);
validateArticleLinks(articles);
await validateArticleAssets(articles, fileURLToPath(new URL('../public/', import.meta.url)));
console.log(`内容检查通过：${articles.filter(a => a.status === 'published').length} 篇公开文章，${articles.filter(a => a.status === 'draft').length} 篇草稿。`);
