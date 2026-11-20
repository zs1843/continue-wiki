---
title: Skill：可复用的任务方法
slug: skills
status: published
order: 100
updated: "2026-11-20"
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
  - label: "复用评判标准与检查脚本"
    heading: "承载专业评判方法"
---

**Agent Skill** 是按约定组织的任务能力目录，使用 `SKILL.md` 保存名称、描述和执行指引，并可附带脚本、参考资料与资源文件。它把一类任务的做法封装成 Agent 能够发现和按需加载的材料。[1]

## 组成与加载方式

Agent Skills 规范要求目录至少包含 `SKILL.md`。该文件由 YAML（一种用缩进表示层级的配置格式）元数据和 Markdown 正文组成；脚本和其他资料按需要添加。[1]

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

（示例节选，保留文件开头元数据、正文与代码块的写法。）[2]

`name` 与 `description` 在启动时随元数据进入系统提示，正文只在被选中后读取；正文里还可以引用 `FORMS.md`、`REFERENCE.md` 等文件，执行时按需读取。这种「渐进加载」方式是：先用最少的信息判断要不要加载，再逐层展开细节。

## 与工具和协议的区别

Skill 主要组织任务方法与资料；[工具 Schema](/notes/tool-schema/)描述可调用操作的输入；[MCP](/notes/mcp/)规范应用与外部服务的连接和信息交换。Skill 可以指导 Agent 使用工具，但方法说明本身不授予外部操作权限。

[Superpowers](/notes/superpowers/)是用一组可组合 Skills 组织软件开发方法的具体项目。

## 写好一个 Skill 的四条实践

官方编写指南强调简洁、可发现，以及用真实任务检验效果。[2] 下面四条是整理时归纳的实践，每条都能在官方说明里找到对应依据。

### 单一职责

一个 Skill 对应一类任务。正文控制在 500 行以内，超出的细节拆到单独文件，按领域或功能组织参考文件，避免一次加载与当前任务无关的内容。[2] 范围一散，描述就难以说清，正文也会变成清单的堆叠。

### 描述即触发器

`description` 决定 Skill 能否被选中：它要同时说明「做什么」和「什么时候用」，包含具体关键词，并用第三人称书写。启动时只有所有 Skill 的名称与描述进入系统提示，正文在被选中后才读取。[1][2] 所以描述写得含糊，内容再好也可能永远不会被触发。

### 示例驱动

当输出风格难以用规则描述时，给出输入与输出的示例对；官方建议示例要具体，不要抽象，也可以配合模板固定格式。[2] 示例比形容词更能对齐期望的详细程度。

### 负向约束

明确写出不该做什么，往往比只列「可以怎么做」更有效：不要同时给出多套并行方案、不要假设依赖已经安装、不要使用 Windows 路径、不要写会过期的时效信息。对高风险步骤用「必须」「不要修改」这类强语气限制自由度。[2] 约束越清楚，越不容易在边界上跑偏。

这些做法帮助 Agent 找到相关 Skill、理解步骤，并识别哪些操作受到限制。

## 承载专业评判方法

Skill 可以保存代码质量、性能或安全审查的方法：关注哪些问题，采用什么标准，收集哪些证据，运行哪些脚本，以及怎样报告结果。配套资料和可执行脚本是规范允许的组成部分。[1] 例如，性能分析 Skill 可以要求先记录基线，再在相同条件下测量修改后的延迟；这是方法示例，并非规范中的固定流程。

评判说明负责告诉 Agent 怎样检查，实际结果仍需要工具执行与证据支持。Skill 的存在不能自动证明代码符合某个架构或安全要求，也不能替代权限和确定性的检查门禁。在 [Harness 工程](/notes/harness-engineering/)中，它适合沉淀经过验证、能复用和修订的专业方法。

书籍配套仓库的 `pr-code-review` 是一个具体实例：先获取拉取请求（PR）的变更，再根据文件类型加载 Python、Go、Java 等语言的审查指南，按问题严重程度组织发现，最后由脚本执行提交审查等动作。[3] 角色负责“由谁审查”，Skill 保存“按什么步骤、用哪些材料审查”；按语言读取参考资料也体现了渐进加载。这里描述的是仓库中的工作流设计，不代表本次执行过 PR 审查。

## 参考

1. [Agent Skills Specification](https://agentskills.io/specification)，Directory structure、SKILL.md format、Progressive disclosure。参考 2026-11-17 读取的在线规范。
2. Anthropic，[Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)，2026-11-17 读取：简洁原则、描述写法、示例与模板、需要避免的写法。
3. 张建飞，《Harness工程实战：从零开始驾驭AI软件工程》配套仓库快照 `51c6b4b`：[pr-code-review/SKILL.md](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter3/pr-code-review/SKILL.md)，实际读取于 2026-11-19；对应书中第 3.5 节的主题。
