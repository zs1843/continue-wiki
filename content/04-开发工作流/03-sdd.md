---
title: SDD：规范驱动开发
slug: spec-driven-development
status: published
order: 30
updated: "2026-11-17"
mindmap:
  - label: "规范持续指导实现"
  - label: "行为、边界与验收条件"
    heading: "规范需要表达什么"
  - label: "规范、计划与测试相互配合"
    heading: "与计划和测试的关系"
---

**SDD（Spec-Driven Development，规范驱动开发）** 是一种以规范表达需求、行为和约束，并据此推进计划与实现的开发方式。规范持续参与开发过程，而不只是实施前写完就搁置的说明。[1]

在 GitHub Spec Kit 的方法说明中，规范是核心材料，技术计划和代码由它逐步展开。不同工具的具体阶段和文件格式可能不同。[1]

## 规范需要表达什么

有用的规范应让实现者能够判断：要解决什么问题，哪些行为需要支持，边界在哪里，以及怎样确认结果符合要求。

例如，「支持草稿」可以进一步写成：新建笔记默认是草稿，草稿不出现在公开目录和搜索中，只有标记公开后才生成正式阅读页面。这个简化示例把一句目标变成了可以检查的行为。

实现中发现需求有误时，也需要回到规范更新决定，避免规范和代码逐渐脱节。这是把规范作为持续依据的实际含义。

## 与计划和测试的关系

[计划模式](/notes/plan-mode/)先分析再列实施步骤；[TDD](/notes/test-driven-development/)用测试推动下一小步行为。SDD 关注规范如何贯穿整个过程，三者可以配合。[GSD](/notes/gsd/)则把规范、阶段计划和验证组织成具体工作流。

## 参考

1. GitHub，[Spec Kit：Specification-Driven Development](https://github.com/github/spec-kit/blob/main/spec-driven.md)，以规范为核心材料的方法说明；[项目 README](https://github.com/github/spec-kit)提供工具入口。本文将它作为 SDD 的具体实例。
