---
title: 量化：用精度换显存与速度
slug: quantization
status: published
order: 20
updated: "2026-11-19"
mindmap:
  - label: "量化减少每个参数的存储位数"
    heading: "量化省的是显存"
  - label: "训练后量化分预量化与在线量化"
    heading: "训练后量化的两条路"
  - label: "GPTQ 与 AWQ 的侧重点不同"
    heading: "gptq-与-awq"
  - label: "缓存量化有额外代价"
    heading: "kv-cache-也能量化"
---

**量化** 用更少的位数表示模型权重或激活值，降低显存占用与内存带宽压力。它不改变模型结构，但会引入数值误差；误差是否可接受，取决于任务与实现。

## 量化省的是显存

Hugging Face 的量化概览给出一个直观换算：bf16 每个参数占 2 字节，8B 参数模型约需 16GB；8bit 量化后约 8GB，4bit 后约 4–5GB。[1] 这是权重本身的估算，不含 KV Cache、激活与运行时开销。

文档还列出 20 多种量化方法，并区分两种加载方式：直接加载已经量化好的权重（AWQ、GGUF 等），或使用校准数据在加载时量化（GPTQ 类方法需要校准数据）。[1] GGUF 文件多数在加载后会反量化，推理时未必保持低位宽计算。[1]

## 训练后量化的两条路

- **仅权重量化**：把权重压到低位宽，激活仍用较高精度。实现简单，适合显存受限的部署。
- **权重与激活都量化**：进一步降低计算与带宽，但对校准和硬件支持要求更高。

量化可以在训练后做（PTQ），也可以在训练中模拟量化误差（QAT）。本文讨论的是前者，因为开源模型的部署更常见。

## GPTQ 与 AWQ

GPTQ 是一次性、基于近似二阶信息的方法：用校准数据逐层量化，摘要报告 175B 模型约 4 GPU 小时完成，支持 3–4 bit，精度损失可忽略；相对 FP16，端到端分别有 3.25 倍（A100）与 4.5 倍（A6000）的加速。[2]

AWQ 是仅权重量化，观察到保护约 1% 的显著权重就能明显减少精度损失；它按激活分布缩放权重，不做反向传播，TinyChat 实现相对 FP16 有 3 倍以上加速。[3]

两者的取舍不在“谁更先进”，而在你的约束：是否需要校准数据、目标硬件是否有对应 kernel、能否接受激活量化带来的误差。

## KV Cache 也能量化

推理时的 KV Cache 同样占显存。Hugging Face 文档列出多种缓存量化后端，例如 HQQ 的 1/2/3/4/8 bit、Quanto 的 2/4 bit、FP8 的 e4m3fn。[4] 代价是精度下降；文档还提示，在短上下文场景下，量化缓存甚至可能增加延迟。[4]

## 边界

- 量化误差与任务相关：分类或格式任务可能几乎无损，长链推理或数值敏感任务更容易受影响。
- 低位宽需要硬件与推理引擎支持，缺少对应 kernel 时未必更快。
- 校准数据分布与真实流量不一致时，量化后的表现会偏离预期。
- 显存估算只算权重，部署时还要加上 KV Cache 与批处理带来的峰值。

## 参考

1. Hugging Face Transformers，[Quantization overview](https://raw.githubusercontent.com/huggingface/transformers/main/docs/source/en/quantization/overview.md)，2026-11-19 读取全文：位宽与显存换算、方法数量、加载方式与 GGUF 行为。
2. Frantar 等，[GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers](https://arxiv.org/abs/2210.17323)，arXiv v2：一次性二阶量化、175B 约 4 GPU 小时、3–4 bit 与加速比，仅依据摘要。
3. Lin 等，[AWQ: Activation-aware Weight Quantization for On-Device LLM Compression and Acceleration](https://arxiv.org/abs/2306.00978)，arXiv v6：仅权重量化、保护 1% 显著权重、TinyChat 加速，仅依据摘要。
4. Hugging Face Transformers，[KV cache](https://raw.githubusercontent.com/huggingface/transformers/main/docs/source/en/kv_cache.md)，同日读取：缓存量化后端与短上下文代价。
