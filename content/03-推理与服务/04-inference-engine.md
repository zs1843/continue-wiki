---
title: 推理引擎选型：vLLM、SGLang 与 TensorRT-LLM
slug: inference-engine-selection
status: published
order: 40
updated: "2026-11-20"
mindmap:
  - label: "引擎差异在缓存管理与调度"
    heading: "缓存管理决定吞吐"
  - label: "分页管理减少 KV 浪费"
    heading: "分页与共享"
  - label: "前缀复用与结构化输出"
    heading: "前缀复用与结构化输出"
  - label: "编译优化绑定 NVIDIA 硬件"
    heading: "编译与硬件绑定"
---

**推理引擎** 把模型权重、请求调度与显存管理组织成可服务的系统。模型相同，引擎不同，首 token 延迟、吞吐与运维方式会差很多；选型不是选“最快”，而是选与硬件、负载和团队匹配的那一个。

## 缓存管理决定吞吐

大模型服务要同时处理很多请求，但每个请求的 KV Cache 很大，而且随生成长度动态增长、缩短。管理不好就会产生碎片与重复占用，批处理规模被显存卡住。[1]

vLLM 的 PagedAttention 借鉴操作系统的虚拟内存与分页：KV 按 block 管理，逻辑块通过 block table 映射到非连续的物理块，按需分配。vLLM 的博客给出的数字是：KV 浪费低于 4%，而旧系统的碎片与预留浪费可达 60–80%。[2]

## 分页与共享

同一篇论文报告，在相同延迟下，vLLM 相对 FasterTransformer、Orca 等系统把吞吐提高 2–4 倍；序列越长、模型越大、解码越复杂，收益越明显。[1]

vLLM 博客另有自己的基准：LLaMA-7B 在 A10G、13B 在 A100 上，用 ShareGPT 长度分布采样，相对 Hugging Face Transformers 最高 24 倍、相对 TGI 最高 3.5 倍。[2] 这些数字依赖模型、硬件与请求分布，不能直接当作今天的容量预期。

前缀缓存是分页之上的一层复用：开启 `enable_prefix_caching` 后，相同前缀的请求可以复用已算好的 KV。它只省 prefill，不省 decode；回答很长或请求之间没有共享前缀时，收益很小。[3]

## 前缀复用与结构化输出

SGLang 的 RadixAttention 把 prompt 与已生成结果的 KV 保存在 radix tree 中，做前缀查找、插入与淘汰，配合 LRU 与缓存感知调度；KV 以 paged layout 存在 GPU 上（1 token 一页），树结构放在 CPU，默认开启，并与 continuous batching、paged attention 兼容。[4]

SGLang 博客给出 2024 年 1 月的对比：Llama-7B（A10G，TP=1）与 Mixtral-8x7B（8×A10G，TP=8）上，相对 Guidance 与 vLLM v0.2.5 最高 5 倍吞吐。[4] 论文摘要另报告了最高 6.4 倍，以及用压缩有限状态机加速结构化输出解码。[5]

SGLang 的前端是带 `fork`、`gen`、`choices` 等原语的 DSL，可由解释器或图执行器运行，也能接 OpenAI、Anthropic、Gemini 或本地模型。[4]

## 编译与硬件绑定

TensorRT-LLM 是 NVIDIA 的推理库，当前是 PyTorch 原生实现；旧的 TensorRT engine 后端已移除，不再需要 `trtllm-build` 或 `convert_checkpoint`，可以直接加载 Hugging Face checkpoint。[6]

它的核心机制是 in-flight batching：把 context 与 generation 阶段混合批处理，输入需要打包、不留 padding，context 序列要排在 generation 之前；`max_num_tokens` 从 v0.11 起默认 8192。chunked context 需要 paged KV，块长要是 block size 的整数倍。官方称它能降低平均 TTFT，但可能抬高少数请求的 TTFT，建议常开。[7]

KV Cache 可以是 paged 或 contiguous，每层一个 cache；投机解码支持 draft/target 结构，以及 EAGLE3、MTP、PARD、DFlash、SA 等方案，draft 与 target 必须共用 tokenizer，dynamic tree 不支持 SWA 与 MLA。[8]

量化覆盖 FP4、FP8（per-tensor／block／row）、FP8 与 NVFP4 的 KV、W4A16 与 W4A8 的 AWQ／GPTQ；NVFP4 的 KV 需要 ModelOpt 离线量化，支持矩阵按模型与 GPU 代际不同。[9] 并行支持 TP、PP、DP、EP、CP 与 Wide-EP；TP 适合小 batch，DP 适合大 batch，attention DP 下 KV 会分区。[10]

