---
title: Superpowers 工作流
slug: superpowers
status: published
order: 50
updated: "2026-11-17"
mindmap:
  - label: "可组合的 Skills"
  - label: "需求 → 设计 → 计划 → 执行与检查"
    heading: "工作流如何组织"
---

**Superpowers** 是一套面向编程 Agent 的软件开发方法，基于可组合的 Skills，把需求探索、设计、计划、实现与检查连接起来。这里特指 `obra/superpowers` 项目。[1]

## 工作流如何组织

项目 README 描述的主要过程包括：先通过讨论明确要构建什么，逐步确认设计，再把设计转成实施计划；之后执行任务，结合测试与审查检查结果。[1]

其中，Skills 保存各环节的具体做法，工作流把这些做法按任务需要连接起来。它既包含计划，也涉及计划之后的执行和验证。

## 与相关方法的关系

- [Skill](/notes/skills/)是组织任务能力的形式，Superpowers 是使用这种形式的具体方法集。
- [计划模式](/notes/plan-mode/)是产品层面的工作模式，与方法集覆盖的范围不同；两者的对比见[单独一篇](/notes/planning-and-superpowers/)。
- [TDD](/notes/test-driven-development/)是其工作流强调的开发方法之一，关注测试先行与迭代实现。
- [GSD](/notes/gsd/)也组织开发过程，但需要分别阅读各自的阶段、状态材料和使用约定。

安装方式与宿主支持属于项目实现信息，使用时应核对所选版本的说明。

## 参考

1. [Superpowers 官方 README](https://github.com/obra/superpowers)，项目定位、How it works、The Basic Workflow；参考 2026-11-17 读取的在线说明。
