---
title: Skill：可复用的任务方法
slug: skills
status: published
order: 70
updated: "2026-11-17"
mindmap:
  - label: "SKILL.md 与可选资源"
    heading: "组成与加载方式"
  - label: "发现 → 激活 → 按需加载"
    heading: "组成与加载方式"
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

## 与工具和协议的区别

Skill 主要组织任务方法与资料；[工具 Schema](/notes/tool-schema/)描述可调用操作的输入；[MCP](/notes/mcp/)规范应用与外部服务的连接和信息交换。Skill 可以指导 Agent 使用工具，但方法说明本身不授予外部操作权限。

[Superpowers](/notes/superpowers/)是用一组可组合 Skills 组织软件开发方法的具体项目。

## 参考

1. [Agent Skills Specification](https://agentskills.io/specification)，Directory structure、SKILL.md format、Progressive disclosure。参考 2026-11-17 读取的在线规范。
