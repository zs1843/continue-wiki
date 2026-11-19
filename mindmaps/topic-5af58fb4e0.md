---
generated_by: note-mindmaps
title: "推理与服务"
slug: topic-5af58fb4e0
---

# 推理与服务

- [推理运行：prefill、decode 与 KV Cache](/notes/inference-and-kv-cache/)
  - [prefill 一次读入，decode 逐个生成](/notes/inference-and-kv-cache/#prefill-%E4%B8%8E-decode-%E4%B8%A4%E9%98%B6%E6%AE%B5)
  - [KV Cache 复用历史计算结果](/notes/inference-and-kv-cache/#kv-cache-%E5%A4%8D%E7%94%A8%E5%8E%86%E5%8F%B2)
  - [分页管理避免显存碎片](/notes/inference-and-kv-cache/#%E5%88%86%E9%A1%B5%E7%AE%A1%E7%90%86%E6%98%BE%E5%AD%98)
  - [TTFT 与 TPOT 描述不同延迟](/notes/inference-and-kv-cache/#%E6%8C%87%E6%A0%87%E6%80%8E%E6%A0%B7%E7%AE%97)
- [量化：用精度换显存与速度](/notes/quantization/)
  - [量化减少每个参数的存储位数](/notes/quantization/#%E9%87%8F%E5%8C%96%E7%9C%81%E7%9A%84%E6%98%AF%E6%98%BE%E5%AD%98)
  - [训练后量化分预量化与在线量化](/notes/quantization/#%E8%AE%AD%E7%BB%83%E5%90%8E%E9%87%8F%E5%8C%96%E7%9A%84%E4%B8%A4%E6%9D%A1%E8%B7%AF)
  - [GPTQ 与 AWQ 的侧重点不同](/notes/quantization/#gptq-%E4%B8%8E-awq)
  - [缓存量化有额外代价](/notes/quantization/#kv-cache-%E4%B9%9F%E8%83%BD%E9%87%8F%E5%8C%96)
- [推理可靠性：超时、重试与降级](/notes/inference-reliability/)
  - [只重试瞬时故障](/notes/inference-reliability/#%E5%8F%AA%E9%87%8D%E8%AF%95%E7%9E%AC%E6%97%B6%E6%95%85%E9%9A%9C)
  - [超时值应从下游延迟推导](/notes/inference-reliability/#%E8%B6%85%E6%97%B6%E6%8C%89%E4%B8%8B%E6%B8%B8%E5%BB%B6%E8%BF%9F%E5%AE%9A)
  - [重试会在链路上放大流量](/notes/inference-reliability/#%E9%87%8D%E8%AF%95%E4%BC%9A%E6%94%BE%E5%A4%A7%E6%B5%81%E9%87%8F)
  - [熔断与降级用来止损](/notes/inference-reliability/#%E7%94%A8%E7%86%94%E6%96%AD%E4%B8%8E%E9%99%8D%E7%BA%A7%E6%AD%A2%E6%8D%9F)
