---
title: 仓库知识与约束：从说明到门禁
slug: repository-constraints
status: published
order: 20
updated: "2026-11-20"
mindmap:
  - label: "入口文件指向按需读取的知识"
    heading: "仓库怎样成为工作上下文"
  - label: "软约束指导，硬门禁阻断"
    heading: "说明与执行检查的区别"
  - label: "架构依赖规则变成可执行测试"
    heading: "案例把分层要求写成测试"
  - label: "约束需要维护与适用范围"
    heading: "约束也需要治理"
  - label: "通用套件与项目特有规则分开维护"
    heading: "通用与项目特有规则"
---

**仓库知识**是完成项目任务所需的结构、约定、设计原因和操作说明；**工程约束**规定哪些变更可以接受。把知识保存为 Agent 可读取的材料，再把可判定的规则接入检查流程，是 [Harness 工程](/notes/harness-engineering/)的一项基础工作。[1][2]

## 仓库怎样成为工作上下文

**AGENTS.md**是一种给 Agent 提供项目工作指引的文本约定，可以包含项目特有的构建方式、约束、验证要求及详细资料入口。书中第 6.4 节将它作为软约束的主要载体。[6] 它的内容是否自动加载、怎样继承，仍取决于宿主实现。

作者的 CRM 配套项目把 `AGENTS.md` 作为入口，指向编码规范、测试规范、代码结构清单和外部系统 API。入口还保留 JPA 实体、Gateway 接口、分页与响应格式等项目决定。[1] 这样做让 Agent 先找到相关知识，再按任务读取细节，和 [上下文工程](/notes/context-engineering/)的按需检索相连。

例如，修改与客户中心集成的逻辑，需要读取 API 契约；修改分层实现，需要读取编码约定。两项任务的材料有交集，但不必每次都把全部文档塞入上下文。结构清单只负责指路，实际文件仍是核对当前实现的依据。

## 说明与执行检查的区别

| 形式 | 如何起作用 | 需要注意什么 |
| --- | --- | --- |
| 软约束 | 通过说明、Skill 或示例影响 Agent 的选择 | 模型可能漏读、误解或没有遵守 |
| 硬门禁 | 程序检查规则，失败时让流程停止或返回失败 | 必须真正接入流程，并明确能否绕过 |

两者的区别在于是否真正执行检查。`AGENTS.md` 中的“务必遵守”仍是指令，只有测试、权限机制或流水线真正执行了检查，才会产生程序层面的限制。

仓库的 `.githooks/pre-commit` 会运行 Checkstyle，失败时返回非零退出码；后端 CI 在对应路径发生变更时执行 Maven 测试。[2] 本地钩子需要被安装或启用，CI 失败是否阻止合并则取决于分支保护，因此“有脚本”与“不可绕过的门禁”不能混为一谈。

## 案例：把分层要求写成测试

CRM 的 `ColaArchitectureTest` 使用 ArchUnit 检查 Java 类依赖，包括领域层不依赖应用层、适配层和基础设施层，以及禁止分层间循环依赖。[3] 原先需要人反复检查的结构要求，因而有了可重复运行的检测方式。ArchUnit 的官方说明也将包依赖、层次和循环依赖列为可测试对象。[4]

例如，Agent 在领域对象里直接调用基础设施实现，即使某个业务用例仍能通过，架构规则也可能发现违规。反过来，架构测试通过只能说明被编码的结构规则满足要求，不能证明业务需求、性能或安全性全部正确。

## 通用与项目特有规则

书中“仓库是 Agent 的操作系统”的说法强调把重要知识版本化、保存为可获得的工作材料。[7] 这是工程组织的比喻，并非 Agent 无法读取仓库以外的信息。通过文档、MCP 或其他工具取得的外部资料，也可以进入当前上下文；重点是保证决策依据能被找到、核对与更新。

书中第 6.2 节按复用范围区分两类套件：通用要求可以版本化管理、供多个项目使用；业务特有的规则则随项目代码维护，由理解该领域的人持续修订。[5] 例如，日志约定可能跨项目复用，订单状态变化的限制则必须结合具体业务解释。

区分复用范围，可以避免把某个项目的临时选择变成全公司的默认规范。通用能力可以为项目规则提供基础，但项目规则仍需要自己的来源、维护者与适用条件。

## 约束也需要治理

项目特有约定需要标明适用范围。配套项目的测试说明限制了测试所在层次和用例数量，[1] 这能帮助理解作者示例的取舍，却不应直接推广为所有项目的测试标准。不同风险与业务分支需要不同覆盖范围。

入口、详细文档和程序检查也应保持一致。若说明仍要求旧接口，而测试已经迁移到新契约，Agent 会收到互相冲突的信号。[Harness 飞轮](/notes/harness-engineering/#把单次修复变成持续改进)关注怎样把经验变成后续可用的环境改进；持续增加提示词并不一定有帮助。

这一机制可在 [CRM 渐进式构建](/notes/crm-harness-case/)中看到；[认知债与架构债](/notes/cognitive-and-architecture-debt/)则解释了理解缺失和结构退化为何需要不同的处理。

## 参考

1. 张建飞，《Harness工程实战：从零开始驾驭AI软件工程》配套仓库：[CRM AGENTS.md](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter8/AGENTS.md)、[测试说明](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter8/docs/test-guideline.md)。对应书中第 6 章仓库与约束、第 8 章 CRM 实践的主题；章节主题据公开目录核对，正文机制依据实际文件解释。
2. 同一快照：[pre-commit](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/.githooks/pre-commit)、[后端 CI](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/.github/workflows/crm-backend-test.yml)。
3. 同一快照：[ColaArchitectureTest.java](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter8/crm-backend/src/test/java/com/harness/crm/ColaArchitectureTest.java)。
4. ArchUnit，[User Guide](https://www.archunit.org/userguide/html/000_Index.html)，Introduction、What to Check；2026-11-19 读取。
5. 张建飞，同书[第 6.2 节“Harness 飞轮”](https://weread.qq.com/web/reader/af832910813abc0c8g010463k17e328b022b17e62166fad4)，按需选择与构建套件、可复用套件与项目特有套件段落；2026-11-19 实际读取。
6. 同书，[第 6.4 节](https://weread.qq.com/web/reader/af832910813abc0c8g010463k6c8328f022d6c8349cc72d5)，实际核对开头对 AGENTS.md 用途的解释；未将加载规则或历史叙述当成所有工具的统一行为。
7. 同书，[第 6.5 节](https://weread.qq.com/web/reader/af832910813abc0c8g010463kd9d320f022ed9d4f495e456)，实际核对仓库知识版本化、代码与文档关系的相关两页；关于外部资料访问的边界为本文解释。
