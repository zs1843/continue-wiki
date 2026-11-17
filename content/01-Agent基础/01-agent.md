---
title: Agent 与 Function Calling
slug: agent-and-function-calling
status: published
order: 10
updated: "2026-11-17"
mindmap:
  - label: "模型动态选择行动"
  - label: "Function Calling：工具名与参数"
    heading: "从调用工具到推进任务"
  - label: "程序执行，结果反馈给模型"
    heading: "从调用工具到推进任务"
---

**Agent（智能体）** 是一类围绕目标运行、根据环境反馈选择后续行动的系统。在基于大语言模型的 Agent 中，模型参与决定下一步使用什么工具、怎样推进任务。Anthropic 用「控制路径由预设代码决定，还是由模型动态决定」区分工作流与 Agent。[1]

**Function Calling（函数调用，也称工具调用）** 是模型按约定生成工具名和参数、让外部程序执行操作的机制。它为模型提供行动接口，但一次工具调用本身不一定构成 Agent。[2]

## 从调用工具到推进任务

以应用自己提供的工具为例，一次调用通常经过：

1. 应用向模型提供工具说明与输入 Schema。
2. 模型返回工具名和参数。
3. 应用执行函数，将结果交回模型。
4. 模型根据结果继续调用工具，或生成回答。

客户端工具由应用执行；服务端托管工具则由提供方运行。执行位置需要按具体接口区分。[2]

例如，查找某个概念时，系统可以调用笔记搜索工具；如果结果不足，再换关键词、补充检索，直到获得足够依据。这个简化示例中，搜索工具提供能力，模型对后续步骤的选择体现了 Agent 的控制过程。

## 与其他概念的关系

[工具 Schema](/notes/tool-schema/)描述一次调用需要哪些参数；[Agent Loop](/notes/agent-loop/)负责把调用、执行和反馈循环运行起来；[ReAct](/notes/react/)描述推理与行动怎样交替配合。

## 参考

1. Anthropic，[Building effective agents](https://www.anthropic.com/research/building-effective-agents)，What are agents?、Agents。
2. Anthropic，[Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)，How tool use works；以 Claude 的接口说明工具调用机制。
