---
title: CRM 案例：功能迭代与架构守护
slug: crm-harness-case
status: published
order: 10
updated: "2026-11-20"
mindmap:
  - label: "绿地项目也要先明确边界"
    heading: "先明确一轮改动解决什么"
  - label: "设计原因、实现任务与验收分开"
    heading: "案例客户小记为什么属于客户域"
  - label: "功能建设与约束建设并行"
    heading: "为什么功能之外还要建设约束"
  - label: "项目约定需要解释适用条件"
    heading: "标签设计中的项目取舍"
---

**绿地项目（Greenfield）** 指从新起点建设的系统，相对于改造已有业务与兼容关系较多的[棕地项目](/notes/legacy-refactoring/)。没有大量旧代码，不代表需求和架构已经明确。作者的 CRM 配套项目用持续迭代展示了：实现功能的同时，还要逐步补齐规范、测试与架构检查。[1][2]

## 先明确一轮改动解决什么

项目的变更记录按脚手架、核心业务、客户小记、标签和客户中心集成展开。每轮变更保存提案、设计、任务与行为规范，不把整个 CRM 的所有目标塞进一次实现。[2]

这些材料分别回答“为什么改、方案为何这样选、要做哪些工作、怎样判断行为正确”。它们是 [SDD](/notes/spec-driven-development/)在项目里的具体产物，不意味着所有 SDD 工具都采用相同目录格式。

## 案例：客户小记为什么属于客户域

客户小记用于记录电话、拜访等跟进活动。设计文件选择把它放在客户域中，而不是单独建一个通用记事领域，理由是小记依附客户、当前也没有扩展到其他业务对象的要求。[3]

同一文件还记录了三个相关决定：使用嵌套的客户小记 API；新增小记时联动最后跟进时间；不提供编辑与删除，后续记录用于补充纠正。这里展示的是该项目对归属、一致性与审计语义的选择，并非“小记都应该只增不改”的通用规则。[3]

`tasks.md` 再把决定拆成表结构、领域对象、Gateway、应用服务、API、测试和前端详情页等任务。[3] 设计说明保留取舍原因，任务清单负责推进实现，两者不能相互替代。

## 为什么功能之外还要建设约束

项目除了增加功能，也保存编码规范、测试规范、代码地图，并用 ArchUnit 检查分层依赖。[4] 这些工作一方面交付业务功能，另一方面改善下一轮 Agent 执行任务的条件。

例如，新增客户小记需要判断业务方法放在哪里；如果后续每轮都要重复纠正跨层调用，便值得把稳定的分层规则写成可执行检查。下一轮仍由 Agent 选择实现方式，但明确违规可以被检查流程发现。这是[仓库知识与约束](/notes/repository-constraints/)连接到 [Harness 持续改进](/notes/harness-engineering/#把单次修复变成持续改进)的地方。

## 标签设计中的项目取舍

客户标签设计选择独立标签表与关联表，支持多标签的 AND 筛选；不用 JPA 的 `@ManyToMany`，而沿用项目已有的标识字段与手动关联方式。更新关联时采用全删再建，删除标签时拒绝删除仍在使用的标签。[5]

这些决定分别涉及查询语义、项目一致性、实现复杂度和数据保护。理解案例时应同时保留理由与限制：例如，简单更新策略不自动解决并发覆盖问题，事务存在也不能直接证明多用户并发更新不会丢失意图。取舍应随实际负载与协作方式重新评估。

阅读这个案例，更值得保留的是选择背后的依据，这能帮助 Agent 在后续任务中重新判断，而不只是记住框架或类名。后续接入客户中心又引入了新的数据权威与失败策略，见[跨系统集成案例](/notes/external-integration-case/)。

## 参考

1. 张建飞，《Harness工程实战：从零开始驾驭AI软件工程》，人民邮电出版社，2026 年 9 月，第 1 版；第 8 章“全新绿地项目”的章节定位据[出版社公开目录](https://detail.youzan.com/show/goods?alias=2op1clbko20vl1d)。以下具体内容依据作者配套仓库，不将目录当作正文。
2. 作者仓库快照 `51c6b4b`：[变更记录目录](https://github.com/significantfrank/HarnessEngineering/tree/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter8/openspec/changes/archive)。
3. 同一快照：[客户小记设计](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter8/openspec/changes/archive/2026-04-23-add-customer-note/design.md)、[实现任务](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter8/openspec/changes/archive/2026-04-23-add-customer-note/tasks.md)。任务中的完成标记属于仓库记录，不等于本次重新运行验收。
4. 同一快照：[AGENTS.md](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter8/AGENTS.md)、[架构检查](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter8/crm-backend/src/test/java/com/harness/crm/ColaArchitectureTest.java)。
5. 同一快照：[标签设计](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter8/openspec/changes/archive/2026-04-24-add-customer-tags/design.md)，Decisions、Risks / Trade-offs。
