---
title: Subagent 与任务交接
slug: subagents
status: published
order: 40
updated: "2026-11-17"
mindmap:
  - label: "主流程委派局部任务"
  - label: "独立上下文与结果摘要"
    heading: "独立上下文意味着什么"
  - label: "共享文件与权限取决于宿主"
    heading: "独立上下文意味着什么"
---

**Subagent（子智能体）** 是由主流程委派、负责局部任务的 Agent。主流程组织整体目标，子智能体完成某一部分探索或处理，再交回结果供主流程整合。[1]

一种常见设计是让子智能体使用独立上下文，从而把局部探索过程与主流程分开。Anthropic 的多代理研究系统就采用各自探索、再压缩信息返回主代理的方式。[1]

## 独立上下文意味着什么

独立上下文主要指模型处理任务时使用的信息范围。它不自动意味着独立文件系统，也不代表各子任务不会相互影响。历史继承、共享文件与可用工具，要看具体宿主的实现。

子智能体的价值在于任务分工与信息压缩；整合时仍需要检查结论和来源。若任务高度相互依赖，拆分还会增加协调成本。[1]

例如，整理两篇讨论同一概念的文章时，可以分别提取各自的定义、论据和限制，再由主流程比较异同。这是任务拆分的示例，并不预设多代理一定比单个 Agent 更快。

[上下文工程](/notes/context-engineering/)解释了为什么要控制信息范围；[GSD](/notes/gsd/)是把子智能体用于开发阶段的一种具体方法。

## 参考

1. Anthropic，[How we built our multi-agent research system](https://www.anthropic.com/research/multi-agent-research-system)，Benefits of a multi-agent system、Architecture overview。文中系统作为设计实例，不代表所有宿主的统一行为。
