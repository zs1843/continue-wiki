# 部署与自动更新

## 运行结构

推荐与现有网站共用 Web 服务，通过独立子域名提供本站。Node 构建发生在本地或 CI，服务器只运行现有 Web 服务。不要把站点放进 WordPress 程序目录。

部署前只读核实服务器：系统版本、可用内存与磁盘、现有 Web 服务、虚拟主机和证书管理方式。安装或修改配置前先备份对应配置，并确保新域名的配置不会改变旧站点。

SSH 发布需要远端有 Python 3.9+，本地或 CI 有 SSH、SCP、tar、Node.js 22.12+。发布工具使用 Python 标准库，不要求数据库、Docker 或服务器端 npm。腾讯云提供[文件上传和远程连接相关说明](https://cloud.tencent.cn/document/faq/1207/44569)。

轻量应用服务器等云主机还需在控制台放行 22、80、443 端口；云防火墙与系统内防火墙都放行后，HTTPS 才能完成证书签发与访问。

## 一次性配置

1. 给 wiki 准备一个独立子域名，解析到放置现有网站的服务器。
2. 由服务器管理员创建专用部署目录，例如 `/var/www/ai-wiki`，授予专用部署账户写权限；Web 服务只需读取目录和跟随其中的 `current` 链接。
3. 配置 SSH 公钥登录与主机别名。通过已有可信渠道核对主机指纹，将已核对的主机密钥写入 `known_hosts`。脚本启用严格主机密钥校验，不自动接受陌生主机。
4. 在项目目录复制 `.env.example` 为 `.env`，填写真实配置；该文件已被 Git 忽略。

```dotenv
SITE_URL=https://wiki.example.com
DEPLOY_HOST=wiki-server
DEPLOY_ROOT=/var/www/ai-wiki
DEPLOY_PORT=22
```

`DEPLOY_HOST` 支持 SSH 别名或 `user@host`。使用非默认 SSH 密钥时，写入 SSH 配置的 `IdentityFile`，不要把密钥写入项目文件。环境变量优先于 `.env`。

`SITE_URL` 必须是 HTTPS 根域名，构建时用于 canonical 和 sitemap。未配置时本地仍可预览，站点地图为空，不伪造生产域名；正式发布必须配置。

## 发布与回滚

```sh
npm test
npm run deploy
node scripts/deploy.mjs list
npm run rollback -- 20261117T000001Z-00000001
```

`deploy` 先重新构建和检查，生成完整 SHA-256 清单，然后才连接服务器：

```text
ai-wiki/
  .ai-wiki-root
  releases/<版本ID>/
  uploads/<版本ID>.tar.gz
  current -> releases/<版本ID>
```

服务器将压缩包解到新目录，核对文件列表、文件校验和及必需入口，成功后用原子重命名切换 `current`。失败时旧链接保持不变。发布和回滚通过文件锁串行执行，避免交叉切换。

保留三个完整版本；活动版本始终保留。回滚需要显式选择仍存在且校验通过的版本，不自动猜测目标。该工具不是长期备份系统：文章与工程仍应保存在 Git 中。

工具拒绝覆盖未受管理的非空目录、真实的 `current` 目录、含符号链接的部署路径或不安全的压缩包。它只清理专用部署根目录内符合版本格式的旧版本。请勿将 `DEPLOY_ROOT` 设为现有站点根目录。

## Web 服务配置

`nginx.conf.example` 是独立子域名的 Nginx 示例，只提供静态文件。按实际 Web 服务选择配置方式；如果现有网站由面板管理，优先在原面板中新增站点，避免再启动一个争抢端口的服务。

现有服务器使用 Caddy 时，参照 `Caddyfile.example` 新增独立站点块即可，静态文件、缓存头与 404 处理都在其中。Caddy 会自动申请并续期证书，不需要 certbot；改完用 `caddy validate --config /etc/caddy/Caddyfile` 检查，再 `systemctl reload caddy`。若现有配置只有 HTTP→HTTPS 跳转规则，必须为本站点新增站点块，否则请求会一直跳到尚未就绪的 443。

站点根目录设为 `/var/www/ai-wiki/current`。复用现有证书管理方式配置 HTTPS，检查配置后再平滑重载。示例中的 HTTP 配置不能替代生产 HTTPS。

### 宝塔面板创建纯静态站点

现有 WordPress 与静态站由宝塔管理的服务器，按下面的顺序接入。顺序不能颠倒：发布工具要求部署根目录为空，且 `current` 必须由它创建；宝塔建站会写入默认页和 `.user.ini`。

1. 网站 → 添加站点：域名填 `wiki.zs1843.cn`，根目录改为 `/www/wwwroot/ai-wiki/current`，PHP 版本选「纯静态」，不建 FTP 与数据库。部署根目录只接受英文、数字、下划线、连字符，不能直接使用带点号的域名目录；站点根目录始终只是部署根目录下的 `current`，`releases/` 在站点目录之外，不会通过 Web 暴露。
2. 站点设置 → 网站目录：关闭「防跨站攻击(open_basedir)」，删除该目录下宝塔生成的 `index.html`、`404.html`、`.user.ini`，然后删除空的 `current` 目录本身，让 `/www/wwwroot/ai-wiki` 保持为空。
3. 本机 `.env` 填 `DEPLOY_ROOT=/www/wwwroot/ai-wiki`，运行 `npm test` 与 `npm run deploy`。确认根目录出现 `.ai-wiki-root`、`releases/`、`uploads/`，以及指向最新版本的 `current` 链接。
4. 把 `wiki.zs1843.cn` 的 A 记录指向服务器后再申请证书：SSL → Let's Encrypt，开启强制 HTTPS 与自动续签。DNS 未指向本机时验证会失败。
5. 站点设置 → 配置文件：把 `location /` 换成下面的规则；配置里已有 `error_page 404 /404.html;` 就保留，不必重复。保存时宝塔会校验并重载。

```nginx
location / { try_files $uri $uri/ =404; add_header Cache-Control "no-cache"; }
location ^~ /_astro/ { try_files $uri =404; add_header Cache-Control "public, max-age=31536000, immutable"; }
location ^~ /pagefind/ { try_files $uri =404; add_header Cache-Control "no-cache"; }
location = /404.html { internal; add_header Cache-Control "no-cache"; }
```

如果宝塔不允许在新建时就指定 `current` 作为根目录，先按它的默认目录建站，部署完成后再把「网站目录」改成 `/www/wwwroot/ai-wiki/current`；两种方式最终结构一致。

宝塔默认会给 js、css 加 30 天或 12 小时缓存，`^~ /_astro/` 会覆盖这些正则规则，避免带哈希资源与普通资源混用同一缓存策略。发布只需要 `npm run deploy`，不需要再改面板配置。

不要重新打开「防跨站攻击」：它会往站点根目录写 `.user.ini`，而站点根是指向 `releases/<版本>` 的链接，文件会落进当前版本目录，导致回滚时的清单校验失败。

站点使用 `trailingSlash`，目录请求由 `index.html` 提供；`try_files` 的 `=404` 保证不存在的地址落到构建出的 404 页，而不是首页。

## 换机器迁移

内容保存在 Git，产物由 `npm run deploy` 重建，迁移不依赖旧机器的文件。

1. 新服务器按「一次性配置」建目录、部署账户和 Web 站点；提前把域名 TTL 调到 300–600 秒。
2. 把 `.env` 的 `DEPLOY_HOST`、`DEPLOY_ROOT` 指向新服务器，重新 `npm run deploy` 并申请证书。
3. 切换 DNS 后检查首页、深层链接、中文搜索、404 与证书；旧机器保留一天再停用。
4. 旧机器的 `releases/` 不用手工拷贝；需要历史版本时从 Git 重新构建发布。

机器到期、换服务商或从服务器迁到对象存储时，都按这三步执行。

上线后检查首页、文章深层链接、中文搜索、搜索结果跳转、404 和 HTTPS。然后分别访问既有网站，确认共存正常。缓存策略：HTML 与 Pagefind 索引重新验证；带哈希的 `_astro` 资源可长缓存。

## GitHub Actions 自动发布

`.github/workflows/deploy.yml` 已写入仓库：`main` 收到推送后，GitHub 检出源码、安装依赖、运行测试，再通过 SSH 调用 `scripts/ci-publish.sh` 完成构建、上传、校验和 `current` 原子切换。服务器不需要 Node，也不需要 Webhook 或常驻服务。

一次性准备：

1. 服务器准备部署账户并授权目录（也可暂用 root，但建议单独账户）：

```sh
useradd -m -s /bin/bash deploy
mkdir -p /www/wwwroot/ai-wiki && chown -R deploy:deploy /www/wwwroot/ai-wiki
```

2. 生成 CI 专用密钥，不要复用个人密钥，也不要在仓库目录里生成：

```sh
ssh-keygen -t ed25519 -C "github-actions@ai-wiki" -f ~/.ssh/ai-wiki-deploy -N ""
# 公钥 ~/.ssh/ai-wiki-deploy.pub 追加到服务器该账户的 ~/.ssh/authorized_keys
# 私钥 ~/.ssh/ai-wiki-deploy 的内容填进 GitHub Secret SSH_PRIVATE_KEY
```

服务器上安装公钥（`deploy` 账户没有密码，只允许密钥登录）：

```sh
install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
cat ai-wiki-deploy.pub >> /home/deploy/.ssh/authorized_keys
chown deploy:deploy /home/deploy/.ssh/authorized_keys && chmod 600 /home/deploy/.ssh/authorized_keys
```

3. 核对主机指纹后准备 `known_hosts` 内容：`ssh-keyscan -t ed25519 49.235.170.155`，与服务器上 `ssh-keygen -lf /etc/ssh/ssh_host_ed25519_key.pub` 的输出对照。发布脚本启用严格主机校验，不能用未经核对的主机密钥。

4. 在 GitHub 仓库 Settings → Secrets and variables → Actions 中添加：

| 类型 | 名称 | 值 |
| --- | --- | --- |
| Secret | `SSH_PRIVATE_KEY` | `~/.ssh/ai-wiki-deploy` 私钥全文 |
| Secret | `SSH_KNOWN_HOSTS` | 第 3 步核对过的 known_hosts 行 |
| Secret | `DEPLOY_HOST` | 如 `deploy@49.235.170.155` |
| Secret | `DEPLOY_ROOT` | `/www/wwwroot/ai-wiki` |
| Secret | `DEPLOY_PORT` | 可省略，默认 22 |
| Variable | `SITE_URL` | 可省略，工作流默认 `https://wiki.zs1843.cn` |

5. 推送 `main` 后到 Actions 页观察日志；成功后访问站点，失败时旧版本继续服务。

注意事项：

- 仓库建议设为私有。草稿隔离只保证草稿不进入公开产物，不保护源码仓库本身。
- GitHub 托管 runner 的出口 IP 不固定。如果服务器防火墙或宝塔「SSH 管理」启用了 IP 白名单，22 端口会被拦截；需要放行或改用自托管 runner。
- 私有仓库的 Actions 按分钟计费，一次发布通常一两分钟；`concurrency` 已保证发布串行，不会并发切换 `current`。
- 首次接入做一次真实提交发布和回滚验收；回滚仍用 `node scripts/deploy.mjs list` 查版本、`npm run rollback -- <版本ID>` 执行。

## 对接其他 Git 平台

Gitee、GitLab 等平台接入时，把上面的步骤对应替换即可，通用入口仍是 `scripts/ci-publish.sh`：

1. 仅发布分支（默认 `main`）的可信提交触发生产发布；其他分支只检查构建，不提供部署凭据。
2. 检出源码，使用 `.nvmrc` 对应的 Node 22，运行 `npm ci` 和 `npm test`。
3. 从 CI 密钥配置中注入 SSH 身份、已核对的 `known_hosts` 及三项环境变量（`SITE_URL`、`DEPLOY_HOST`、`DEPLOY_ROOT`，端口按需）。
4. 执行 `sh scripts/ci-publish.sh`。脚本调用统一发布入口，执行构建、上传、校验和切换。
5. 平台侧设置同一生产环境发布串行。保留构建与发布日志，失败应通知维护者；不输出密钥或 `.env`。

CI 不必部署到 Git 平台自己的 Pages 服务，也无需在服务器上构建或维持 Webhook 服务。首次接入后应做一次真实提交发布和回滚验收。