## 选型按硬件负载与运维

| 维度 | 要问的问题 |
| --- | --- |
| 硬件 | 只有 NVIDIA，还是有其他加速卡？是否需要 FP4／FP8？ |
| 负载 | 多轮对话、共享长前缀多，还是单轮短请求多？ |
| 输出 | 是否需要稳定的 JSON／工具参数？ |
| 规模 | 单卡、多卡还是多节点？是否需要分段服务？ |
| 运维 | 团队能否维护量化、服务框架与升级？ |

一个实用的顺序：

1. 先确认模型与量化方案在该引擎的支持列表里。
2. 用自家流量测 TTFT、TPOT、吞吐与显存，而不是只看论文数字。
3. 再比较运维成本：部署、升级、监控、故障处理。
4. 最后才看峰值性能；峰值只在特定负载下成立。

能力对照要谨慎：前缀复用三家都有，机制不同；多 LoRA 在 vLLM 的文档里有明确的运行时开关与安全警告，其余两家本次没有读到可比内容；结构化输出与多实例路由也没有三家齐全的资料，不能下结论。

## 边界

- 本次未读 vLLM 的连续批处理与投机解码文档、SGLang 的路由与结构化输出正文，因此不比较这些能力。
- 基准数字分别来自 2023 年论文、2023 年博客与 2024 年博客；TensorRT-LLM 文档是 2026-11-16 的版本。它们不能当作当前版本的统一结论。
- 选型还受许可、社区活跃度、团队经验与现有基础设施影响，本文没有覆盖。
- 引擎解决“跑得快、跑得稳”，不解决提示、检索与评估问题。

## 参考

1. Kwon 等，[Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180)，SOSP 2023：分页 KV、共享与 2–4 倍吞吐，仅依据摘要。
2. vLLM，[vLLM: Easy, Fast, and Cheap LLM Serving with PagedAttention](https://vllm.ai/blog/2023-06-20-vllm)，2023-06-20：block table、KV 浪费低于 4% 与 60–80%、24 倍／3.5 倍基准。
3. vLLM，[Automatic Prefix Caching](https://raw.githubusercontent.com/vllm-project/vllm/main/docs/features/automatic_prefix_caching.md) 与 [LoRA](https://raw.githubusercontent.com/vllm-project/vllm/main/docs/features/lora.md)，2026-11-20 读取：前缀缓存只省 prefill、无共享前缀时收益小；多 LoRA 的运行时开关与安全警告。
4. LMSYS，[SGLang: Fast and Expressive LLM Inference with RadixAttention](https://www.lmsys.org/blog/2024-01-17-sglang/)，2024-01-17：radix tree、1 token 一页、LRU 与缓存感知调度、5 倍对比与前端 DSL。
5. Zheng 等，[SGLang: Efficient Execution of Structured Language Model Programs](https://arxiv.org/abs/2312.07104)，arXiv v2，2024-06-06：RadixAttention、压缩有限状态机与 6.4 倍，仅依据摘要。
6. NVIDIA，[TensorRT-LLM Overview](https://nvidia.github.io/TensorRT-LLM/overview.html) 与 [TensorRT Backend Removed](https://nvidia.github.io/TensorRT-LLM/legacy/tensorrt-backend-removal.html)，2026-11-20 读取：PyTorch 后端、engine 后端移除与直接加载 checkpoint。
7. 同上，[Paged Attention, IFB, and Request Scheduling](https://nvidia.github.io/TensorRT-LLM/features/paged-attention-ifb-scheduler.html)：混合批处理、packed 输入、chunked context 与 TTFT 取舍。
8. 同上，[Speculative Decoding](https://nvidia.github.io/TensorRT-LLM/features/speculative-decoding.html)：draft/target、EAGLE3／MTP／PARD／DFlash／SA 与限制。
9. 同上，[Quantization](https://nvidia.github.io/TensorRT-LLM/features/quantization.html)：FP4／FP8／NVFP4 KV／W4A16／W4A8 与 ModelOpt 依赖。
10. 同上，[Parallelism in TensorRT LLM](https://nvidia.github.io/TensorRT-LLM/features/parallel-strategy.html)：TP／PP／DP／EP／CP／Wide-EP 与适用批量。
