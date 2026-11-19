---
title: 认知债与架构债
slug: cognitive-and-architecture-debt
status: published
order: 10
updated: "2026-11-19"
mindmap:
  - label: "认知债：共享理解退化"
    heading: "认知债理解没有跟上系统"
  - label: "架构债：结构增加后续修改成本"
    heading: "架构债结构增加了未来修改成本"
  - label: "补充理解与改善结构处理不同问题"
    heading: "两者为什么需要区分"
  - label: "缺理解与缺结构是两类问题"
    heading: "两个场景"
  - label: "保留设计理由与人的独立判断"
    heading: "ai-辅助开发中的认知债防护"
---

**认知债（Cognitive Debt）** 与**架构债（Architectural Technical Debt）** 都用「债务」描述当前积累的问题对未来工作的影响，但关注的对象不同。

## 认知债：理解没有跟上系统

在 Margaret-Anne Storey 的软件工程论述中，认知债指团队对系统的共享理解随时间退化，导致人们越来越难以判断和安全地修改系统。它是团队与项目层面的问题，不能简单等同于某个人暂时不熟悉一段代码。[1]

AI 可以加快代码生成，但如果团队没有同步建立对行为、结构和设计原因的理解，可运行的代码仍可能伴随认知债。这是该文讨论的风险，不表示使用 AI 就一定产生认知债。[1]

## 架构债：结构增加了未来修改成本

SEI 将架构技术债描述为短期方便、却使后续工作需要架构返工并付出更多成本的设计或构建方式。[2]

例如，把本应分离的业务模块紧密耦合，短期可能减少实现步骤，后续修改却需要同时调整多个模块。这是说明成本来源的简化示例。

## AI 辅助开发中的认知债防护

《Harness工程实战》第 11.5 节将认知债聚焦为：过度依赖 AI 时，团队对系统的深层理解和独立解决问题能力可能退化。[4] 它与前述共享理解的定义有相通之处，但强调的成因和使用语境更具体，不能把两个来源当成完全相同的术语规范。

作者列举的表现包括：能说出改了什么却解释不了设计理由、面对例外情形缺乏分析能力、新人依赖问答而未建立系统地图。这些信号提示需要检查知识传递，而不是单凭“用了 AI”就判定团队存在认知债。[4]

防护需要同时保留理解与证据：记录输入、关键假设和取舍理由，审查需求与设计，明确哪些决定由谁负责，并让团队能够解释核心行为。书中将这些做法与多层审查、可理解性和人机责任联系起来。[4]

测试通过和注释齐全都不是理解的充分证明。例如，团队仍应能解释为什么选择一种折扣优先级、外部服务失败时为什么保留本地修改，以及改变这些假设会影响什么。[决策溯源](/notes/agent-observability/)帮助保存这些依据。

## 两个场景

下面两个自拟场景分别对应两类债，便于对照：

- **认知债**：半年前的一个缓存策略只有离职的同事清楚原因；新同事改动时看不懂为什么这样写，只能绕开或照抄。代码能跑，但团队已经无法判断改动的后果。
- **架构债**：订单逻辑和库存逻辑写在同一个函数里，改订单字段要连带改库存计算，每次改动都得回归两条流程。团队知道它碍事，但拆分需要额外成本。

前者缺的是共享理解，后者缺的是结构。处理方式也不同：认知债靠补文档、结对和变更说明慢慢恢复；架构债需要拆模块、定义接口，属于一次性投入。

## 两者为什么需要区分

[从编码到构建](/notes/engineer-as-builder/)进一步讨论工程师如何审视任务边界和运行条件，帮助把对某次结果的理解转成可继续维护的知识。

代码结构清晰，团队仍可能缺少理解；团队理解充分，也可能面对代价很高的结构。这一对照说明：补充理解与改善架构处理的是不同问题，可能需要同时进行。

[技术债的比喻](https://martinfowler.com/bliki/TechnicalDebt.html)强调后续修改要付出的额外成本。[TDD](/notes/test-driven-development/)可以帮助确认具体行为，[SDD](/notes/spec-driven-development/)可以保留要求与约束，但这些材料仍需要被理解和维护。

[遗留系统重构案例](/notes/legacy-refactoring/)展示如何先建立行为测试，再提取领域规则和逐步替换实现；[仓库知识与约束](/notes/repository-constraints/)讨论如何保留决定并检查结构。前者偏向改善可修改性，后者帮助把理解与规则留在团队可继续使用的材料中。

## 参考

1. Margaret-Anne Storey，[From Technical Debt to Cognitive and Intent Debt: Rethinking Software Health in the Age of AI](https://arxiv.org/abs/2603.22106v4)，v4，2026-04-06，摘要中的认知债定义；本文沿用其软件工程语境。
2. CMU Software Engineering Institute，[Architectural Technical Debt Library](https://www.sei.cmu.edu/library/architectural-technical-debt-library/)，Technical Debt Research Agenda 中的定义。
3. Martin Fowler，[Technical Debt](https://martinfowler.com/bliki/TechnicalDebt.html)，技术债与后续修改成本。
4. 张建飞，《Harness工程实战：从零开始驾驭AI软件工程》，[第 11.5 节](https://weread.qq.com/web/reader/af832910813abc0c8g010463k3ef329302553ef815416990)，本次核对 11.5.1 定义与三类表现、11.5.2 风险及四个防护维度。没有将其中关于未来训练数据的推测写为已证实事实。
