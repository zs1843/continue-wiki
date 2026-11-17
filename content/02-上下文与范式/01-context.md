---
title: 上下文工程
slug: context-engineering
status: published
order: 10
updated: "2026-11-17"
mindmap:
  - label: "选择、组织与维护上下文"
  - label: "按需检索与上下文压缩"
    heading: "几种常见方法"
  - label: "结构化笔记与子智能体"
    heading: "几种常见方法"
---

**上下文工程（Context Engineering）** 是选择、组织和维护模型推理时可用信息的过程。关注范围包括提示词，也包括工具说明、历史消息、检索材料与工具结果等上下文内容。[1]

核心问题是：在有限的上下文窗口中，哪些信息能帮助模型完成当前任务，以及任务推进后怎样更新这些信息。

## 几种常见方法

- **按需检索**：需要具体材料时再读取，避免提前加载所有信息。
- **上下文压缩**：整理已经积累的内容，保留后续步骤需要的部分。
- **结构化笔记**：把进度、决定等信息保存在上下文之外，之后按需恢复。
- **子智能体分工**：把局部探索交给独立上下文，再汇总关键结果。[1]

这些方法处理的是信息的获取、保留与传递，不能简单等同于扩大上下文窗口。

例如，理解一本书中的某个概念时，可以先提供定义所在段落、必要的前置概念和当前问题；当涉及跨章节比较，再读取相关章节。这是按需组织上下文的示例。

## 与其他概念的关系

[Prompt](/notes/prompt-context-harness/)关注任务与指令怎样表达，上下文工程把范围扩大到模型当前可见的全部相关信息。[Subagent](/notes/subagents/)是管理局部探索的一种方式；[Agent Loop](/notes/agent-loop/)则会不断产生需要整理的新信息。

## 参考

1. Anthropic，[Effective context engineering for AI agents](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents)，Context engineering vs. prompt engineering、Context retrieval and agentic search，以及长期任务中的压缩、笔记和子代理方法。
