---
title: Harness 工程：执行、反馈与评估
slug: harness-engineering
status: published
order: 10
updated: "2026-11-19"
mindmap:
  - label: "运行环境支撑 Agent 执行"
    heading: "agent-与-harness-的关系"
  - label: "MCP 连接、Skill 方法、Subagent 分工"
    heading: "三种扩展承担什么职责"
  - label: "执行、观测、判断与修正"
    heading: "把执行接成反馈闭环"
  - label: "出题、解题与评判分离"
    heading: "用评测推动改进"
  - label: "把问题沉淀为下一轮的约束"
    heading: "把单次修复变成持续改进"
  - label: "从最小挽具起步，按需增加套件"
    heading: "把单次修复变成持续改进"
  - label: "从基础机制到治理与案例"
    heading: "这些知识怎样连起来"
---

**Harness 工程** 在这里指设计和维护支撑 Agent 运行的环境与控制机制：把工具、上下文、权限、状态、验证和恢复组织起来，让任务能持续推进，并留下可检查的结果。这是从长期任务实践中归纳出的工程范围，不是所有产品共同采用的一份固定功能清单。[1]

## Agent 与 Harness 的关系

[Agent](/notes/agent-and-function-calling/)负责围绕目标选择行动，Harness 负责让行动真正执行、把结果送回，并管理运行过程。二者的边界取决于具体系统；[Coding Agent](/notes/coding-agent/)产品通常已经把模型和一部分 Harness 能力封装在一起。

例如，模型决定运行测试，终端工具负责执行，宿主保留输出与权限记录，后续步骤根据失败信息调整。这条链路里的可靠性来自各部分配合，不能只由模型回答得是否自信来判断。长期运行实践还需要在会话结束前留下进度与环境状态，便于下一轮接续。[1]

## 三种扩展承担什么职责

《Harness工程实战：从零开始驾驭AI软件工程》的相关节选，分别从反馈通道、专业评判方法和多角色改进说明 MCP、Skills 与 Subagent 的作用。[6] 下表结合协议与工程资料，把三种机制放进同一条任务链路，归纳其职责与实施条件。[2][3][4]

| 机制 | 可以承担的职责 | 实施时仍需补齐的部分 |
| --- | --- | --- |
| [MCP](/notes/mcp/) | 发现并调用外部服务提供的工具，获取资源与反馈 | 服务端适配、认证、权限、错误处理和结果解释 |
| [Skills](/notes/skills/) | 复用专业任务方法、评判标准及脚本 | 方法验证、脚本执行与运行结果检查 |
| [Subagent](/notes/subagents/) | 将局部任务交给有独立上下文和明确职责的代理 | 委派范围、权限、工作区协调和结果验收 |

三者可以组合，也可以按任务需要选用。编译器可直接通过命令行调用，审查流程可以写成普通程序，简单任务也可以由单个 Agent 完成；它们所承担的职责很有价值，但这些职责并不只能由某一种协议或架构实现。

## 把执行接成反馈闭环

一个简化的反馈过程是：**采取行动 → 获取运行证据 → 对照标准判断 → 决定下一步**。例如，Agent 修改接口后运行编译和测试，读取失败输出，修正后再次检查。这里的反馈必须来自真实执行，不能用“应该可以通过”代替检查结果。[1][5]

如果编译器、调试器或监控系统已有适配的 MCP 服务，MCP 可以成为这条反馈链路的连接方式。[2] 没有对应服务时，仍需编写适配器或使用其他工具接口。建立协议连接解决信息交换，服务可用性、观测质量和处理策略需要另外设计。

## 用评测推动改进

该书节选提出“出题人、解题人、裁判员”的角色分工。[6] 放在评测流程中，可以分别理解为定义任务与验收标准、执行任务、检查结果。它们可以由不同子代理承担，也可以由人、脚本和 Agent 分别完成；这些是组织职责，不是 Subagent 的内置角色。[4][5]

例如，出题流程提供一个可复现的缺陷和验收用例，编码代理提交修复，检查流程在干净环境中运行测试，审查代理补充对设计与边界的判断。自动测试、模型评判和人工审查各有适用范围；模型裁判需要用人工判断校准，不能把它的意见直接当成客观真值。[5]

持续改进需要把失败归因到具体环节，再修改提示、Skill、工具或调度方式，并用固定任务集复测。新增角色或反复运行本身不代表能力已经提升，更不等于模型自动更新了权重。要判断改进是否成立，应同时看任务成功率、回归问题、耗时与成本，而不是只看某次输出。[5]

## 把单次修复变成持续改进

**Harness 飞轮**让一次任务中发现的问题改善后续任务的运行条件。书中第 6.2 节把它描述为持续迭代的过程：Agent 的偏差被观察到，人分析原因并调整环境、工具或流程，后续运行检验同类问题是否减少。[8] 配套 CRM 项目保存的规范、架构测试和迭代设计材料，提供了相应的工程实例。[7]

