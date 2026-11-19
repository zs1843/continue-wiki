---
title: AI 学习路线：从文本计算到有依据的回答
slug: ai-architecture-learning-path
status: published
order: 0
updated: "2026-11-19"
mindmap:
  - label: "先理解表示与生成"
    heading: "第一步模型怎样计算"
  - label: "改参数之前先分清任务需要"
    heading: "第二步模型怎样被训练与适配"
  - label: "推理成本由两阶段与缓存决定"
    heading: "第三步推理怎样运行"
  - label: "权限与增量更新决定检索能否上线"
    heading: "第四步资料怎样进入系统"
  - label: "行动要有评估与边界"
    heading: "第五步系统怎样行动评估与守住边界"
  - label: "多模态与产品让系统可用"
    heading: "第六步多模态与产品"
---

**AI 学习路线**把模型、训练、推理、资料、行动与产品串成一条阅读顺序。这里以“根据自己的笔记回答问题”为学习场景；这是本站的学习组织方式，不是某本教材提出的固定分层标准。

## 第一步：模型怎样计算

| 阅读顺序 | 应能解释的问题 |
| --- | --- |
| [Token](/notes/tokens-and-tokenization/) | 文本为什么不等于字数，编号与含义有什么区别 |
| [语言模型与生成](/notes/language-model-generation/) | 一次概率预测怎样变成整段文本，采样改变了什么 |
| [Attention 与 Transformer](/notes/attention-and-transformer/) | 不同位置的信息怎样结合，Q/K/V 分别做什么 |
| [训练与推理](/notes/training-and-inference/) | 改输入、改参数和调用模型有什么不同 |

## 第二步：模型怎样被训练与适配

[指令微调](/notes/fine-tuning-sft/)用任务示范调整模型行为；[LoRA 与 QLoRA](/notes/lora-peft/)只训练少量参数；[偏好优化](/notes/preference-optimization/)用比较数据调整回答取舍。

选型时先问：问题来自知识不足、格式不对，还是取舍不合口味。知识不足先看[检索](/notes/rag/)，格式与行为问题再考虑微调。

## 第三步：推理怎样运行

[推理运行与 KV Cache](/notes/inference-and-kv-cache/)解释 prefill 与 decode 两阶段怎样消耗算力与显存；[量化](/notes/quantization/)讨论用精度换成本；[推理可靠性](/notes/inference-reliability/)处理超时、重试、熔断与降级。

## 第四步：资料怎样进入系统

[Embedding](/notes/embeddings-and-similarity/)把文本变为可比较的表示；[检索与重排序](/notes/retrieval-and-reranking/)从资料库找候选；[RAG](/notes/rag/)把正文证据交给模型生成回答。

工程化环节见[文档解析与切分](/notes/document-parsing-chunking/)、[混合检索与查询改写](/notes/hybrid-retrieval/)、[检索的权限与更新](/notes/retrieval-permissions-updates/)。向量只是检索表示，不能代替原文和出处。

## 第五步：系统怎样行动、评估与守住边界

[Agent](/notes/agent-and-function-calling/)把工具调用组织成目标驱动的循环；[架构选型](/notes/architecture-selection/)决定流程由代码固定还是交给模型；[记忆与状态](/notes/memory-and-state/)负责跨会话保留信息。

[评测集与评分器](/notes/evaluation-sets/)和[回归与线上评估](/notes/regression-and-online-evaluation/)回答“系统是否真的变好”；[提示注入](/notes/prompt-injection/)、[过度自主](/notes/excessive-agency/)、[数据隔离](/notes/sensitive-data-isolation/)划出能读什么、能做什么的边界。

## 第六步：多模态与产品

[视觉编码与跨模态对齐](/notes/vision-encoders/)把图片接入模型；[语音与生成](/notes/speech-and-generation/)覆盖识别、合成与扩散生成。落到产品时，[AI 产品形态与交互](/notes/ai-product-interaction/)讨论人机分工，[成本、上线与治理](/notes/cost-launch-governance/)处理运行代价与风险责任。

后续还会补充评测统计、推理引擎选型与更多产品案例；本入口只为已有内容的阅读顺序负责。

## 教材与阅读方式

模型与检索部分主要依据 Jurafsky、Martin 的《Speech and Language Processing》第三版在线草稿（2026-08-19），以及 Zhang、Lipton、Li、Smola 的《Dive into Deep Learning》在线版 1.0.3；训练、推理、安全与多模态另引论文、规范与官方文档。具体读取范围列在各篇末尾。这里是按问题归纳的学习路径，不表示已读完上述教材。
