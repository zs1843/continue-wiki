---
title: TDD：测试驱动开发
slug: test-driven-development
status: published
order: 40
updated: "2026-11-20"
mindmap:
  - label: "Red：测试因缺少行为而失败"
    heading: "red--green--refactor"
  - label: "Green：实现使测试通过"
    heading: "red--green--refactor"
  - label: "Refactor：保持通过并整理结构"
    heading: "red--green--refactor"
  - label: "先确认测试失败再实现"
    heading: "一次小的循环"
---

**TDD（Test-Driven Development，测试驱动开发）** 是一种用测试推动软件设计与实现的方法：先为下一小步行为编写测试，再补足实现使测试通过，最后在测试保持通过的前提下重构。[1]

## Red → Green → Refactor

1. **Red**：写出测试并确认失败，失败原因应对应尚未实现的行为。
2. **Green**：编写足够的实现，使该测试通过。
3. **Refactor**：整理代码结构，同时保持已有测试通过。

开始前还需要列出待覆盖的测试场景，每次选择一个场景进入循环，过程中再补充新发现的场景。[1]

例如，开发去重函数时，可以先写「重复输入只保留一份」的测试，再完成实现；测试通过后整理函数结构。在这个例子中，先确定可观察的行为，再实现，最后调整设计。

TDD 要求测试参与开发过程。开发结束后补写测试仍然有价值，但不能仅凭存在测试文件，就判断已经采用 TDD。

[SDD](/notes/spec-driven-development/)把更高层的需求写成规范，TDD 则可以用来推进其中的具体行为。测试能够验证已定义的行为，但仍不能代替对系统结构与业务的理解，后者与[认知债](/notes/cognitive-and-architecture-debt/)有关。

## 一次小的循环

用「数组去重」演示三个阶段（示例自拟，代码为示意）：[1]

```js
// 1. Red：先写期望行为，运行应失败（函数尚不存在）
import test from 'node:test';
import assert from 'node:assert/strict';
import { dedupe } from './dedupe.js';

test('重复元素只保留第一次出现', () => {
  assert.deepEqual(dedupe([1, 2, 1, 3, 2]), [1, 2, 3]);
});
```

```js
// 2. Green：最小实现，让测试通过
export function dedupe(items) {
  return [...new Set(items)];
}

// 3. Refactor：测试保持通过的前提下整理结构，
//    例如把「保留第一次出现」的判断抽出来，
//    为将来支持对象数组留出空间。
```

这套做法需要按顺序确认结果：先看到测试失败，再补实现；Green 之后先跑测试，再做重构；重构期间测试始终通过。若先写实现再补测试，看到的是「已经通过」，就失去了「测试能发现问题」的证据。

## 参考

1. Martin Fowler，[Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)，测试列表与 Red–Green–Refactor 循环。
