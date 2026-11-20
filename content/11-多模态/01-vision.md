---
title: 视觉编码与跨模态对齐：图片怎样进入模型
slug: vision-encoders
status: published
order: 10
updated: "2026-11-20"
mindmap:
  - label: "图像切成 patch 序列"
    heading: "图像切成-patch-序列"
  - label: "对比学习对齐图文"
    heading: "对比学习对齐图文"
  - label: "零样本靠自然语言指代"
    heading: "零样本靠语言指代"
  - label: "分辨率和批量限制效果"
    heading: "边界"
---

**视觉编码器** 把图像变成模型可处理的表示。文本模型处理 token 序列，图像则要先切成小块、编码成向量，再和文本表示对齐，才能做检索、问答或生成。

## 图像切成 patch 序列

ViT 把图像切成固定大小的 patch，把每个 patch 当作序列中的一个元素，直接用 Transformer 做图像分类，不依赖卷积网络。[1] 这与文本模型的结构一致：输入是一串元素，注意力在元素之间建立联系。

ViT 摘要强调它需要大规模预训练，再把学到的表示迁移到 ImageNet、CIFAR-100、VTAB 等中小基准；在这些基准上可以媲美当时最好的卷积网络，同时训练所需的算力显著更少。[1]

把图像接入语言模型时，常见的解释性做法是：视觉编码器输出 patch 向量，经投影层映射到语言模型的向量空间，作为“图像 token”拼进上下文。

## 对比学习对齐图文

CLIP 的训练任务是判断哪段文字配哪张图：从互联网收集 4 亿对图像—文本，用对比学习让匹配的图文向量靠近、不匹配的远离。[2]

它没有为每个类别训练专门的分类头，而是用自然语言描述类别，在向量空间里做匹配。因此同一套模型可以迁移到 OCR、视频动作识别、地理定位和细粒度分类等 30 多个数据集上。[2]

SigLIP 把 softmax 对比损失换成成对的 sigmoid 损失，不再需要全局相似度归一化，使批量大小与损失解耦。[3] 摘要报告：4 块 TPUv4 训练两天，SigLiT 达到 84.5% 的 ImageNet 零样本准确率；批量增大到 100 万时收益递减，32k 已经足够。[3] 这组数字对应特定设置，不能直接当作通用配置。

## 零样本靠语言指代

CLIP 摘要报告，零样本 ImageNet 准确率与原版 ResNet-50 相当，而且没有使用 ResNet-50 训练时用的 128 万张标注样本。[2] “零样本”指没有针对该数据集训练；模型此前仍在大规模图文对上学习过。

对笔记系统来说，这意味着可以先用图文对训练一个共享空间，再用文本查询找图片，而不必为每个图片类别单独标注。

## 边界

- 图像分辨率与 patch 大小决定细节上限；文字很小的扫描件、表格与图表，往往需要更高分辨率或专门的文档解析。
- 对比学习学到的是“整体是否匹配”，细粒度差异可能被忽略。
- 零样本效果依赖预训练数据分布；领域偏移大时需要评测，参见[评测集与评分器](/notes/evaluation-sets/)。
- 视觉编码器负责表示。回答中的图像理解错误，可能来自编码、对齐或语言模型中的任一环节。

## 参考

1. Dosovitskiy 等，[An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929)：patch 序列、纯 Transformer、预训练与迁移，仅依据摘要。
2. Radford 等，[Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020)：4 亿图文对、30 多个数据集、零样本 ImageNet 与 ResNet-50 的对比，仅依据摘要。
3. Zhai 等，[Sigmoid Loss for Language Image Pre-Training](https://arxiv.org/abs/2303.15343)，arXiv v4：sigmoid 损失、批量解耦、84.5% 零样本与批量规模观察，仅依据摘要。
