import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { readFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';
import path from 'node:path';

const project = fileURLToPath(new URL('../', import.meta.url));
if (existsSync(path.join(project, '.env'))) process.loadEnvFile(path.join(project, '.env'));
const action = process.argv[2];
if (!['publish', 'rollback', 'list'].includes(action)) throw new Error('支持 publish、rollback、list');
const host = process.env.DEPLOY_HOST;
const root = process.env.DEPLOY_ROOT;
const port = process.env.DEPLOY_PORT ?? '22';
if (!host || !/^(?:[a-z_][a-z0-9_-]*@)?[a-zA-Z0-9][a-zA-Z0-9.-]*$/.test(host)) throw new Error('请设置 DEPLOY_HOST（SSH 别名或 user@host）');
if (!root || !/^\/(?:[a-zA-Z0-9_-]+\/){1,}[a-zA-Z0-9_-]+$/.test(root)) throw new Error('DEPLOY_ROOT 必须是独立绝对目录（至少两层，仅支持英文数字下划线及连字符）');
if (!/^\d+$/.test(port) || Number(port) < 1 || Number(port) > 65535) throw new Error('DEPLOY_PORT 无效');
const site = process.env.SITE_URL;
if (action === 'publish' && (!site || new URL(site).protocol !== 'https:' || new URL(site).pathname !== '/')) throw new Error('正式发布前请设置 SITE_URL 为独立 HTTPS 域名');
const sshOptions = ['-p', port, '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes'];
const quote = value => `'${value.replaceAll("'", "'\\''")}'`;
function run(command, args, options = {}) {
  const result = spawnSync(command, args, { stdio: 'inherit', cwd: project, ...options });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} 执行失败，未继续发布`);
}
const releaseCode = Buffer.from(await readFile(new URL('./release.py', import.meta.url))).toString('base64');
function remote(operation, release = '') {
  const code = `import base64;exec(base64.b64decode('${releaseCode}'))`;
  run('ssh', [...sshOptions, host, ['python3', '-c', code, operation, root, ...(release ? [release] : [])].map(quote).join(' ')]);
}
if (action === 'rollback') {
  const release = process.argv[3];
  if (!release || !/^\d{8}T\d{6}Z-[a-f0-9]{8}$/.test(release)) throw new Error('用法：npm run rollback -- <版本ID>，可先 node scripts/deploy.mjs list');
  remote('rollback', release);
} else if (action === 'list') remote('list');
else {
  // Always build and validate from source immediately before packaging.
  run('npm', ['run', 'build']);
  const release = `${new Date().toISOString().replaceAll(/[-:]/g, '').slice(0, 15)}Z-${randomBytes(4).toString('hex')}`;
  const temporary = await mkdtemp(path.join(tmpdir(), 'ai-wiki-package-'));
  try {
    const archive = path.join(temporary, `${release}.tar.gz`);
    run('tar', ['-czf', archive, '-C', path.join(project, 'dist'), '.'], { env: { ...process.env, COPYFILE_DISABLE: '1' } });
    remote('prepare');
    run('scp', ['-P', port, '-o', 'BatchMode=yes', '-o', 'StrictHostKeyChecking=yes', archive, `${host}:${root}/uploads/${release}.tar.gz`]);
    remote('publish', release);
    console.log(`发布完成：${site}（${release}）`);
  } finally { await rm(temporary, { recursive: true, force: true }); }
}
