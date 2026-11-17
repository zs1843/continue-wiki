---
generated_by: note-mindmaps
title: "知识总览"
slug: knowledge
---

# 知识总览

## Agent基础

- [Agent 与 Function Calling](/notes/agent-and-function-calling/)
  - [模型动态选择行动](/notes/agent-and-function-calling/)
  - [Function Calling：工具名与参数](/notes/agent-and-function-calling/#%E4%BB%8E%E8%B0%83%E7%94%A8%E5%B7%A5%E5%85%B7%E5%88%B0%E6%8E%A8%E8%BF%9B%E4%BB%BB%E5%8A%A1)
  - [程序执行，结果反馈给模型](/notes/agent-and-function-calling/#%E4%BB%8E%E8%B0%83%E7%94%A8%E5%B7%A5%E5%85%B7%E5%88%B0%E6%8E%A8%E8%BF%9B%E4%BB%BB%E5%8A%A1)
- [工具 Schema](/notes/tool-schema/)
  - [字段类型与必填项](/notes/tool-schema/#%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8C%96%E7%9A%84%E5%8F%82%E6%95%B0%E5%AE%9A%E4%B9%89)
  - [禁止额外字段](/notes/tool-schema/#%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8C%96%E7%9A%84%E5%8F%82%E6%95%B0%E5%AE%9A%E4%B9%89)
  - [Schema 校验与业务授权有不同职责](/notes/tool-schema/)
- [Agent Loop](/notes/agent-loop/)
  - [调用模型 → 执行工具 → 更新上下文](/notes/agent-loop/#%E5%BE%AA%E7%8E%AF%E5%A6%82%E4%BD%95%E7%BB%A7%E7%BB%AD)
  - [任务完成与迭代上限](/notes/agent-loop/#%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E5%81%9C%E6%AD%A2)
  - [执行成功还需要任务验收](/notes/agent-loop/#%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E5%81%9C%E6%AD%A2)
- [ReAct：推理与行动的交替](/notes/react/)
  - [thought 不改变环境](/notes/react/#%E6%8E%A8%E7%90%86%E4%B8%8E%E8%A1%8C%E5%8A%A8%E6%80%8E%E6%A0%B7%E4%BA%A4%E6%9B%BF)
  - [search、lookup、finish 动作](/notes/react/#%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8C%96%E7%A4%BA%E4%BE%8B)
  - [CoT 更易产生幻觉](/notes/react/#%E4%B8%8E-cot-%E5%92%8C-act-%E7%9A%84%E5%AF%B9%E6%AF%94)
  - [重复生成容易陷入循环](/notes/react/#%E8%BE%B9%E7%95%8C%E4%B8%8E%E5%A4%B1%E8%B4%A5%E6%A8%A1%E5%BC%8F)
- [Subagent 与任务交接](/notes/subagents/)
  - [独立上下文与结果摘要](/notes/subagents/#%E7%8B%AC%E7%AB%8B%E4%B8%8A%E4%B8%8B%E6%96%87%E6%84%8F%E5%91%B3%E7%9D%80%E4%BB%80%E4%B9%88)
  - [并行、隔离与专注度](/notes/subagents/#%E5%92%8C%E5%8D%95%E4%B8%AA%E4%BB%A3%E7%90%86%E7%9B%B8%E6%AF%94)
  - [强依赖任务不适合拆分](/notes/subagents/#%E6%8B%86%E5%88%86%E4%B8%8D%E5%88%92%E7%AE%97%E7%9A%84%E6%83%85%E5%BD%A2)

## 上下文与范式

- [上下文工程](/notes/context-engineering/)
  - [选择、组织与维护上下文](/notes/context-engineering/)
  - [按需检索与上下文压缩](/notes/context-engineering/#%E5%87%A0%E7%A7%8D%E5%B8%B8%E8%A7%81%E6%96%B9%E6%B3%95)
  - [结构化笔记与子智能体](/notes/context-engineering/#%E5%87%A0%E7%A7%8D%E5%B8%B8%E8%A7%81%E6%96%B9%E6%B3%95)
- [Prompt / Context / Harness](/notes/prompt-context-harness/)
  - [Prompt：表达任务与约束](/notes/prompt-context-harness/#%E4%B8%89%E8%80%85%E5%88%86%E5%88%AB%E5%85%B3%E6%B3%A8%E4%BB%80%E4%B9%88)
  - [Context：当前可用信息](/notes/prompt-context-harness/#%E4%B8%89%E8%80%85%E5%88%86%E5%88%AB%E5%85%B3%E6%B3%A8%E4%BB%80%E4%B9%88)
  - [Harness：执行、验证与恢复](/notes/prompt-context-harness/#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E8%BF%90%E8%A1%8C%E7%8E%AF%E5%A2%83)

## 能力扩展

- [MCP：连接外部能力](/notes/mcp/)
  - [Host / Client / Server](/notes/mcp/#%E4%B8%89%E4%B8%AA%E8%A7%92%E8%89%B2)
  - [initialize：版本与能力协商](/notes/mcp/#%E5%88%9D%E5%A7%8B%E5%8C%96%E5%8F%91%E7%8E%B0%E4%B8%8E%E8%B0%83%E7%94%A8)
  - [工具发现 tools/list](/notes/mcp/#%E5%B7%A5%E5%85%B7%E6%80%8E%E6%A0%B7%E8%BF%9B%E5%85%A5%E5%BA%94%E7%94%A8)
  - [工具调用 tools/call](/notes/mcp/#%E5%B7%A5%E5%85%B7%E6%80%8E%E6%A0%B7%E8%BF%9B%E5%85%A5%E5%BA%94%E7%94%A8)
- [Skill：可复用的任务方法](/notes/skills/)
  - [SKILL.md 与可选资源](/notes/skills/#%E7%BB%84%E6%88%90%E4%B8%8E%E5%8A%A0%E8%BD%BD%E6%96%B9%E5%BC%8F)
  - [发现 → 激活 → 按需加载](/notes/skills/#%E7%BB%84%E6%88%90%E4%B8%8E%E5%8A%A0%E8%BD%BD%E6%96%B9%E5%BC%8F)
  - [描述写清做什么和何时用](/notes/skills/#%E6%8F%8F%E8%BF%B0%E5%8D%B3%E8%A7%A6%E5%8F%91%E5%99%A8)
  - [示例驱动](/notes/skills/#%E7%A4%BA%E4%BE%8B%E9%A9%B1%E5%8A%A8)
  - [负向约束](/notes/skills/#%E8%B4%9F%E5%90%91%E7%BA%A6%E6%9D%9F)
  - [Skill 组织方法，MCP 连接能力](/notes/skills/#%E4%B8%8E%E5%B7%A5%E5%85%B7%E5%92%8C%E5%8D%8F%E8%AE%AE%E7%9A%84%E5%8C%BA%E5%88%AB)

## 开发工作流

- [计划模式与 Superpowers](/notes/planning-and-superpowers/)
  - [计划模式：实施前分析](/notes/planning-and-superpowers/)
  - [Superpowers：覆盖多个开发环节](/notes/planning-and-superpowers/#%E4%B8%A4%E8%80%85%E7%9A%84%E5%8C%BA%E5%88%AB)
  - [工作模式与开发方法的范围不同](/notes/planning-and-superpowers/#%E4%B8%A4%E8%80%85%E7%9A%84%E5%8C%BA%E5%88%AB)
- [SDD：规范驱动开发](/notes/spec-driven-development/)
  - [规范持续指导实现](/notes/spec-driven-development/)
  - [行为、边界与验收条件](/notes/spec-driven-development/#%E8%A7%84%E8%8C%83%E9%9C%80%E8%A6%81%E8%A1%A8%E8%BE%BE%E4%BB%80%E4%B9%88)
  - [规范、计划与测试相互配合](/notes/spec-driven-development/#%E4%B8%8E%E8%AE%A1%E5%88%92%E5%92%8C%E6%B5%8B%E8%AF%95%E7%9A%84%E5%85%B3%E7%B3%BB)
- [TDD：测试驱动开发](/notes/test-driven-development/)
  - [Red：测试因缺少行为而失败](/notes/test-driven-development/#red--green--refactor)
  - [Green：实现使测试通过](/notes/test-driven-development/#red--green--refactor)
  - [Refactor：保持通过并整理结构](/notes/test-driven-development/#red--green--refactor)
- [Superpowers 工作流](/notes/superpowers/)
  - [可组合的 Skills](/notes/superpowers/)
  - [需求 → 设计 → 计划 → 执行与检查](/notes/superpowers/#%E5%B7%A5%E4%BD%9C%E6%B5%81%E5%A6%82%E4%BD%95%E7%BB%84%E7%BB%87)
- [GSD 与阶段化交付](/notes/gsd/)
  - [Discuss → Plan → Execute → Verify → Ship](/notes/gsd/#%E9%98%B6%E6%AE%B5%E5%BE%AA%E7%8E%AF)
  - [独立上下文承担局部任务](/notes/gsd/#%E9%98%B6%E6%AE%B5%E5%BE%AA%E7%8E%AF)
  - [STATE.md / CONTEXT.md 保存状态](/notes/gsd/#%E9%98%B6%E6%AE%B5%E5%BE%AA%E7%8E%AF)

## 工程反思

- [认知债与架构债](/notes/cognitive-and-architecture-debt/)
  - [认知债：共享理解退化](/notes/cognitive-and-architecture-debt/#%E8%AE%A4%E7%9F%A5%E5%80%BA%E7%90%86%E8%A7%A3%E6%B2%A1%E6%9C%89%E8%B7%9F%E4%B8%8A%E7%B3%BB%E7%BB%9F)
  - [架构债：结构增加后续修改成本](/notes/cognitive-and-architecture-debt/#%E6%9E%B6%E6%9E%84%E5%80%BA%E7%BB%93%E6%9E%84%E5%A2%9E%E5%8A%A0%E4%BA%86%E6%9C%AA%E6%9D%A5%E4%BF%AE%E6%94%B9%E6%88%90%E6%9C%AC)
  - [补充理解与改善结构处理不同问题](/notes/cognitive-and-architecture-debt/#%E4%B8%A4%E8%80%85%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9C%80%E8%A6%81%E5%8C%BA%E5%88%86)
