import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
test('在临时目录演练发布、校验失败、回滚、保留版本和路径保护', () => {
  const result = spawnSync('python3', [fileURLToPath(new URL('./release_test.py', import.meta.url))], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stdout + result.stderr);
  console.log(result.stdout.trim());
});
