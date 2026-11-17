---
title: Skill：可复用的任务方法
slug: skills
status: published
order: 20
updated: "2026-11-17"
mindmap:
  - label: "SKILL.md 与可选资源"
    heading: "组成与加载方式"
  - label: "发现 → 激活 → 按需加载"
    heading: "组成与加载方式"
  - label: "元数据先加载，正文按需读取"
    heading: "一个最小的技能文件"
  - label: "描述写清做什么和何时用"
    heading: "描述即触发器"
  - label: "示例驱动"
    heading: "示例驱动"
  - label: "负向约束"
    heading: "负向约束"
  - label: "Skill 组织方法，MCP 连接能力"
    heading: "与工具和协议的区别"
---

**Agent Skill** 是按约定组织的任务能力目录，使用 `SKILL.md` 保存名称、描述和执行指引，并可附带脚本、参考资料与资源文件。它把一类任务的做法封装成 Agent 能够发现和按需加载的材料。[1]

## 组成与加载方式

Agent Skills 规范要求目录至少包含 `SKILL.md`。该文件由 YAML 元数据和 Markdown 正文组成；脚本和其他资料按需要添加。[1]

规范采用渐进加载：

1. 先通过名称与描述发现相关 Skill。
2. 激活后读取完整正文指引。
3. 执行过程中按需读取参考资料、使用附带资源。[1]

这种组织方式把「发现能力」和「加载详细做法」分开，减少每次都提供全部细节的需要。具体支持方式取决于使用的宿主。

## 一个最小的技能文件

规范要求的核心就是一个 `SKILL.md`。下面取自 Anthropic 文档的 `pdf-processing` 示例，外层用四个反引号，方便看清里面还有代码块：[2]

````markdown
---
name: pdf-processing
description: Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction.
---

# PDF Processing

## Quick start

Extract text with pdfplumber:

```python
import pdfplumber
with pdfplumber.open("file.pdf") as pdf:
    text = pdf.pages[0].extract_text()
```
````

（示例节选，保留 frontmatter、正文与代码块的写法。）[2]

`name` 与 `description` 在启动时随元数据进入系统提示，正文只在被选中后读取；正文里还可以引用 `FORMS.md`、`REFERENCE.md` 等文件，执行时按需读取。这就是「渐进加载」的实现：先用最少的信息判断要不要加载，再逐层展开细节。

## 与工具和协议的区别

Skill 主要组织任务方法与资料；[工具 Schema](/notes/tool-schema/)描述可调用操作的输入；[MCP](/notes/mcp/)规范应用与外部服务的连接和信息交换。Skill 可以指导 Agent 使用工具，但方法说明本身不授予外部操作权限。

[Superpowers](/notes/superpowers/)是用一组可组合 Skills 组织软件开发方法的具体项目。

## 写好一个 Skill 的四条实践

官方编写指南的核心是：简洁、可发现、经得起真实任务检验。[2] 下面四条是整理时归纳的实践，每条都能在官方说明里找到对应依据。

### 单一职责

一个 Skill 对应一类任务。正文控制在 500 行以内，超出的细节拆到单独文件，按领域或功能组织参考文件，避免一次加载与当前任务无关的内容。[2] 范围一散，描述就难以说清，正文也会变成清单的堆叠。

### 描述即触发器

`description` 决定 Skill 能否被选中：它要同时说明「做什么」和「什么时候用」，包含具体关键词，并用第三人称书写。启动时只有所有 Skill 的名称与描述进入系统提示，正文在被选中后才读取。[1][2] 所以描述写得含糊，内容再好也可能永远不会被触发。

### 示例驱动

当输出风格难以用规则描述时，给出输入与输出的示例对；官方建议示例要具体，不要抽象，也可以配合模板固定格式。[2] 示例比形容词更能对齐期望的详细程度。

### 负向约束

明确写出不该做什么，往往比只列「可以怎么做」更有效：不要同时给出多套并行方案、不要假设依赖已经安装、不要使用 Windows 路径、不要写会过期的时效信息。对高风险步骤用「必须」「不要修改」这类强语气限制自由度。[2] 约束越清楚，越不容易在边界上跑偏。

四条合起来是：范围小、能被发现、看过就会、越界能被拦住。

## 参考

1. [Agent Skills Specification](https://agentskills.io/specification)，Directory structure、SKILL.md format、Progressive disclosure。参考 2026-11-17 读取的在线规范。
2. Anthropic，[Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)，2026-11-17 读取：简洁原则、描述写法、示例与模板、需要避免的写法。
