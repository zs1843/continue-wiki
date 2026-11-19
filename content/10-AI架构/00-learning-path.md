---
title: AI 架构学习入口：从文本计算到有依据的回答
slug: ai-architecture-learning-path
status: published
order: 0
updated: "2026-11-19"
mindmap:
  - label: "先理解表示与生成"
    heading: "第一步模型究竟在计算什么"
  - label: "再理解检索与知识接入"
    heading: "第二步怎样把自己的资料交给模型"
  - label: "用分层证据评价系统"
    heading: "第三步怎样知道系统有效"
---

**AI 应用架构**组织模型、数据、工具与运行机制，明确每一部分怎样配合完成目标。这里先以“根据自己的笔记回答问题”为学习场景，连接模型基础、检索和验证；这是本站的学习组织方式，不是某本教材提出的固定分层标准。

## 第一步：模型究竟在计算什么

| 阅读顺序 | 应能解释的问题 |
| --- | --- |
| [Token](/notes/tokens-and-tokenization/) | 文本为什么不等于字数，编号与含义有什么区别 |
| [语言模型与生成](/notes/language-model-generation/) | 一次概率预测怎样变成整段文本，采样改变了什么 |
| [Attention 与 Transformer](/notes/attention-and-transformer/) | 不同位置的信息怎样结合，Q/K/V 分别做什么 |
| [训练与推理](/notes/training-and-inference/) | 改输入、改参数和调用模型有什么不同 |

## 第二步：怎样把自己的资料交给模型

[Embedding](/notes/embeddings-and-similarity/)把文本变为可比较的表示；[检索与重排序](/notes/retrieval-and-reranking/)从资料库找候选；[RAG](/notes/rag/)将正文证据交给模型生成回答。向量只是检索表示，不能代替原文和出处。

例如，问“Subagent 为什么有助于隔离上下文”，系统需要找到相关笔记、保留段落条件，再生成能回到来源的解释。生成过程流畅，不足以证明这些环节都正确。

## 第三步：怎样知道系统有效

[检索与回答评估](/notes/rag-evaluation-basics/)先区分“找到材料”和“正确使用材料”。已有的 [Harness 学习地图](/notes/harness-learning-map/)再解释执行约束、工具与工程反馈；两条线在可观测性和验证处相连。

后续还有记忆治理、架构选择、安全、运行成本、模型适配与多模态等独立主题。本入口不为这些尚未整理的主题创建空白分支。

## 教材与阅读方式

本组概念主要依据 Jurafsky、Martin 的《Speech and Language Processing》第三版在线草稿（2026-08-19），以及 Zhang、Lipton、Li、Smola 的《Dive into Deep Learning》在线版 1.0.3。具体读取章节、补充论文、示例性质列在各篇末尾。这里是按问题归纳的学习路径，不表示已读完两部教材。
