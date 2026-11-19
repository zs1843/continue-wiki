---
title: Attention 与 Transformer：让表示结合上下文
slug: attention-and-transformer
status: published
order: 30
updated: "2026-11-19"
mindmap:
  - label: "按匹配权重汇总信息"
    heading: "attention-是加权汇总"
  - label: "qkv-分别承担匹配与取值"
    heading: "qkv-不是三段原始文本"
  - label: "Transformer 还包括其他组件"
    heading: "从-attention-到-transformer"
---

**Attention（注意力）** 根据查询与一组键的匹配程度，为对应的值分配权重，再加权汇总。**Self-attention（自注意力）** 中，查询、键和值来自同一序列的表示，使各位置能够结合序列中的其他信息。[1][2]

## Attention 是加权汇总

可以用一个自拟的简化例子理解：当前位置对三个值向量的权重分别为 0.6、0.3、0.1，则汇总结果为：

`输出 = 0.6 × 值1 + 0.3 × 值2 + 0.1 × 值3`

如果三个值分别为 `[1,0]`、`[0,1]`、`[1,1]`，结果是 `[0.7,0.4]`。这只是单次加权求和，不是整层 Transformer 的完整输出。

## Q、K、V 不是三段原始文本

| 名称 | 作用 | 帮助理解的类比 |
| --- | --- | --- |
| Query，Q | 表达当前位置的匹配需求 | 当前用什么条件找信息 |
| Key，K | 参与和 Query 的匹配打分 | 各项信息拿什么参与匹配 |
| Value，V | 按权重参与汇总的内容 | 匹配后实际带回什么 |

类比不是实现细节。自注意力中的 Q、K、V 是由输入表示经可学习的变换得到的数值向量。**因果掩码**限制位置只能使用允许的先前信息，避免预测时看到未来答案。[2]

例如，“小林把笔记交给小周，因为他要复习”存在指代歧义。上下文信息可能帮助模型建立表示，但 Attention 并不是一个保证能正确判定“他”指谁的规则引擎；权重也不能直接当作人的理由。

## 从 Attention 到 Transformer

**Transformer**是组织这些运算的网络架构，除多头注意力外，还包括逐位置前馈网络、残差连接、归一化及位置信息处理。多头注意力使用多组变换，组合不同的匹配与汇总结果。[2]

| 组件 | 简化作用 |
| --- | --- |
| 自注意力 | 在序列位置之间交换信息 |
| 前馈网络 | 对各位置的表示做进一步变换 |
| 残差连接 | 将子层结果与原表示相加 |
| 归一化 | 调整数值尺度，帮助网络计算与训练 |
| 位置信息 | 让模型能够利用顺序 |

这是组件职责的入门归纳，不代表每个模型都采用相同排列。原始编码器—解码器 Transformer 与生成式 Decoder-only 模型也应区分，见[训练与推理](/notes/training-and-inference/)。[语言模型](/notes/language-model-generation/)说明最后怎样从表示得到生成过程。

## 参考

1. Zhang、Lipton、Li、Smola，《Dive into Deep Learning》，在线版 1.0.3，[§11.1 Queries, Keys, and Values](https://d2l.ai/chapter_attention-mechanisms-and-transformers/queries-keys-values.html)：匹配与加权汇总。
2. 同书 [§11.7 The Transformer Architecture](https://d2l.ai/chapter_attention-mechanisms-and-transformers/transformer.html)，§11.7.1–11.7.5：自注意力、前馈、残差、归一化与解码掩码；Q/K/V 的可学习投影另参照 Jurafsky、Martin，[SLP 第 7 章](https://web.stanford.edu/~jurafsky/slp3/7.pdf) §7.1。2026-11-19 核对相应正文。数值与指代例子为自拟，表格为机制归纳。
