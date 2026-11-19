---
title: 指令微调：用示范数据调整行为
slug: fine-tuning-sft
status: published
order: 10
updated: "2026-11-19"
mindmap:
  - label: "SFT 优化目标序列的负对数似然"
    heading: "训练目标"
  - label: "数据格式决定哪些 token 计损"
    heading: "数据格式决定计损范围"
  - label: "小模型也能在偏好上胜出"
    heading: "为什么小模型也能胜出"
  - label: "先分清知识不足还是行为不对"
    heading: "边界与选型"
---

**指令微调（Supervised Fine-Tuning，SFT）** 用输入—输出示范继续训练模型，让它更倾向于按示例的方式回答。它改变的是行为与格式，而不是给模型换一套知识库。

## 训练目标

SFT 是最小化目标序列在给定输入下的负对数似然：模型对每个目标 token 的输出概率取对数、求和、取负。实现上常把标签右移一位，让当前位置预测下一个 token；padding 位置用 `-100` 忽略，不计入损失。[1]

这和预训练的语言建模目标相同，区别在数据：预训练用大规模无标注文本，SFT 用人工或程序构造的示范对。

## 数据格式决定计损范围

TRL 的 SFT 文档列出三种常见格式：[1]

| 格式 | 形态 | 损失范围 |
| --- | --- | --- |
| 语言建模 | `{"text": ...}` | 整段文本 |
| 提示—补全 | prompt 与 completion 分开 | 默认只在 completion 上计损 |
| 会话 | `{"messages": [...]}` | 按 chat template 套用；可只用 assistant 部分 |

只对回答计损，是为了让模型学习“该怎样回答”，而不是把用户输入也当作要生成的内容。使用 `assistant_only_loss` 时，模板必须带有生成开始与结束标记，否则无法定位 assistant 片段。[1]

文档示例里，适配器训练的学习率约为 `1e-4`，高于全量微调常用值；这只是示例配置，不是通用建议。[1]

## 为什么小模型也能胜出

InstructGPT 先用标注者写的示范做 SFT，再用人类排序数据做强化学习；报告的结果里，1.3B 参数的模型输出比 175B 的 GPT-3 更受标注者偏好，参数量少约 100 倍。[2] 这说明“会不会按指令作答”很大程度取决于示范数据的质量与训练方式，而不只取决于模型规模。

## 边界与选型

- 需要模型补充**事实性知识**时，优先考虑[检索](/notes/rag/)：资料可以更新、可以追溯，改参数则很难撤回。
- 需要改变**格式、语气、工具调用习惯**时，SFT 是直接手段，但要有覆盖边界情况的示范数据。
- 数据量少时，全量微调容易过拟合；可以先用[参数高效微调](/notes/lora-peft/)降低训练成本。
- 要求模型在两种都“说得过去”的回答之间做取舍时，SFT 的表达能力有限，更适合用[偏好优化](/notes/preference-optimization/)。

以上选型判断是整理时的归纳，不是某篇来源给出的规则。

## 参考

1. Hugging Face TRL，[SFT Trainer](https://huggingface.co/docs/trl/sft_trainer)，2026-11-19 读取 Overview 至 SFTConfig：损失算法、数据格式、计损范围与学习率示例；论文正文未读。
2. Ouyang 等，[Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155)，arXiv v2：SFT 与 RLHF 流程、1.3B 与 175B 的偏好对比，仅依据摘要。
