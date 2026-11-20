---
title: GSD 与阶段化交付
slug: gsd
status: published
order: 60
updated: "2026-11-20"
mindmap:
  - label: "Discuss → Plan → Execute → Verify → Ship"
    heading: "阶段循环"
  - label: "独立上下文承担局部任务"
    heading: "阶段循环"
  - label: "STATE.md / CONTEXT.md 保存状态"
    heading: "阶段循环"
  - label: "状态与上下文分别落盘"
    heading: "一个阶段里留下的材料"
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

阶段划分用于组织工作，持久化材料用于保存进度与决定，两者相互配合。保存计划本身并不表示实现已经通过验证。

## 一个阶段里留下的材料

GSD Core 的说明强调结构化材料要能跨会话保留，提到 `STATE.md` 与 `CONTEXT.md` 两类文件：[1]

```text
STATE.md     # 当前阶段、已完成项、下一步
CONTEXT.md   # 本阶段的决定与背景
```

阶段推进时，研究、计划和执行交给新上下文的子代理，主会话只看结论与状态；这样主会话不会被大量中间输出占满。Verify 阶段会检查实际产出，发现问题时生成修复计划，而不是直接宣布完成。

实际文件名与目录以所用项目版本为准。按职责区分：状态回答「做到哪了」，上下文回答「为什么这样做」。

## 项目入口

截至 2026-11-17，`gsd-build/get-shit-done` 的 README 将开发入口指向 Open GSD 的 GSD Core。[2] 使用命令和安装说明时应以对应项目为准。

[SDD](/notes/spec-driven-development/)解释规范怎样指导开发；[上下文工程](/notes/context-engineering/)解释信息怎样持续组织；[Subagent](/notes/subagents/)解释局部任务如何委派。GSD 将这些机制组合进开发流程。

## 参考

1. [GSD Core README](https://github.com/open-gsd/gsd-core)，What is GSD Core、How it works、Why it works。
2. [GSD 原仓库迁移说明](https://github.com/gsd-build/get-shit-done#gsd-has-moved)。两者均参考 2026-11-17 的在线说明。
