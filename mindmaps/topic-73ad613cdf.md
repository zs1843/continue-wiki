---
generated_by: note-mindmaps
title: "Agent基础"
slug: topic-73ad613cdf
---

# Agent基础

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
- [Subagent 与任务交接](/notes/subagents/)
  - [主流程委派局部任务](/notes/subagents/)
  - [独立上下文与结果摘要](/notes/subagents/#%E7%8B%AC%E7%AB%8B%E4%B8%8A%E4%B8%8B%E6%96%87%E6%84%8F%E5%91%B3%E7%9D%80%E4%BB%80%E4%B9%88)
  - [共享文件与权限取决于宿主](/notes/subagents/#%E7%8B%AC%E7%AB%8B%E4%B8%8A%E4%B8%8B%E6%96%87%E6%84%8F%E5%91%B3%E7%9D%80%E4%BB%80%E4%B9%88)
- [ReAct：推理与行动的交替](/notes/react/)
  - [thought 不改变环境](/notes/react/#%E6%8E%A8%E7%90%86%E4%B8%8E%E8%A1%8C%E5%8A%A8%E6%80%8E%E6%A0%B7%E4%BA%A4%E6%9B%BF)
  - [search、lookup、finish 动作](/notes/react/#%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8C%96%E7%A4%BA%E4%BE%8B)
  - [CoT 更易产生幻觉](/notes/react/#%E4%B8%8E-cot-%E5%92%8C-act-%E7%9A%84%E5%AF%B9%E6%AF%94)
  - [重复生成容易陷入循环](/notes/react/#%E8%BE%B9%E7%95%8C%E4%B8%8E%E5%A4%B1%E8%B4%A5%E6%A8%A1%E5%BC%8F)
- [MCP：连接外部能力](/notes/mcp/)
  - [Host / Client / Server](/notes/mcp/#%E4%B8%89%E4%B8%AA%E8%A7%92%E8%89%B2)
  - [initialize：版本与能力协商](/notes/mcp/#%E5%88%9D%E5%A7%8B%E5%8C%96%E5%8F%91%E7%8E%B0%E4%B8%8E%E8%B0%83%E7%94%A8)
  - [工具发现 tools/list](/notes/mcp/#%E5%B7%A5%E5%85%B7%E6%80%8E%E6%A0%B7%E8%BF%9B%E5%85%A5%E5%BA%94%E7%94%A8)
  - [工具调用 tools/call](/notes/mcp/#%E5%B7%A5%E5%85%B7%E6%80%8E%E6%A0%B7%E8%BF%9B%E5%85%A5%E5%BA%94%E7%94%A8)
- [Skill：可复用的任务方法](/notes/skills/)
  - [SKILL.md 与可选资源](/notes/skills/#%E7%BB%84%E6%88%90%E4%B8%8E%E5%8A%A0%E8%BD%BD%E6%96%B9%E5%BC%8F)
  - [发现 → 激活 → 按需加载](/notes/skills/#%E7%BB%84%E6%88%90%E4%B8%8E%E5%8A%A0%E8%BD%BD%E6%96%B9%E5%BC%8F)
  - [Skill 组织方法，MCP 连接能力](/notes/skills/#%E4%B8%8E%E5%B7%A5%E5%85%B7%E5%92%8C%E5%8D%8F%E8%AE%AE%E7%9A%84%E5%8C%BA%E5%88%AB)
