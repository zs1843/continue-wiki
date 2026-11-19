---
title: Token：文本怎样进入模型
slug: tokens-and-tokenization
status: published
order: 10
updated: "2026-11-19"
mindmap:
  - label: "Token 不等于字或词"
    heading: "文本先被切成离散单元"
  - label: "BPE 学习合并规则"
    heading: "bpe-为什么要使用子词"
  - label: "编号与向量有不同职责"
    heading: "从编号到向量"
---

**Token** 是分词器处理文本后得到的离散单元，可以对应词、词的一部分、标点或字节片段。**Tokenization（分词）** 决定文本怎样被拆分；同一段话在不同分词器中可能得到不同结果。[1]

## 文本先被切成离散单元

例如，为了演示流程，假设一个玩具分词器把 `reviewing notes` 切为：

| 阶段 | 演示结果 | 意义 |
| --- | --- | --- |
| 原文本 | `reviewing notes` | 人阅读的字符串 |
| Token 序列 | `review`、`ing`、` notes` | 按词表和规则切分；空格可能成为片段的一部分 |
| Token ID | `17, 28, 46` | 每个片段在玩具词表中的编号 |
| 初始向量 | 每个编号对应一组数 | 供神经网络后续计算 |

这些片段和编号是自拟的，不能用于估算真实模型的 Token 数。中文也不保证“一字一个 Token”；统计需要使用目标模型对应的分词器。

## BPE 为什么要使用子词

**BPE（Byte-Pair Encoding）** 反复合并训练文本中频繁相邻的单元，学习词表与合并规则。编码新文本时按已学规则处理，而不是为每次输入重新训练。[1]

子词让常见片段可以复用。例如玩具词表已有 `review` 与 `ing`，就能组合表示 `reviewing`，不必为每个词形都准备一个独立词条。实际 BPE 还涉及预切分、字符或字节表示等细节，并非所有分词器都采用同一种 BPE。

## 从编号到向量

编号只是身份，不表示相近关系：ID 为 17 与 18，不能据此推断意思相近。模型通过 Embedding 将编号映射为向量，后续再结合上下文处理。这一层与[语义向量](/notes/embeddings-and-similarity/)相关，但模型内部的 Token 向量不等于用于检索的整段文本向量。

可以把分词器理解为“约定输入字母表”，而不是“理解文本的完整算法”。知道一句话有多少 Token，有助于讨论[上下文](/notes/context-engineering/)容量，却不能据此判断模型是否理解正确。

## 参考

1. Daniel Jurafsky、James H. Martin，《Speech and Language Processing》，第 3 版在线草稿，2026-08-19，作者提供的[第 2 章 Words and Tokens](https://web.stanford.edu/~jurafsky/slp3/2.pdf)，§2.4、§2.4.1–2.4.3。2026-11-19 核对相关正文；表格、词表与编号为解释性示例。向量映射另见同书第 7 章开头。
