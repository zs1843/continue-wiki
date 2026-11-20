---
title: 计划模式与 Superpowers 的对比
slug: planning-and-superpowers
status: published
order: 20
updated: "2026-11-20"
mindmap:
  - label: "产品模式与方法集不是一层"
    heading: "两者的区别"
  - label: "计划阶段可以放进计划模式"
    heading: "怎样组合"
---

[计划模式](/notes/plan-mode/)是宿主提供的工作模式，[Superpowers](/notes/superpowers/) 是基于可组合 Skills 的开发方法集。二者常被放在一起比较，但负责的事情不同：计划模式管「何时开始改动」，Superpowers 管「从需求到验证怎么走」。[1][2]

## 两者的区别

| 比较点 | 计划模式 | Superpowers |
| --- | --- | --- |
| 形态 | 权限／工作模式 | 可组合 Skills 方法集 |
| 范围 | 实施前的分析与审批 | 需求探索到执行与检查 |
| 产出 | 一份待批准的计划 | 各阶段材料与执行结果 |
| 生效方式 | 会话内切换 | 按流程调用 Skill |
| 依赖 | 宿主实现该模式 | 项目安装与宿主支持 |

在 Claude Code 中，计划模式用 `Shift+Tab` 或 `/plan` 切换，由宿主提供；Superpowers 需要先安装，再按要求调用相应 Skill。[1][2]

计划模式只设「先分析后改动」这一道闸门，可以在几乎任何任务上临时切换；Superpowers 关心整段开发过程，通常要按项目约定安装并遵循流程。[2] 两者的交集在于计划环节，但批准机制属于宿主，方法论本身不提供这种拦截。

## 怎样组合

Superpowers 的工作流里有需求讨论、设计确认与实施计划等环节；这些环节可以放进计划模式：让 Agent 先读代码、列出计划，用计划模式的批准机制确认方向，再进入执行。[1][2]

要注意批准后会话会退出计划模式。后续执行是否仍按 Superpowers 的流程推进，取决于使用者是否继续遵循方法集；切换产品模式不会自动执行方法集中的步骤。

## 什么时候用哪个

- **单次、边界清楚的小改动**：直接执行，或开计划模式看一眼方案。
- **需求含糊、改动面大**：先用计划模式收敛方案，再决定怎么做。
- **多阶段功能、需要需求探索与验收**：Superpowers 这类方法集更合适，计划模式可以作为其中一环。
- **需要规范贯穿实现**：那是 [SDD](/notes/spec-driven-development/) 的范围；测试驱动开发见 [TDD](/notes/test-driven-development/)。

## 参考

1. Claude Code 文档，[Choose a permission mode](https://code.claude.com/docs/en/permission-modes)，Analyze before you edit with plan mode；2026-11-17 读取，产品行为仅对应 Claude Code。
2. [Superpowers 官方 README](https://github.com/obra/superpowers)，项目定位、How it works、The Basic Workflow；参考 2026-11-17 读取的在线说明。
