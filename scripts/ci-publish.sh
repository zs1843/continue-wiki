#!/bin/sh
set -eu
# CI 须已检出可信发布分支、配置 Node 与 SSH，并运行 npm ci 和 npm test。
# 不 echo 环境变量或读取打印密钥。
: "${SITE_URL:?SITE_URL is required}"
: "${DEPLOY_HOST:?DEPLOY_HOST is required}"
: "${DEPLOY_ROOT:?DEPLOY_ROOT is required}"
node scripts/deploy.mjs publish
