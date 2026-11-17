---
title: 计划模式与 Superpowers
slug: planning-and-superpowers
status: published
order: 10
updated: "2026-11-17"
mindmap:
  - label: "计划模式：实施前分析"
  - label: "Superpowers：覆盖多个开发环节"
    heading: "两者的区别"
  - label: "工作模式与开发方法的范围不同"
    heading: "两者的区别"
---

**计划模式（Plan Mode）** 是一些编程 Agent 提供的工作模式，用于在实施之前分析需求、探索代码并提出方案。它的工具权限和执行边界由具体产品定义。

以 Claude Code 为例，官方说明中的计划模式会读取文件并提出计划，在获得批准前不进行编辑。[1]

**Superpowers** 是由可组合 Skills 构成的软件开发方法集，涵盖需求探索、设计、实施计划、执行、测试与审查等环节。[2]

## 两者的区别

| 比较点 | 计划模式 | Superpowers |
| --- | --- | --- |
| 形式 | 产品提供的工作模式 | 可接入 Agent 的方法与 Skills |
| 核心产出 | 实施前的分析与计划 | 覆盖开发多个环节的工作过程 |
| 范围 | 主要处理如何开展任务 | 从需求探索延伸到实现与验证 |

Superpowers 的工作流本身包含计划阶段，因此二者存在交集。比较时需要区分「当前处于哪种工作模式」与「整个任务采用哪套方法」，不能只按名称判断效果。

[SDD](/notes/spec-driven-development/)进一步关注怎样用规范贯穿实现；[TDD](/notes/test-driven-development/)关注怎样用测试推进具体行为的开发。

## 参考

1. Anthropic，[Claude Code Common workflows](https://code.claude.com/docs/en/common-workflows#plan-before-editing)，Plan before editing。此处产品行为仅对应 Claude Code。
2. [Superpowers README](https://github.com/obra/superpowers)，How it works、The Basic Workflow；参考 2026-11-17 的在线说明。
