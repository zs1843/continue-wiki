---
generated_by: note-mindmaps
title: "训练与适配"
slug: topic-8ed036c16e
---

# 训练与适配

- [指令微调：用示范数据调整行为](/notes/fine-tuning-sft/)
  - [SFT 优化目标序列的负对数似然](/notes/fine-tuning-sft/#%E8%AE%AD%E7%BB%83%E7%9B%AE%E6%A0%87)
  - [数据格式决定哪些 token 计损](/notes/fine-tuning-sft/#%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F%E5%86%B3%E5%AE%9A%E8%AE%A1%E6%8D%9F%E8%8C%83%E5%9B%B4)
  - [小模型也能在偏好上胜出](/notes/fine-tuning-sft/#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%B0%8F%E6%A8%A1%E5%9E%8B%E4%B9%9F%E8%83%BD%E8%83%9C%E5%87%BA)
  - [先分清知识不足还是行为不对](/notes/fine-tuning-sft/#%E8%BE%B9%E7%95%8C%E4%B8%8E%E9%80%89%E5%9E%8B)
- [参数高效微调：LoRA 与 QLoRA](/notes/lora-peft/)
  - [只训练低秩矩阵，冻结原权重](/notes/lora-peft/#%E5%8F%AA%E8%AE%AD%E7%BB%83%E4%BD%8E%E7%A7%A9%E7%9F%A9%E9%98%B5)
  - [QLoRA 用量化基座换显存](/notes/lora-peft/#qlora-%E7%94%A8%E9%87%8F%E5%8C%96%E5%9F%BA%E5%BA%A7%E6%8D%A2%E6%98%BE%E5%AD%98)
  - [省显存不等于没有代价](/notes/lora-peft/#%E7%9C%81%E6%98%BE%E5%AD%98%E4%B8%8D%E7%AD%89%E4%BA%8E%E6%B2%A1%E6%9C%89%E4%BB%A3%E4%BB%B7)
  - [全量微调仍是效果基线](/notes/lora-peft/#%E8%BE%B9%E7%95%8C%E4%B8%8E%E9%80%89%E5%9E%8B)
- [偏好优化：从 RLHF 到 DPO](/notes/preference-optimization/)
  - [偏好数据是比较而不是标准答案](/notes/preference-optimization/#%E5%81%8F%E5%A5%BD%E6%95%B0%E6%8D%AE%E6%9D%A5%E8%87%AA%E6%AF%94%E8%BE%83)
  - [RLHF 先学奖励再优化策略](/notes/preference-optimization/#rlhf-%E5%85%88%E5%AD%A6%E5%A5%96%E5%8A%B1%E5%86%8D%E4%BC%98%E5%8C%96)
  - [DPO 把奖励改写进分类损失](/notes/preference-optimization/#dpo-%E6%8A%8A%E5%A5%96%E5%8A%B1%E6%94%B9%E5%86%99%E8%BF%9B%E6%8D%9F%E5%A4%B1)
  - [偏好训练调整取舍，不补知识](/notes/preference-optimization/#%E8%BE%B9%E7%95%8C)
