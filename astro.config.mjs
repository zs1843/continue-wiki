import { defineConfig } from 'astro/config';
import { existsSync } from 'node:fs';

if (existsSync('.env')) process.loadEnvFile('.env');

const site = process.env.SITE_URL;
if (site && (new URL(site).protocol !== 'https:' || new URL(site).pathname !== '/')) {
  throw new Error('SITE_URL 必须是 HTTPS 根域名地址，不能包含子路径。');
}

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: { shikiConfig: { theme: 'github-light' } },
});
