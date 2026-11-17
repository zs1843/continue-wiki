---
title: GSD 与阶段化交付
slug: gsd
status: published
order: 50
updated: "2026-11-17"
mindmap:
  - label: "Discuss → Plan → Execute → Verify → Ship"
    heading: "阶段循环"
  - label: "独立上下文承担局部任务"
    heading: "阶段循环"
  - label: "STATE.md / CONTEXT.md 保存状态"
    heading: "阶段循环"
---

**GSD** 是面向编程 Agent 的开发工作流框架，结合上下文工程与规范驱动开发，把较长任务组织为可推进、可验证的阶段。本文参考 GSD Core 的项目说明。[1]

## 阶段循环

GSD Core 的 README 将一个里程碑内的工作组织为五步：[1]

1. **Discuss**：讨论并记录实施相关决定。
2. **Plan**：研究、拆解任务并检查计划。
3. **Execute**：执行计划中的任务。
4. **Verify**：检查结果，发现问题后诊断和修复。
5. **Ship**：交付当前阶段，再进入下一阶段。

它使用独立上下文的子智能体承担研究、计划或执行工作，并通过 `STATE.md`、`CONTEXT.md` 等材料保留状态，使后续会话能够继续处理。[1]

这里有两个相互配合的机制：阶段划分组织工作，持久化材料保存进度与决定。保存计划本身并不表示实现已经通过验证。

## 项目入口

截至 2026-11-17，`gsd-build/get-shit-done` 的 README 将开发入口指向 Open GSD 的 GSD Core。[2] 使用命令和安装说明时应以对应项目为准。

[SDD](/notes/spec-driven-development/)解释规范怎样指导开发；[上下文工程](/notes/context-engineering/)解释信息怎样持续组织；[Subagent](/notes/subagents/)解释局部任务如何委派。GSD 将这些机制组合进开发流程。

## 参考

1. [GSD Core README](https://github.com/open-gsd/gsd-core)，What is GSD Core、How it works、Why it works。
2. [GSD 原仓库迁移说明](https://github.com/gsd-build/get-shit-done#gsd-has-moved)。两者均参考 2026-11-17 的在线说明。
