---
title: Agent Loop
slug: agent-loop
status: published
order: 30
updated: "2026-11-17"
mindmap:
  - label: "调用模型 → 执行工具 → 更新上下文"
    heading: "循环如何继续"
  - label: "任务完成与迭代上限"
    heading: "什么时候停止"
  - label: "执行成功还需要任务验收"
    heading: "什么时候停止"
---

**Agent Loop（智能体循环）** 是驱动 Agent 持续处理任务的控制过程：调用模型、执行工具、接收结果，再把更新后的信息交给模型，直到满足停止条件。[1][2]

它把单次模型调用连接成一个能根据反馈继续推进的系统。

## 循环如何继续

```text
目标与上下文
    ↓
模型生成回答或工具调用
    ↓
程序执行工具，取得观察结果
    ↓
更新上下文，再次调用模型
    ↓
继续行动，或满足停止条件后结束
```

上面是流程简图，不代表某个框架的接口。以 Claude 的客户端工具为例，模型返回 `tool_use`，应用执行后用 `tool_result` 回传；下一次模型调用便能使用这个结果。[2]

## 什么时候停止

常见的停止依据包括任务完成，以及程序设置的最大迭代次数等限制。[1] 某一轮模型不再请求工具，表示这轮调用没有继续提出行动；交付物是否符合要求，还需要相应的验证。

例如，在「找到定义并附来源」的任务里，搜索拿到结果后还要判断是否足以支持定义。只有检索动作执行成功，并不能直接说明任务已经完成。这个例子说明了工具执行结果与任务验收的区别。

[ReAct](/notes/react/)关注循环中的推理与行动策略；[上下文工程](/notes/context-engineering/)关注每轮提供哪些信息；[Harness](/notes/prompt-context-harness/)组织循环运行所需的环境和状态。

## 参考

1. Anthropic，[Building effective agents](https://www.anthropic.com/research/building-effective-agents)，Agents 中的环境反馈与停止条件。
2. Anthropic，[Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)，客户端工具调用与结果回传。
