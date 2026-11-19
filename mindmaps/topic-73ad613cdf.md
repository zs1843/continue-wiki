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
  - [分解任务、局部求解与汇总](/notes/subagents/#%E5%88%86%E6%B2%BB%E6%80%9D%E8%B7%AF%E4%B8%8E%E5%B1%82%E7%BA%A7%E5%8D%8F%E4%BD%9C)
  - [角色配置与独立权限](/notes/subagents/#%E4%B8%93%E4%B8%9A%E5%8C%96%E6%9D%83%E9%99%90%E4%B8%8E%E5%8A%A8%E6%80%81%E6%89%A9%E5%B1%95)
  - [动态扩展取决于宿主实现](/notes/subagents/#%E4%B8%93%E4%B8%9A%E5%8C%96%E6%9D%83%E9%99%90%E4%B8%8E%E5%8A%A8%E6%80%81%E6%89%A9%E5%B1%95)
- [Coding Agent：在工程环境中完成任务](/notes/coding-agent/)
  - [补全、交互与任务委派](/notes/coding-agent/#%E4%BB%8E%E5%BB%BA%E8%AE%AE%E4%BB%A3%E7%A0%81%E5%88%B0%E5%A7%94%E6%B4%BE%E4%BB%BB%E5%8A%A1)
  - [环境连接、工具与权限](/notes/coding-agent/#%E7%8E%AF%E5%A2%83%E6%84%9F%E7%9F%A5%E4%B8%8E%E6%93%8D%E4%BD%9C)
  - [方法复用与事件钩子](/notes/coding-agent/#%E6%96%B9%E6%B3%95%E5%A4%8D%E7%94%A8%E4%B8%8E%E8%BF%87%E7%A8%8B%E5%B9%B2%E9%A2%84)
  - [反馈驱动计划调整与子任务调度](/notes/coding-agent/#%E8%AE%A1%E5%88%92%E8%B0%83%E6%95%B4%E4%B8%8E%E5%AD%90%E4%BB%BB%E5%8A%A1%E8%B0%83%E5%BA%A6)
  - [上下文压缩与跨会话记忆](/notes/coding-agent/#%E8%AE%B0%E5%BF%86%E4%B8%8E%E4%B8%8A%E4%B8%8B%E6%96%87%E6%B2%BB%E7%90%86)
