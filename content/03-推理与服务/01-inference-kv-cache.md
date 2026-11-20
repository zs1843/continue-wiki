---
title: 推理运行：prefill、decode 与 KV Cache
slug: inference-and-kv-cache
status: published
order: 10
updated: "2026-11-20"
mindmap:
  - label: "prefill 一次读入，decode 逐个生成"
    heading: "prefill-与-decode-两阶段"
  - label: "KV Cache 复用历史计算结果"
    heading: "kv-cache-复用历史"
  - label: "分页管理避免显存碎片"
    heading: "分页管理显存"
  - label: "TTFT 与 TPOT 描述不同延迟"
    heading: "指标怎样算"
---

**推理运行** 是模型接收输入、逐 token 生成输出的过程。了解这个过程，有助于判断上下文长度怎样影响速度、显存用在了哪里，以及服务端为何需要排队和批处理。

## prefill 与 decode 两阶段

一次生成通常分两段：[1]

- **prefill**：把输入的全部 token 一起送进模型，并行计算，产出第一个输出 token。这一段决定首 token 延迟（TTFT）。
- **decode**：之后每次生成一个 token，把新 token 接在序列末尾继续计算。输出越长，这一段耗时越多。

vLLM 的指标文档按区间定义：prefill 从请求调度到首 token，decode 从首 token 到最后一个 token，inter-token 是相邻 token 的间隔；这些区间必须用同一进程的单调时钟测量。[1]

## KV Cache 复用历史

生成时，模型需要前面所有位置的 Key/Value 参与注意力。如果每生成一个 token 都重算全部历史，代价会随长度平方增长。**KV Cache** 把已经算过的 K/V 保存下来，后续步骤直接复用，只计算新 token。[2]

代价是显存：缓存大小随层数、头数、上下文长度与精度增长。Hugging Face 的文档列出两种管理方式：动态缓存随生成增长、到滑动窗口上限后截断；静态缓存一次预分配最大长度，但会为被掩码的位置浪费显存。[2]

还有两种省显存的做法：把部分缓存卸载到 CPU（只有当前层在 GPU 上，吞吐会下降），或把缓存量化到更低精度（精度下降，短上下文时甚至可能更慢）。[2]

## 分页管理显存

连续分配缓存容易产生碎片。vLLM 的 PagedAttention 把 K/V 切成固定大小的 block，每个 block 存若干 token 的单个 head 数据；文档中的示例是一个 block 存 16 个 token、每个 head 维度 128，共 2048 个元素。[3] 分页让不同请求的缓存可以非连续存放，按块分配与回收。

## 指标怎样算

服务端常用几个指标描述体验与容量：[1]

- **TTFT**：首 token 延迟，主要受 prefill 与排队影响。
- **TPOT**：每个输出 token 的平均耗时，公式为 `(端到端耗时 − TTFT) / (输出 token 数 − 1)`；输出只有一个 token 时记为 0。
- **ITL**：相邻输出 token 的间隔，多 token 输出时与 TPOT 不一定相同。
- **KV Cache 使用率**：`kv_cache_usage_perc` 在 0 到 1 之间，反映显存压力。
- **前缀缓存命中率**：相同前缀被复用的比例，vLLM 文档用 1k 查询的示例计算。

判断服务表现时，还要结合业务指标：TTFT 低但输出很长，端到端仍然慢；显存使用率高但排队少，可能只是批处理策略不同。

## 边界

- KV Cache 省的是重复计算，不减少模型本身的参数显存。
- 前缀缓存要求请求开头完全一致，系统提示或检索上下文的细微差异都会导致未命中。
- 批处理提高吞吐，但可能增加单个请求的等待时间；吞吐与延迟需要按场景权衡。
- 不同推理引擎的实现与指标口径不同，跨系统比较前要确认定义；引擎差异与选型见[推理引擎选型](/notes/inference-engine-selection/)。

## 参考

1. vLLM，[Metrics](https://raw.githubusercontent.com/vllm-project/vllm/main/docs/design/metrics.md)，2026-11-19 读取全文：prefill/decode/inter-token 区间、TPOT 公式、KV Cache 使用率与前缀命中率示例；站点页面只返回导航壳。
2. Hugging Face Transformers，[KV cache](https://raw.githubusercontent.com/huggingface/transformers/main/docs/source/en/kv_cache.md)，同日读取全文：动态与静态缓存、卸载、量化与 prefill。
3. vLLM，[Paged Attention](https://raw.githubusercontent.com/vllm-project/vllm/main/docs/design/paged_attention.md)，同日读取 Concepts 一节；文档开头标注为历史文档，block 示例为原文数字。
