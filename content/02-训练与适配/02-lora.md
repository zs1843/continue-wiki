---
title: 参数高效微调：LoRA 与 QLoRA
slug: lora-peft
status: published
order: 20
updated: "2026-11-19"
mindmap:
  - label: "只训练低秩矩阵，冻结原权重"
    heading: "只训练低秩矩阵"
  - label: "QLoRA 用量化基座换显存"
    heading: "qlora-用量化基座换显存"
  - label: "省显存不等于没有代价"
    heading: "省显存不等于没有代价"
  - label: "全量微调仍是效果基线"
    heading: "边界与选型"
---

**参数高效微调（PEFT）** 冻结大部分预训练参数，只训练少量新增参数，让微调的显存与存储成本降下来。LoRA 与 QLoRA 是其中最常见的两类做法。

## 只训练低秩矩阵

LoRA 冻结预训练权重，在每层注入可训练的低秩分解矩阵，用两个小矩阵的乘积表示权重更新。[1] 这样需要更新的参数远少于全量微调。

摘要给出的对比是：与用 Adam 全量微调 GPT-3 175B 相比，LoRA 可训练参数少 10,000 倍，GPU 显存少 3 倍；在 RoBERTa、DeBERTa、GPT-2、GPT-3 上质量不劣于全量微调，且不像 adapter 那样增加推理延迟。[1] 这些是论文特定设置的结论，换成其他模型与数据仍需自行验证。

## QLoRA 用量化基座换显存

QLoRA 让梯度穿过冻结的 4-bit 量化模型进入 LoRA 参数，从而在更小的显存里微调更大的模型。摘要报告：单张 48GB GPU 可以微调 65B 模型，并保持 16-bit 全量微调的任务表现；方法上提出 NF4、双重量化与 paged optimizers。[2]

同一摘要还报告了 Guanaco 模型在 Vicuna 基准上达到 ChatGPT 的 99.3%，单卡微调 24 小时，共微调 1000 多个模型、8 个指令数据集。[2] 这些数字用于说明可行性，不代表任意任务都能复现。

## 省显存不等于没有代价

- 量化基座会带来精度损失，虽然摘要称任务表现可以保持，但具体任务需要验证。
- 低秩矩阵限制了可表达的更新幅度；任务与基座差异很大时，全量微调仍可能更好。
- 适配器需要额外存储与部署管理；多个任务各有一份适配器时，加载与版本管理会成为工程问题。
- 训练数据质量仍然是主要变量，PEFT 不会弥补错误示范。

Hugging Face PEFT 文档把这一族的共同点概括为：只训练少量额外参数，显著降低计算与存储需求，效果与全量微调相当。[3]

## 边界与选型

- 显存有限、任务明确、数据量中等：LoRA 是默认起点。
- 单卡想碰更大的基座：QLoRA 更现实，但要接受量化误差与更复杂的依赖。
- 需要改变模型的知识面：先考虑[检索](/notes/rag/)；PEFT 更适合调整风格、格式与任务行为。
- 需要对齐偏好而非模仿示范：见[偏好优化](/notes/preference-optimization/)。

## 参考

1. Hu 等，[LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)，arXiv v2：冻结权重、低秩矩阵、参数与显存对比、无额外推理延迟，仅依据摘要。
2. Dettmers 等，[QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314)：4-bit 基座、NF4、双重量化、paged optimizers、65B/48GB 与 Guanaco 结果，仅依据摘要。
3. Hugging Face，[PEFT](https://huggingface.co/docs/peft/index)，2026-11-19 读取：参数高效微调的定位与收益。