作者提出从**最小可行挽具**起步：先放入少量关键要求，依据执行日志、失败案例与人工反馈，按优先级增补有针对性的能力。[8] 这里的“最小”是为了尽快获得有效反馈，不是固定删减某几种工具。新增套件应回应具体缺口，而不只是让配置看起来更完整。

例如，反复出现跨层依赖问题时，仅修改当前代码只能修好这一处；同时补充依赖约定并运行架构测试，后续改动就能获得更早的反馈。这里的变化发生在仓库和执行流程中，不表示模型权重自动学习。具体机制见[仓库知识与约束](/notes/repository-constraints/)。

约束也有维护和执行成本。一次偶然失败未必值得新增永久规则；应先区分临时环境问题、需求歧义和稳定的结构要求。飞轮是否有效，要看后续任务是否减少同类错误，以及新增检查是否造成误报和不必要的等待。

## 这些知识怎样连起来

完整的主题入口见[Harness 学习地图](/notes/harness-learning-map/)。[控制闭环](/notes/harness-control-loop/)进一步解释前馈、隔离与负反馈；[套件选型](/notes/harness-kit-selection/)说明如何根据偏差选择干预方式；[AI 友好型架构](/notes/ai-friendly-architecture/)讨论代码与结构怎样帮助定位和验证改动。

可以按“理解机制 → 组织执行 → 检查结果 → 用案例校准”的路径阅读。下面的关系是知识导航，不是必须依次完成的课程。

| 关注的问题 | 对应笔记 |
| --- | --- |
| Agent 为什么能连续行动 | [Agent Loop](/notes/agent-loop/)、[ReAct](/notes/react/)、[Coding Agent](/notes/coding-agent/) |
| 外部能力与局部任务怎样接入 | [MCP](/notes/mcp/)、[Skills](/notes/skills/)、[Subagent](/notes/subagents/) |
| 任务需要哪些信息，怎样接续 | [上下文工程](/notes/context-engineering/)、[Prompt / Context / Harness](/notes/prompt-context-harness/) |
| 哪些规则交给指令，哪些交给程序 | [仓库知识与约束](/notes/repository-constraints/)、[测试反馈](/notes/testing-feedback-loops/) |
| 怎样把目标推进为可验收变更 | [计划模式](/notes/plan-mode/)、[SDD](/notes/spec-driven-development/)、[TDD](/notes/test-driven-development/) |
| 工程条件变化后怎样应用 | [绿地 CRM](/notes/crm-harness-case/)、[遗留系统](/notes/legacy-refactoring/)、[跨系统集成](/notes/external-integration-case/) |
| 为什么代码能跑仍可能难以维护 | [认知债与架构债](/notes/cognitive-and-architecture-debt/) |

## 参考

1. Anthropic，[Effective harnesses for long-running agents](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents)，长期任务的环境管理、执行验证与跨会话恢复。
2. MCP，[Architecture](https://modelcontextprotocol.io/specification/2025-11-25/architecture)、[Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)，固定参考 2025-11-25 版，连接角色与工具调用。
3. [Agent Skills Specification](https://agentskills.io/specification)，可复用的指引、脚本与资源。
4. Anthropic，[How we built our multi-agent research system](https://www.anthropic.com/research/multi-agent-research-system)，任务委派、结果汇总及协调成本。
5. Anthropic，[Demystifying evals for AI agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents)，2026-01-09，任务、试验、评分器、执行轨迹与环境结果，评测隔离与长期维护。
6. 张建飞，《Harness工程实战：从零开始驾驭AI软件工程》，人民邮电出版社，2026 年 9 月，第 1 版，ISBN 9787115701800。MCP／Skills／Subagent 的关系依据所提供节选；第 6.2 节主题由[出版社公开目录](https://detail.youzan.com/show/goods?alias=2op1clbko20vl1d)核对，不将目录当作章节全文。
7. 作者配套仓库快照 `51c6b4b`：[CRM AGENTS.md](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter8/AGENTS.md)、[架构检查](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter8/crm-backend/src/test/java/com/harness/crm/ColaArchitectureTest.java)。飞轮过程与知识导航为结合资料的归纳。
8. 张建飞，同书[第 6.2 节“Harness 飞轮”](https://weread.qq.com/web/reader/af832910813abc0c8g010463k17e328b022b17e62166fad4)，2026-11-19 在微信读书核对图 6-1 与迭代方法、套件选择段落；电子阅读位置不换算为未核实的纸书页码。

网页于 2026-11-19 核对。职责表及对三种评测角色的解释为跨来源归纳，缺陷修复流程为自拟示例。
