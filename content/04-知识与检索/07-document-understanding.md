---
title: 文档理解与 OCR：让扫描件和表格进入检索
slug: document-understanding-ocr
status: published
order: 45
updated: "2026-11-20"
mindmap:
  - label: "解析质量决定检索上限"
    heading: "解析质量决定检索上限"
  - label: "版面模型输出结构而不是纯文本"
    heading: "版面模型输出结构而不是纯文本"
  - label: "表格与选择标记要保留结构"
    heading: "表格与选择标记要保留结构"
  - label: "页数与分辨率都有上限"
    heading: "页数与分辨率有上限"
---

**文档理解** 把 PDF、扫描件、图片与 Office 文件转成带结构的文本：段落角色、表格、选择标记、图表与章节层级。只做 OCR（光学字符识别）只能得到一串字，检索与问答却需要知道“这段是标题、那是表格”。

## 解析质量决定检索上限

[文档解析与切分](/notes/document-parsing-chunking/)讲过切分粒度影响召回；切分之前，解析已经决定了资料里有什么。识别错的字、丢掉的表格行列、合并错的段落，都会一路传到嵌入、检索与回答，而且很难在后续环节补回来。

## 版面模型输出结构而不是纯文本

Azure AI Document Intelligence 的 Layout 模型把增强 OCR 与深度学习结合，抽取文本、表格、选择标记与版面结构。[1] 支持的输入包括 PDF、常见图片格式（JPEG、PNG、BMP、TIFF、HEIF）以及 Office 文件（DOCX、XLSX、PPTX、HTML）。[1]

输出不只是文字，还包括：

- `pages`：页面方向与尺寸。
- `paragraphs`：段落及其逻辑角色，例如 title、sectionHeading、footnote、pageHeader、pageFooter、pageNumber。
- `lines` 与 `words`：文字及置信度，并标记手写内容。
- `selection marks`：勾选框状态与置信度。
- `tables`：行列数、跨行跨列、表头标记，支持旋转表格。
- `figures`：位置、文本范围与标题。
- `sections` 与 `subsections`：章节层级。

把 `outputContentFormat` 设为 Markdown 时，v4.0 用 HTML 表格表示表格，用 ☒／☐ 表示选择标记。[1] 这些结构对切分很有用：按标题切、把表格整体作为一个块、保留表头。

## 表格与选择标记要保留结构

表格如果被压成一行行文字，列与值的对应关系就丢了。保留 HTML 表格或结构化行列，检索到的片段才能回答“这个字段是多少”。

选择标记同理：勾选与未勾选是一个字段的两种值，丢掉之后表单类文档就无法判断。

## 页数与分辨率有上限

Layout v4.0 的文档给出这些限制：[1]

- PDF／TIFF 最多 2,000 页；免费层只处理前 2 页。
- 文件上限 500 MB（S0，付费层）或 4 MB（F0，免费层）。
- 图片尺寸 50×50 到 10,000×10,000 像素。
- 最小文字高度 12 像素，约等于 1024×768、150 dpi 下的 8 pt。
- XLSX 输入不支持表格分析。
- 跨页表格需要先拆页再后处理。
- v4.0 图表所在的区域坐标（bounding region）不包含标题与脚注。
- Office 文件里的内嵌图片不会被解析。

这些限制决定了流水线设计：大文件要分批、低分辨率扫描件要重新采集、跨页表格要单独处理。

## 边界

- OCR 与版面判断都有误差；置信度可以用来筛出需要人工复核的页。
- 版面模型解决“读出来”，不解决“这段是否相关”；相关性仍由检索与重排负责。
- 文档要上传到外部服务处理，敏感资料的合规边界见[数据隔离](/notes/sensitive-data-isolation/)。
- 结构化输出再完整，也需要按资料类型检查切分结果，参见[文档解析与切分](/notes/document-parsing-chunking/)。

## 参考

1. Microsoft Azure AI Document Intelligence，[Layout model](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0)，v4.0（2024-11-30 GA），2026-11-20 读取至 Sections：输入格式、输出字段、Markdown 表示与限制。
2. 同上，[Document Intelligence overview](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview?view=doc-intel-4.0.0)，同日读取（页面截断）：版本与模型定位。
