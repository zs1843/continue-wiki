---
generated_by: note-mindmaps
title: "工程案例"
slug: topic-6d3033e3c6
---

# 工程案例

- [CRM 案例：功能迭代与架构守护](/notes/crm-harness-case/)
  - [绿地项目也要先明确边界](/notes/crm-harness-case/#%E5%85%88%E6%98%8E%E7%A1%AE%E4%B8%80%E8%BD%AE%E6%94%B9%E5%8A%A8%E8%A7%A3%E5%86%B3%E4%BB%80%E4%B9%88)
  - [设计原因、实现任务与验收分开](/notes/crm-harness-case/#%E6%A1%88%E4%BE%8B%E5%AE%A2%E6%88%B7%E5%B0%8F%E8%AE%B0%E4%B8%BA%E4%BB%80%E4%B9%88%E5%B1%9E%E4%BA%8E%E5%AE%A2%E6%88%B7%E5%9F%9F)
  - [功能建设与约束建设并行](/notes/crm-harness-case/#%E4%B8%BA%E4%BB%80%E4%B9%88%E5%8A%9F%E8%83%BD%E4%B9%8B%E5%A4%96%E8%BF%98%E8%A6%81%E5%BB%BA%E8%AE%BE%E7%BA%A6%E6%9D%9F)
  - [项目约定需要解释适用条件](/notes/crm-harness-case/#%E6%A0%87%E7%AD%BE%E8%AE%BE%E8%AE%A1%E4%B8%AD%E7%9A%84%E9%A1%B9%E7%9B%AE%E5%8F%96%E8%88%8D)
- [遗留系统案例：先保护行为，再逐步替换](/notes/legacy-refactoring/)
  - [先识别规则并建立行为基线](/notes/legacy-refactoring/#%E5%B1%80%E9%83%A8%E9%87%8D%E6%9E%84%E5%85%88%E4%BF%9D%E6%8A%A4%E8%A1%8C%E4%B8%BA)
  - [PricingPolicy 显式组织折扣规则](/notes/legacy-refactoring/#%E6%A1%88%E4%BE%8B%E9%A6%96%E4%B8%AA%E5%91%BD%E4%B8%AD%E7%9A%84%E8%A7%84%E5%88%99%E5%86%B3%E5%AE%9A%E6%8A%98%E6%89%A3)
  - [兼容转换与开关支持渐进替换](/notes/legacy-refactoring/#%E7%BB%9E%E6%9D%80%E8%80%85%E6%A8%A1%E5%BC%8F%E4%BF%9D%E7%95%99%E5%85%A5%E5%8F%A3%E9%80%90%E6%AD%A5%E6%9B%BF%E6%8D%A2)
  - [防腐层隔离新旧模型语义](/notes/legacy-refactoring/#%E9%98%B2%E8%85%90%E5%B1%82%E9%9A%94%E7%A6%BB%E6%97%A7%E7%B3%BB%E7%BB%9F%E7%9A%84%E8%AF%AD%E4%B9%89)
  - [开关回切不等于数据回滚](/notes/legacy-refactoring/#%E6%B8%90%E8%BF%9B%E6%94%B9%E9%80%A0%E7%9A%84%E8%BE%B9%E7%95%8C)
- [跨系统集成案例：数据权威、失败与降级](/notes/external-integration-case/)
  - [先划清字段的数据权威](/notes/external-integration-case/#%E8%B0%81%E5%AF%B9%E5%93%AA%E4%BA%9B%E6%95%B0%E6%8D%AE%E8%B4%9F%E8%B4%A3)
  - [创建更新与转化有不同失败策略](/notes/external-integration-case/#%E5%A4%B1%E8%B4%A5%E7%AD%96%E7%95%A5%E5%8F%96%E5%86%B3%E4%BA%8E%E4%B8%9A%E5%8A%A1%E5%90%AB%E4%B9%89)
  - [降级保留能力，也改变结果含义](/notes/external-integration-case/#%E9%99%8D%E7%BA%A7%E5%BF%85%E9%A1%BB%E8%AE%A9%E8%B0%83%E7%94%A8%E8%80%85%E7%9F%A5%E9%81%93)
  - [设计记录要保留未解决窗口](/notes/external-integration-case/#%E6%B2%A1%E6%9C%89%E8%A7%A3%E5%86%B3%E7%9A%84%E7%AA%97%E5%8F%A3%E4%B9%9F%E8%A6%81%E6%88%90%E4%B8%BA%E7%9F%A5%E8%AF%86)
- [领域建模案例：把业务规则放进类型与边界](/notes/domain-modeling-case/)
  - [类型表达取值，规则表达合法变化](/notes/domain-modeling-case/#%E6%9E%9A%E4%B8%BE%E4%B8%8D%E8%83%BD%E6%9B%BF%E4%BB%A3%E7%8A%B6%E6%80%81%E8%A7%84%E5%88%99)
  - [金额需要精度、单位与舍入约定](/notes/domain-modeling-case/#%E7%B2%BE%E7%A1%AE%E7%B1%BB%E5%9E%8B%E4%BB%8D%E9%9C%80%E8%A6%81%E4%B8%9A%E5%8A%A1%E5%A5%91%E7%BA%A6)
  - [Gateway 隔离外部能力](/notes/domain-modeling-case/#%E5%A4%96%E9%83%A8%E6%A0%A1%E9%AA%8C%E6%80%8E%E6%A0%B7%E6%94%BE%E5%88%B0%E8%BE%B9%E7%95%8C)
- [行业案例：让环境可读，把生成与评估分开](/notes/industry-harness-cases/)
  - [代码生成依赖可操作的工程环境](/notes/industry-harness-cases/#%E7%8E%AF%E5%A2%83%E5%8F%AF%E8%AF%BB%E6%80%A7)
  - [生成与评估分离，先约定完成标准](/notes/industry-harness-cases/#%E7%8B%AC%E7%AB%8B%E8%AF%84%E4%BC%B0%E4%B8%8E%E8%BF%AD%E4%BB%A3%E5%A5%91%E7%BA%A6)
  - [上下文重置与压缩有不同代价](/notes/industry-harness-cases/#%E8%B7%A8%E4%BC%9A%E8%AF%9D%E6%8E%A5%E7%BB%AD)
