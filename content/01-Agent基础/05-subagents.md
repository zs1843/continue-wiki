---
title: Subagent 与任务交接
slug: subagents
status: published
order: 50
updated: "2026-11-17"
mindmap:
  - label: "独立上下文与结果摘要"
    heading: "独立上下文意味着什么"
  - label: "并行、隔离与专注度"
    heading: "和单个代理相比"
  - label: "强依赖任务不适合拆分"
    heading: "拆分不划算的情形"
  - label: "子代理只收到自己的系统提示"
    heading: "一个子代理是怎么定义的"
---

**Subagent（子智能体）** 是由主流程委派、负责局部任务的 Agent。主流程组织整体目标，子智能体完成某一部分探索或处理，再交回结果供主流程整合。[1]

一种常见设计是让子代理使用独立上下文：各自在自己的窗口里检索、试错，只把压缩后的结论交回主流程。Anthropic 的多代理研究系统采用的就是「先并行探索、再压缩汇总」的方式。[1]

## 独立上下文意味着什么

独立上下文主要指模型处理任务时使用的信息范围，不代表独立的文件系统或环境。历史继承、共享文件与可用工具，取决于具体宿主的实现。

这样做的直接作用是控制主流程的上下文占用：探索过程产生的中间尝试留在子代理窗口里，主流程只接收摘要，避免长轨迹把主窗口挤满。[1]

## 一个子代理是怎么定义的

Claude Code 用 Markdown 文件定义子代理，放在 `~/.claude/agents/` 或项目的 `.claude/agents/` 下。下面取自官方示例：[2]

```markdown
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. When invoked, analyze the code and provide
specific, actionable feedback on quality, security, and best practices.
```

frontmatter 里的 `name`、`description`、`tools`、`model` 决定它叫什么、何时被选中、能用哪些工具、用哪个模型；正文是它自己的系统提示。文档说明子代理只收到这份提示和基本环境信息，不继承主代理的对话——这就是「独立上下文」在产品里的落地方式。[2]

使用时由主代理按描述委派，例如「用 code-reviewer 审查这次改动」；子代理返回结论，主代理再汇总。委派得越具体，越不容易和别的子代理重复劳动。

## 和单个代理相比

多代理系统的收益通常被归为三点，每一点都有对应的成本。[1]

- **上下文隔离与压缩**：子代理在自己的窗口里完成检索与分析，只返回压缩后的信息，主流程不必阅读全部原始过程。
- **并行探索**：主代理可以同时启动多个子代理（文中是 3–5 个）处理不同方向；并行启动子代理与并行调用工具，让复杂查询的研究时间最多缩短约 90%。
- **专注度**：每个子代理有独立的工具、提示与探索轨迹，关注点被分开，减少路径依赖和互相干扰。

具体数字要按实验条件理解。在 Anthropic 的内部研究评测中，Opus 4 主代理加 Sonnet 4 子代理的组合，比单用 Opus 4 的代理高出 90.2%，优势集中在可以并行的广度优先任务上。[1] 该文也指出收益与 token 消耗高度相关：单个代理约为聊天的 4 倍，多代理约为 15 倍，而 token 用量本身能解释约 80% 的性能差异。[1] 换句话说，多代理常常是「花更多算力换更强能力」，不是同成本下的免费提升。

## 拆分不划算的情形

- **任务强依赖、需要共享全部上下文**：各代理必须看到同一份材料才能判断时，拆分反而增加不一致。[1]
- **多数编码任务**：真正可并行的部分少，模型对实时协调与委派也还不擅长，收益有限。[1]
- **协调与同步成本**：主代理串行等待每一批子代理时，会被最慢的一支阻塞；任务描述含糊还会导致重复劳动或漏项。[1]
- **错误沿链路放大**：子代理的结论未经核对就被汇总，错误会直接进入最终答案。

所以拆分不是默认更优。任务可并行、信息量大到单个窗口放不下、需要多种专门工具时，拆分才明显划算；其余情况先试单个 Agent 更稳。对于「整理两篇讨论同一概念的文章」这类可以独立处理的局部工作，可以分别提取定义、论据和限制，再由主流程比较异同。

[上下文工程](/notes/context-engineering/)解释了为什么要控制信息范围；[GSD](/notes/gsd/)是把子智能体用于开发阶段的一种具体方法。

## 参考

1. Anthropic，[How we built our multi-agent research system](https://www.anthropic.com/research/multi-agent-research-system)，Benefits of a multi-agent system、Architecture overview、Prompt engineering。文中系统作为设计实例，90.2%、4 倍与 15 倍等数字来自其内部评测，不代表所有宿主的统一行为。
2. Claude Code 文档，[Subagents](https://code.claude.com/docs/en/sub-agents)，定义格式与「子代理只收到自己的系统提示」的说明；2026-11-17 读取。
