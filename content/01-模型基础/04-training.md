---
title: 训练与推理：参数、输入与能力适配
slug: training-and-inference
status: published
order: 40
updated: "2026-11-20"
mindmap:
  - label: "训练改变参数，推理使用参数"
    heading: "训练和推理改动的对象不同"
  - label: "上下文示例不等于参数更新"
    heading: "预训练微调与上下文示例"
  - label: "三种 Transformer 组织方式"
    heading: "编码器与解码器怎样区分"
---

**训练**根据数据与目标计算误差，再调整模型参数；**推理**使用已有参数处理新输入并产生输出。参数是训练中学到的数值，上下文是本次任务提供的信息。[1][2]

## 训练和推理改动的对象不同

例如，一个演示模型为真实后续 Token 分配的概率从 0.1 提升到 0.5，对应的单步负对数损失从约 2.303 降至 0.693。这里用自然对数，`损失 = -ln(真实 Token 的预测概率)`。损失给出优化信号，不等于某一道应用题的正确率。[1]

| 过程 | 发生什么 | 自拟示例 |
| --- | --- | --- |
| 训练 | 计算损失并更新参数 | 用大量样本调整模型，使目标输出更可能出现 |
| 推理 | 固定已有参数计算结果 | 输入一篇笔记，让模型生成摘要 |
| 修改上下文 | 改变本次输入 | 增加“只依据下文回答”以及正文材料 |

把新资料贴进对话，并不意味着资料已经写入模型参数。应用另外保存聊天记录，也应与参数更新区分。

## 预训练、微调与上下文示例

**预训练**先从大量数据学习通用表示或生成能力；**微调**在已有模型基础上，用后续任务数据继续训练。**上下文学习**则把任务说明与少量示例放进输入，在不更新参数的情况下影响这次输出。[1][2]

例如，希望摘要总是包含“定义、边界、关联”三个字段，可以先在提示中提供格式与示例；若选择微调，则需要准备训练数据并评估适配效果。前者是改输入，后者是改参数。至于回答一本新书的具体内容，应先考虑如何提供可靠资料，见 [RAG](/notes/rag/)，不能仅靠格式适配补足证据。

## 编码器与解码器怎样区分

| 组织方式 | 信息处理特点 | 教材中的代表 |
| --- | --- | --- |
| 仅编码器（Encoder-only） | 编码输入，通常允许使用输入两侧信息 | BERT |
| 仅解码器（Decoder-only） | 按因果约束组织下一 Token 预测 | GPT 系列 |
| 编码器—解码器（Encoder–decoder） | 先编码输入，解码器再结合输入表示生成输出 | T5 |

表中的 BERT、GPT、T5 是教材用来说明这三种组织方式的模型家族，同一家族还有不同规模的版本。教材用这些模型说明结构与训练目标，并未限定 BERT 只能分类，也未把 Transformer 的用途限于聊天。[2] [Attention](/notes/attention-and-transformer/)解释其中的信息交互，[Embedding](/notes/embeddings-and-similarity/)解释数值表示。

改参数的具体做法见[指令微调](/notes/fine-tuning-sft/)、[LoRA 与 QLoRA](/notes/lora-peft/)与[偏好优化](/notes/preference-optimization/)；部署后的显存与延迟问题见[推理运行](/notes/inference-and-kv-cache/)与[量化](/notes/quantization/)。

训练目标与评估口径的数学基础见[交叉熵与困惑度](/notes/cross-entropy-and-perplexity/)；梯度、过拟合与正则的关系见[梯度、过拟合与正则](/notes/gradient-overfitting-regularization/)。

## 参考

1. Jurafsky、Martin，《Speech and Language Processing》，2026-08-19 第 3 版在线草稿，[第 7 章](https://web.stanford.edu/~jurafsky/slp3/7.pdf) §7.7：自监督下一 Token 训练、交叉熵与参数更新。损失数字为按该定义自拟计算，非实验结果。
2. Zhang、Lipton、Li、Smola，《Dive into Deep Learning》，在线版 1.0.3，[§11.9 Large-Scale Pretraining with Transformers](https://d2l.ai/chapter_attention-mechanisms-and-transformers/large-pretraining-transformers.html)，§11.9.1–11.9.3：BERT、T5、GPT 的结构、微调与上下文学习。2026-11-19 核对相关正文；不把教材历史实例当作当前产品规格。
