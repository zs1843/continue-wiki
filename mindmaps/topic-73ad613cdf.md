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
  - [tool\_use 与 tool\_result 往返](/notes/agent-and-function-calling/#%E4%B8%80%E6%AC%A1%E5%B7%A5%E5%85%B7%E8%B0%83%E7%94%A8%E9%95%BF%E4%BB%80%E4%B9%88%E6%A0%B7)
- [工具 Schema](/notes/tool-schema/)
  - [字段类型与必填项](/notes/tool-schema/#%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8C%96%E7%9A%84%E5%8F%82%E6%95%B0%E5%AE%9A%E4%B9%89)
  - [禁止额外字段](/notes/tool-schema/#%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8C%96%E7%9A%84%E5%8F%82%E6%95%B0%E5%AE%9A%E4%B9%89)
  - [Schema 校验与业务授权有不同职责](/notes/tool-schema/)
  - [name、description 与 input\_schema 分工](/notes/tool-schema/#%E5%B7%A5%E5%85%B7%E5%AE%9A%E4%B9%89%E5%9C%A8%E6%8E%A5%E5%8F%A3%E9%87%8C%E7%9A%84%E6%A0%B7%E5%AD%90)
- [Agent Loop](/notes/agent-loop/)
  - [调用模型 → 执行工具 → 更新上下文](/notes/agent-loop/#%E5%BE%AA%E7%8E%AF%E5%A6%82%E4%BD%95%E7%BB%A7%E7%BB%AD)
  - [任务完成与迭代上限](/notes/agent-loop/#%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E5%81%9C%E6%AD%A2)
  - [stop\_reason 决定是否再来一轮](/notes/agent-loop/#%E5%BE%AA%E7%8E%AF%E5%A6%82%E4%BD%95%E7%BB%A7%E7%BB%AD)
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
  - [子代理只收到自己的系统提示](/notes/subagents/#%E4%B8%80%E4%B8%AA%E5%AD%90%E4%BB%A3%E7%90%86%E6%98%AF%E6%80%8E%E4%B9%88%E5%AE%9A%E4%B9%89%E7%9A%84)
