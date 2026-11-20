---
title: 结构化检索：GraphRAG 与 NL2SQL
slug: structured-retrieval
status: published
order: 80
updated: "2026-11-20"
mindmap:
  - label: "GraphRAG 先建实体关系再摘要"
    heading: "先建图再摘要"
  - label: "全局问题与局部问题分开"
    heading: "全局与局部查询分工不同"
  - label: "NL2SQL 生成可执行查询"
    heading: "把问题变成可执行查询"
  - label: "两条路径都要建模与评估"
    heading: "两条路径都要建模与评估"
---

**结构化检索** 处理普通向量检索不擅长的两类问题：需要跨文档汇总的主题性问题，以及需要对关系数据库做精确统计的问题。前者常用 GraphRAG，后者常用 NL2SQL。

## 先建图再摘要

GraphRAG 的索引管线从原文抽取实体、关系与陈述，做社区检测，再为不同层级的社区生成摘要，最后把摘要向量化；默认输出 Parquet 表与向量库。[1]

它把“逐块检索”换成“先理解语料结构，再按结构回答”。代价在索引阶段：抽取、社区划分与摘要都要调用模型，官方提醒索引可能很贵，建议先小规模试。[1]

## 全局与局部查询分工不同

GraphRAG 提供几种查询方式：[2]

| 方式 | 做法 | 适合的问题 |
| --- | --- | --- |
| Local | 用知识图谱与相关原文块回答 | 具体实体、具体关系 |
| Global | 对所有社区摘要做 map-reduce | 跨语料的主题、趋势、全局问题 |
| DRIFT | 用社区信息扩展局部检索 | 既要具体又要背景 |
| Basic | 普通向量 RAG | 作为对照基线 |

Global 查询要遍历大量社区摘要，资源消耗明显更高；它适合“这批资料主要在讨论什么”这类问题，不适合问某个字段的值。

需要知道项目状态：GraphRAG 的 README 标注它是研究项目、示例代码非官方支持，并已进入维护模式；开箱效果未必最佳，官方建议调整提示。[1]

## 把问题变成可执行查询

NL2SQL（Text-to-SQL）把自然语言问题转成可在关系数据库执行的 SQL。[3]

BIRD 基准说明了这件事为什么难：12,751 对问题—SQL、95 个数据库、33.4 GB 数据、37 个专业领域；它强调脏数据、问题与库值之间需要外部知识，以及 SQL 的执行效率，模型不能只做语义解析，还要理解库里的实际取值。[4]

摘要给出的数字是：在该基准上，当时最强的 ChatGPT 执行准确率为 40.08%，人类为 92.96%。[4] 这是 2023 年的结果，用于说明难度，不代表当前最好水平。

## 两条路径都要建模与评估

- GraphRAG 需要设计实体与关系的范围、社区粒度与摘要提示；索引会过时，资料更新后要重建或增量维护。
- NL2SQL 需要 schema 描述、字段与业务术语的映射、值链接；复杂 join 与聚合是主要失败来源。
- 两者都要用任务级评测，而不是只看生成是否流畅；检索与回答评估的方法见[评测集与评分器](/notes/evaluation-sets/)。

## 怎么选

| 问题 | 更适合 |
| --- | --- |
| 某个人、某份文档、某个事件的具体信息 | 向量检索或 GraphRAG Local |
| 整个资料库在讨论哪些主题 | GraphRAG Global |
| 精确的计数、求和、分组统计 | NL2SQL |
| 大量重复的固定报表问题 | NL2SQL 加缓存与权限控制 |

如果向量 RAG 已经能回答，就不必为了“结构化”而建图；GraphRAG 的成本主要在索引与维护，NL2SQL 的成本主要在 schema 治理与错误处理。

## 边界

- GraphRAG 是研究项目，接口与效果会变；不要把示例配置当作生产标准。
- NL2SQL 的执行准确率在复杂库上仍然有限；生成的 SQL 要先做只读、行数限制与参数校验，权限边界见[数据隔离](/notes/sensitive-data-isolation/)。
- BIRD 的数字对应特定模型与时间，不能直接当作当前能力。
- 两条路径都依赖底层资料质量；解析与切分的问题仍会传上来，见[文档理解与 OCR](/notes/document-understanding-ocr/)。

## 参考

1. Microsoft，[GraphRAG README](https://raw.githubusercontent.com/microsoft/graphrag/main/README.md)，2026-11-20 读取全文：索引管线、输出、研究项目与维护模式、成本提示。
2. Microsoft，[GraphRAG Query Overview](https://microsoft.github.io/graphrag/query/overview/)，同日读取全文：Local、Global、DRIFT 与 Basic 的定位。
3. 同上，[Indexing Overview](https://microsoft.github.io/graphrag/index/overview/)，同日读取全文：实体、关系、社区与摘要的索引流程。
4. [Text-to-SQL 综述](https://arxiv.org/abs/2208.13629) 与 [BIRD 基准](https://arxiv.org/abs/2305.03111v3)，arXiv：NL2SQL 定义、基准规模与执行准确率，均仅依据摘要。
