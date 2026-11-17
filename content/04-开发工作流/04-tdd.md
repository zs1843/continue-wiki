---
title: TDD：测试驱动开发
slug: test-driven-development
status: published
order: 40
updated: "2026-11-17"
mindmap:
  - label: "Red：测试因缺少行为而失败"
    heading: "red--green--refactor"
  - label: "Green：实现使测试通过"
    heading: "red--green--refactor"
  - label: "Refactor：保持通过并整理结构"
    heading: "red--green--refactor"
---

**TDD（Test-Driven Development，测试驱动开发）** 是一种用测试推动软件设计与实现的方法：先为下一小步行为编写测试，再补足实现使测试通过，最后在测试保持通过的前提下重构。[1]

## Red → Green → Refactor

1. **Red**：写出测试并确认失败，失败原因应对应尚未实现的行为。
2. **Green**：编写足够的实现，使该测试通过。
3. **Refactor**：整理代码结构，同时保持已有测试通过。

开始前还需要列出待覆盖的测试场景，每次选择一个场景进入循环，过程中再补充新发现的场景。[1]

例如，开发去重函数时，可以先写「重复输入只保留一份」的测试，再完成实现；测试通过后整理函数结构。这个例子体现了先确定可观察行为、再实现和调整设计的顺序。

TDD 的关键是测试参与开发过程。开发结束后补写测试仍然有价值，但不能仅凭存在测试文件，就判断已经采用 TDD。

[SDD](/notes/spec-driven-development/)把更高层的需求写成规范，TDD 则可以用来推进其中的具体行为。测试能够验证已定义的行为，但仍不能代替对系统结构与业务的理解，后者与[认知债](/notes/cognitive-and-architecture-debt/)有关。

## 参考

1. Martin Fowler，[Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)，测试列表与 Red–Green–Refactor 循环。
