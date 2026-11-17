---
title: ReAct：观察与行动
slug: react
status: published
order: 50
updated: "2026-11-17"
mindmap:
  - label: "推理与行动交替"
  - label: "Thought → Action → Observation"
  - label: "观察结果用于调整下一步"
    heading: "观察为什么重要"
---

**ReAct** 是 *Reasoning and Acting* 的组合，指让语言模型交替进行推理与行动、利用行动产生的观察更新后续处理的方法。[1]

推理帮助组织行动计划，行动则让模型接触知识库或环境中的信息。常见的流程表达是：**Thought（思考）→ Action（行动）→ Observation（观察）** ，随后进入下一轮。[1]

## 观察为什么重要

如果任务只依赖已有推断，早期错误可能继续传递。ReAct 把外部反馈带入过程，使后续行动能够根据新信息调整。[1]

以查找一篇论文为例：先根据题目搜索，再核对作者和摘要；如果发现同名文章，便补充作者信息重新检索。这个简化场景中，观察会改变下一步行动，而不是只给预设结论补一条链接。

ReAct 是任务处理方法，并不规定统一的工具接口。它可以通过 [Function Calling](/notes/agent-and-function-calling/)执行行动，由 [Agent Loop](/notes/agent-loop/)组织多轮运行。

原论文在问答、事实核查和交互环境中评估了该方法，效果应结合具体任务与实验条件理解。[1]

## 参考

1. Shunyu Yao 等，[ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629v3)，arXiv v3，2023-03-10，摘要与方法说明。
