---
title: Prompt / Context / Harness
slug: prompt-context-harness
status: published
order: 80
updated: "2026-11-19"
mindmap:
  - label: "Prompt：表达任务与约束"
    heading: "三者分别关注什么"
  - label: "Context：当前可用信息"
    heading: "三者分别关注什么"
  - label: "Harness：执行、验证与恢复"
    heading: "为什么需要运行环境"
  - label: "状态必须落盘，上下文会丢"
    heading: "一次长任务的产物"
---

**Prompt（提示词）** 是提供给模型的任务说明、行为要求和表达约束。**Context（上下文）** 是模型某次推理时可用的整组信息，除提示词外，还可能包含历史消息、工具定义、外部材料和工具结果。[1]

**Agent Harness** 在这里指围绕模型组织任务运行的软件环境与控制机制，包括工具执行、状态保存、验证及跨会话恢复等。不同系统的范围会有差异；长期运行 Agent 的工程实践提供了一个具体实例。[2]

## 三者分别关注什么

| 概念 | 主要关注点 |
| --- | --- |
| Prompt | 怎样表达任务与约束 |
| Context | 当前步骤需要看到哪些信息 |
| Harness | 怎样执行、检查和持续推进任务 |

这个表用于区分关注范围，三者可以在同一系统中同时存在。

例如，让系统整理一个概念时，任务要求属于 Prompt，书中段落与相关笔记属于 Context，检索、文件写入、检查和保存进度的机制属于 Harness。这是帮助理解层次的简化示例。

## 为什么需要运行环境

长任务可能跨越多次会话。只保留一次回答，后续会话未必知道哪些工作已经完成、当前状态是什么。Anthropic 的实践通过初始化环境、记录进度、逐步实现和验证，支持后续继续工作。[2]

[Agent Loop](/notes/agent-loop/)是运行过程的一部分；[上下文工程](/notes/context-engineering/)负责其中的信息组织；[GSD](/notes/gsd/)则提供了把工作分阶段并保存状态的一种方法。

[Harness 工程](/notes/harness-engineering/)进一步讨论工具连接、专业方法、子任务分工和评测如何组合；[Coding Agent](/notes/coding-agent/)是观察这些机制在软件开发中如何配合的具体入口。

## 一次长任务的产物

官方实践把长任务拆给初始化和增量两种会话：第一次会话建立功能清单、`claude-progress.txt` 进度日志和 `init.sh` 环境脚本，并做一次初始提交；后续会话读这些材料，选择未完成的功能继续做，再留下结构化更新。[2]

文件布局大致是这样（`feature-list.json` 为示例命名，文档只说明了「综合的功能需求文件」）：

```text
project/
├── feature-list.json    # 功能清单与状态，初始会话建立
├── claude-progress.txt  # 每次会话追加：做了什么、验证结果、下一步
└── init.sh              # 环境准备脚本
```

这里的关键不在文件名，而在「状态必须落盘」：会话会结束、上下文会丢失，模型不能只靠自己记住上次做到哪。清单提供范围，进度日志提供接续点，提交记录提供可回退的基线。

## 参考

1. Anthropic，[Effective context engineering for AI agents](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents)，Prompt 与 Context 的范围。
2. Anthropic，[Effective harnesses for long-running agents](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents)，长期任务的环境管理、进度记录与恢复。
