---
title: Harness 学习地图：从行动机制到工程交付
slug: harness-learning-map
status: published
order: 0
updated: "2026-11-19"
mindmap:
  - label: "行动机制与能力扩展"
    heading: "先理解行动怎样发生"
  - label: "意图、信息与控制相互配合"
    heading: "再理解工程条件"
  - label: "用绿地、棕地和集成案例检验方法"
    heading: "把概念放回真实变更"
  - label: "审视结果与产生结果的环境"
    heading: "最后关注长期维护"
---

**Harness 学习的主线**是理解：模型如何采取行动，任务需要什么信息，执行如何受控，以及结果怎样被验证和接续。这份地图结合《Harness工程实战》的章节主题与本站概念笔记组织学习，不要求背诵某个工具的配置格式。[1]

## 先理解行动怎样发生

第 1–3 章围绕 Agent、能力扩展与 Coding Agent 展开。学习时应能够区分：[工具调用](/notes/agent-and-function-calling/)把操作交给外部程序，[Agent Loop](/notes/agent-loop/)组织持续行动，[ReAct](/notes/react/)把观察反馈与后续决策连接起来。[1]

[MCP](/notes/mcp/)提供连接约定，[Skills](/notes/skills/)保存可复用的任务方法，[Subagent](/notes/subagents/)把局部任务放入独立上下文。这些机制可以配合，但连接成功、加载了方法或拆分了任务，都不等于已经完成目标。[Coding Agent](/notes/coding-agent/)把它们带入真实的软件开发环境。

## 再理解工程条件

第 4–6 章从行业实践进入工程方法。这里需要掌握三个不同问题：Prompt 如何表达意图，Context 如何组织信息，Harness 如何组织执行与检查。它们是互补的关注范围，不能理解为新术语出现后就不再需要旧能力。[1]

继续阅读[控制闭环](/notes/harness-control-loop/)、[套件选型](/notes/harness-kit-selection/)和[仓库知识与约束](/notes/repository-constraints/)。应能解释为什么说明不等于硬门禁、为什么需要观测，以及一次失败应怎样转化为下一轮可复用的改进。[Harness 总览](/notes/harness-engineering/)将这些关系连成一条执行链路。

[控制矩阵](/notes/harness-control-matrix/)进一步区分指引与传感器、确定性检查与语义判断；[Agent 可观测性](/notes/agent-observability/)说明怎样记录决策依据、执行轨迹与交接假设。[行业案例](/notes/industry-harness-cases/)展示环境可读性和独立评估如何落实。

## 把概念放回真实变更

第 7–10 章可以用四个问题串起来：[1]

| 问题 | 学习入口 | 应能解释的机制 |
| --- | --- | --- |
| 怎样让改动更容易定位和检查 | [AI 友好型架构](/notes/ai-friendly-architecture/) | 名称与类型、依赖方向、Plan–Build |
| 新项目怎样边交付边改善执行条件 | [CRM 迭代](/notes/crm-harness-case/) | 需求边界、设计理由、任务与架构守护 |
| 已有系统怎样逐步改造 | [遗留重构](/notes/legacy-refactoring/) | 行为基线、领域规则、兼容与渐进替换 |
| 真实依赖与失败怎样处理 | [跨系统集成](/notes/external-integration-case/)、[测试反馈](/notes/testing-feedback-loops/) | 数据权威、补偿与降级、测试边界和环境 |

[领域建模案例](/notes/domain-modeling-case/)补充状态、不变量、金额精度和外部依赖边界。

[SDD](/notes/spec-driven-development/)用规范持续表达目标与约束，[TDD](/notes/test-driven-development/)通过测试推动局部变化。案例帮助理解方法如何组合，不能把示例中的行数、用例数量或框架选择机械推广到所有项目。

## 最后关注长期维护

第 11 章讨论工程师职责、组织知识和协作挑战。[构建者](/notes/engineer-as-builder/)需要审视任务与验收，也要理解代码的实际行为；[认知债与架构债](/notes/cognitive-and-architecture-debt/)分别提醒理解退化与结构成本。[1]

复习一个主题时，可以尝试回答：它解决什么问题、依赖什么条件、怎样知道它有效、在哪些情况下不适用。能用自己的话解释定义，再用案例说明取舍，比记住术语之间的一串箭头更有助于后续迁移。

[AI 学习路线](/notes/ai-architecture-learning-path/)补充模型基础、语义检索和 RAG，帮助把行动与工程控制放回更完整的应用链路。

## 参考与阅读范围

1. 张建飞，《Harness工程实战：从零开始驾驭AI软件工程》，人民邮电出版社，2026 年 9 月，第 1 版。章节结构据[出版社目录](https://detail.youzan.com/show/goods?alias=2op1clbko20vl1d)及实际查看的各章小结核对；具体定义与案例的正文位置、代码快照、归纳性质记录在相应笔记中。

这是一份覆盖全书主要主题的学习导航，不表示每节正文均已逐页精读。实际阅读与尚待核对范围记录在项目的书籍资料记录中。
