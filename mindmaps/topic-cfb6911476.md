---
generated_by: note-mindmaps
title: "安全与治理"
slug: topic-cfb6911476
---

# 安全与治理

- [提示注入：当资料被当成指令](/notes/prompt-injection/)
  - [直接注入来自用户输入](/notes/prompt-injection/#%E4%B8%A4%E7%A7%8D%E6%B3%A8%E5%85%A5%E8%B7%AF%E5%BE%84)
  - [间接注入藏在被读取的资料里](/notes/prompt-injection/#%E4%B8%A4%E7%A7%8D%E6%B3%A8%E5%85%A5%E8%B7%AF%E5%BE%84)
  - [模型在同一通道里读指令与数据](/notes/prompt-injection/#%E4%B8%BA%E4%BB%80%E4%B9%88%E9%9A%BE%E4%BB%A5%E6%A0%B9%E6%B2%BB)
  - [缓解靠隔离、权限与审批](/notes/prompt-injection/#%E7%BC%93%E8%A7%A3%E6%8E%AA%E6%96%BD%E4%B8%8E%E8%BE%B9%E7%95%8C)
- [过度自主：功能、权限与审批](/notes/excessive-agency/)
  - [三种过度：功能、权限、自主](/notes/excessive-agency/#%E4%B8%89%E7%A7%8D%E8%BF%87%E5%BA%A6)
  - [授权在下游执行，不靠模型判断](/notes/excessive-agency/#%E6%8A%8A%E6%8E%88%E6%9D%83%E6%94%BE%E5%9B%9E%E4%B8%8B%E6%B8%B8)
  - [专用工具优于 shell 与开放接口](/notes/excessive-agency/#%E9%81%BF%E5%85%8D%E5%BC%80%E6%94%BE%E5%BC%8F%E5%B7%A5%E5%85%B7)
  - [高风险动作保留人工审批](/notes/excessive-agency/#%E7%94%A8%E5%AE%A1%E6%89%B9%E6%94%B6%E4%BD%8F%E9%AB%98%E9%A3%8E%E9%99%A9%E5%8A%A8%E4%BD%9C)
- [数据隔离：敏感信息与检索边界](/notes/sensitive-data-isolation/)
  - [泄露发生在输出、训练与检索上下文](/notes/sensitive-data-isolation/#%E4%B8%89%E6%9D%A1%E6%B3%84%E9%9C%B2%E8%B7%AF%E5%BE%84)
  - [权限过滤要在检索与存储层执行](/notes/sensitive-data-isolation/#%E6%8A%8A%E8%BF%87%E6%BB%A4%E6%94%BE%E5%9C%A8%E6%A3%80%E7%B4%A2%E4%B8%8E%E5%AD%98%E5%82%A8%E5%B1%82)
  - [记忆与日志也要按用户隔离](/notes/sensitive-data-isolation/#%E8%AE%B0%E5%BF%86%E6%97%A5%E5%BF%97%E4%B8%8E%E8%AE%AD%E7%BB%83%E6%95%B0%E6%8D%AE)
  - [系统提示约束不能替代访问控制](/notes/sensitive-data-isolation/#%E7%B3%BB%E7%BB%9F%E6%8F%90%E7%A4%BA%E4%B8%8D%E6%98%AF%E8%AE%BF%E9%97%AE%E6%8E%A7%E5%88%B6)
