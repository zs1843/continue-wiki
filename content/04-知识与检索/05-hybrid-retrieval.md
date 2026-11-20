---
title: 混合检索与查询改写：让召回不只靠向量
slug: hybrid-retrieval
status: published
order: 50
updated: "2026-11-20"
mindmap:
  - label: "BM25 补上精确词面匹配"
    heading: "bm25-补上词面匹配"
  - label: "RRF 按排名合并多路结果"
    heading: "用-rrf-合并多路结果"
  - label: "查询改写要防止改变原意"
    heading: "查询改写"
  - label: "重排要看精度与预算"
    heading: "重排的预算"
---

**混合检索** 同时使用词面匹配与向量检索，再用融合规则合并结果。**查询改写** 则在检索前调整查询，让问法更接近资料里的表述。两种做法都希望在控制成本的同时提高召回。

## BM25 补上词面匹配

BM25 基于 TF-IDF（词频—逆文档频率），在词频之外加入文档长度归一化与词频饱和，避免长文档或高频词主导得分。[1] 它擅长精确词面匹配，例如唯一的错误码、产品型号或人名。

向量检索擅长语义相近但措辞不同的情况，却可能漏掉必须精确出现的字符串。两者互补，这是混合检索的出发点。

## 用 RRF 合并多路结果

Reciprocal Rank Fusion（RRF）按排名而不是原始分数合并多路结果，公式为 `score = Σ 1 / (k + rank)`，rank 从 1 开始。[2] 它不需要让不同检索器的分数可比，因此不需要调权重。

Elasticsearch 文档给出几个实现细节：[2]

- 至少需要两个子检索器，等权合并。
- `rank_constant` 默认 60，取值 ≥1；值越大，低排名文档的影响越大。
- `rank_window_size` 默认等于返回条数；越大相关性通常越好，但性能成本越高。
- 分页时 `from + size` 不能超过 `rank_window_size`，否则没有结果。
- 该实现不支持 scroll、sort 与 rescore。

Anthropic 的上下文检索实践也采用类似思路：BM25 取精确匹配的若干块，向量检索取语义相近的若干块，融合去重后取 top-K。[1] 重排阶段把候选从 top-150 压到 top-20，并报告 top-20 的效果优于 top-10 与 top-5。[1]

## 查询改写

HyDE（假设文档嵌入）的做法是：先让指令模型根据问题生成一段“假设答案”，再用无监督对比编码器把这段文字编码，在语料向量空间里找近邻。[3] 假设答案可能有虚假细节，但经过编码器的稠密瓶颈（把长短不一的文本压成固定长度向量的那一层）后，保留下来的更多是语义方向。

摘要报告，这种方法优于无监督的 Contriever，并接近微调检索器；实验覆盖网页搜索、问答、事实核查以及斯瓦希里语、韩语、日语等语言。[3] 摘要没有给出具体数字。

其他改写方式包括：补全指代、拆分子问题、生成同义词或术语变体。改写的风险是改变原意，因此应保留原查询作为一路召回，而不是完全替换。

## 重排的预算

重排模型比检索模型更贵，通常只对候选集做。预算由三件事决定：候选数量、重排模型大小、延迟要求。候选太少，重排没有发挥空间；候选太多，延迟与成本上升。

Anthropic 的经验是把候选压到 150 再重排到 20，并指出更多候选优于更少，但收益会递减。[1] 候选数量仍需在自己的语料上测试。

## 边界

- 混合检索增加索引与查询复杂度，资料量很小时未必划算。
- RRF 只看排名，丢掉了分数强弱信息；不同任务可能需要加权融合。
- 查询改写可能引入原问题没有的假设，需要在评测中单独检查。
- 重排模型也有领域偏差，换语料后要重新评估，参见[评测集与评分器](/notes/evaluation-sets/)。

## 参考

1. Anthropic，[Introducing Contextual Retrieval](https://www.anthropic.com/research/contextual-retrieval)，2026-11-19 读取至实施注意事项与结论：BM25 的作用、混合检索流程、重排候选与 top-K 对比。
2. Elastic，[Reciprocal rank fusion](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion)，同日读取全文：公式、参数、限制与分页约束。
3. Gao 等，[Precise Zero-Shot Dense Retrieval without Relevance Labels](https://arxiv.org/abs/2212.10496)，arXiv：HyDE 的假设文档与对比编码，仅依据摘要。
