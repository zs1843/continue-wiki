# 内容来源索引

最近整理日期：2026-11-19。以下记录当前 41 篇概念笔记实际使用的资料；每篇正文末尾保留对应参考，关键位置使用编号定位。来源包括书籍节选、方法文章、论文、规范和项目说明，不等同于用户的个人阅读履历。

2026-11-19 收录《Harness工程实战：从零开始驾驭AI软件工程》的口述／粘贴节选，涉及 Subagent、Harness 工程与 Coding Agent。后续通过出版社公开页面核实：张建飞著，人民邮电出版社，2026 年 9 月，第 1 版，ISBN 9787115701800。三代划分、四组核心能力和出题／解题／评判角色依据所提供节选；另在微信读书实际核对第 6.2 节、10.2 节的选定段落，以及第 3.6 节开头的角色示例，未通读全书。新增案例依据作者公开配套仓库快照 `51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a` 的实际文件。公开目录只用于主题定位，不用来推测章节正文。核对范围见 [书籍资料记录](harness-book-sources.md)。

本轮继续核对的原书章节、已解决的加载缺口与剩余范围，见资料记录末尾“第二次补核”。选型第四步、架构四维、PDLC、认知债及测试策略已补入对应正文。

| 笔记 | 来源与支持范围 |
| --- | --- |
| 控制矩阵 | Böckeler《Harness engineering》2026-04-02：Guide／Sensor 与 computational／inferential；原书 4.4 可读页存在省略，明确区分补充来源 |
| Agent 可观测性 | 原书 11.4.2：决策来源、行为偏差与协作假设；记录模板为解释性归纳 |
| 领域建模案例 | 原书 7.4.2–7.4.3：状态、精度、冻结与外部验证；不将案例业务规则推广为通用标准 |
| 行业 Harness 案例 | 原书 4.2–4.3 及 OpenAI、Anthropic 一手文章：环境可读性、角色评估与验收约定；未核实数字不收录 |
| Harness 学习地图 | 书籍公开目录、实际查看的各章小结及概念笔记，组织第 1–11 章主要主题的学习关系；不表示逐节精读完成 |
| 控制闭环 | 原书第 5.3 节定义、软硬控制与三要素相关页面，第 6.1 节开头定义与温控类比；定义解释、接口示例与边界为归纳 |
| Harness 套件选型 | 原书第 6.3 节开头及偏差类型、约束强度、复用范围段落；不补写尚未读取的决策步骤 |
| AI 友好型架构 | 原书第 7.5 节两页小结与已核对的架构测试；不将加载失败的第 7.1、7.2 节页面视为已读正文 |
| 从编码到构建 | 原书第 11.1、11.3 节开头及职责／审视相关页面；职责解释结合已有案例，不转述未读取的问题清单 |
| 仓库知识与约束 | 作者配套仓库固定快照：`chapter8/AGENTS.md`、测试说明、`ColaArchitectureTest.java`、`.githooks/pre-commit`、后端 CI；[ArchUnit User Guide](https://www.archunit.org/userguide/html/000_Index.html)支持可执行架构规则。书第 6.2 节实际读取的套件分类支持通用／项目特有规则的区分。软约束／硬门禁及治理边界为结合材料的归纳 |
| 测试反馈 | 第 10.2 节实际读取的总述、内环／中环相关段落和外环目标；作者仓库折扣测试、测试数据源配置、`chapter9/prompt.md` 的 WireMock 重构任务、根目录 Compose、E2E 工作流与 Playwright 配置。三个反馈范围与文件的对应表为归纳，任务描述不当作已实现或本次执行成功的证据 |
| CRM 迭代案例 | 作者仓库 OpenSpec 历史变更，重点读取客户小记设计与任务、客户标签设计及架构检查；记录业务边界与项目取舍，不推广为所有 CRM 的设计标准 |
| 遗留系统重构 | 作者仓库 `chapter10/prompt.md`、`PricingPolicy`、折扣测试、`OrderController.process` 的开关与 DTO 转换；[Martin Fowler Strangler Fig](https://martinfowler.com/bliki/StranglerFigApplication.html)补充渐进替换的定义。印刷书第 9 章主题与仓库 `chapter10` 目录号分开记录 |
| 跨系统集成案例 | 作者仓库 `customer-center-integration/design.md`：字段权威、同步、补偿、降级与未解决窗口。只描述设计记录的方案，不声称已复现全部实现 |
| Coding Agent | 上述书籍节选：三代划分与四组能力视角；[OpenCode Intro](https://opencode.ai/docs/)、[Agents](https://opencode.ai/docs/agents/)、[Permissions](https://opencode.ai/docs/permissions/)、[MCP servers](https://opencode.ai/docs/mcp-servers/)、[Plugins](https://opencode.ai/docs/plugins/)、[Compaction](https://opencode.ai/docs/compaction/)：产品定位、角色、权限、连接、扩展与压缩，2026-11-19 读取的 V2 在线文档；[GitHub Copilot](https://docs.github.com/en/copilot/get-started/about-github-copilot)：同一产品同时支持建议、交互与多步任务；[Claude Code Hooks](https://code.claude.com/docs/en/hooks)：事件触发与工具执行前控制；Agent Skills 规范与 Anthropic 的上下文／长期任务文章补充方法复用及状态恢复。协作表与工程任务示例为解释性归纳 |
| Harness 工程 | 上述书籍节选：MCP、Skills、Subagent 的作用及三种评测角色；原书第 6.2 节实际读取：飞轮、最小可行挽具、观测与渐进补齐、按需套件；[Effective harnesses](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents)：环境、状态、验证与恢复；[Demystifying evals for AI agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents)：任务、评分器、轨迹与结果、环境隔离、人工校准和评测维护；MCP 2025-11-25 规范、Agent Skills 规范及多代理研究系统支持职责对照。定义范围与职责表为跨来源归纳 |
| Agent 与 Function Calling | [Building effective agents](https://www.anthropic.com/research/building-effective-agents)：Agent 与工作流分类；[Tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)：工具调用、执行位置、`tool_use`／`tool_result` 往返示例 |
| 工具 Schema | [JSON Schema Object](https://json-schema.org/understanding-json-schema/reference/object)、[Annotations](https://json-schema.org/understanding-json-schema/reference/annotations)：输入结构与注解；[MCP Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)：工具定义；[Tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)：`name`、`description`、`input_schema` 的官方示例 |
| Agent Loop | 上述 Tool use 的调用反馈过程与 Building effective agents 的环境反馈、停止条件；正文流程图为机制示意 |
| Subagent | [Multi-agent research system](https://www.anthropic.com/research/multi-agent-research-system)：任务委派、独立上下文与压缩汇总、并行数量与时间收益、90.2% 内部评测与 4／15 倍 token 成本、不适合共享上下文任务的说明，作为具体系统实例；[Claude Code Subagents](https://code.claude.com/docs/en/sub-agents)：子代理文件格式、工具与模型配置、只继承自身系统提示的说明 |
| ReAct | [原论文 arXiv v3](https://arxiv.org/abs/2210.03629v3)，2023-03-10（ICLR 2023 正式版）：第 2 节 thought 与动作空间、第 3 节 PaLM-540B 对照数据与 HotpotQA 失败类型标注、第 4 节 ALFWorld／WebShop 结果、失败与微调说明；正文检索轨迹为按论文动作格式自拟 |
| MCP | [Architecture](https://modelcontextprotocol.io/specification/2025-11-25/architecture)、[Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)、[Lifecycle](https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle)、[Prompts](https://modelcontextprotocol.io/specification/2025-11-25/server/prompts)、[Resources](https://modelcontextprotocol.io/specification/2025-11-25/server/resources)，固定参考 2025-11-25 版：角色、初始化、工具发现和调用、提示模板与资源的列举读取；正文流程图按所提供示意图重绘，接口名称按同版本规范核对 |
| Skill | [Agent Skills Specification](https://agentskills.io/specification)：目录、SKILL.md 格式与渐进加载；[Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)：简洁、描述写法、示例与模板、避免的写法，`pdf-processing` 示例；[Agent Skills 概览](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)：SKILL.md 结构与加载层级。四条实践为整理时归纳，逐条对应指南内容 |
| 上下文工程 | [Effective context engineering](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents)：上下文范围、检索、压缩、结构化笔记和子代理；正文进度笔记模板为自拟示例 |
| Prompt / Context / Harness | 上述上下文文章与 [Effective harnesses](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents)：指令、信息与运行机制的区分，跨会话任务实例、功能清单与 `claude-progress.txt`／`init.sh`；正文对照表为解释性归纳，文件名为示例 |
| 计划模式 | Claude Code，[Choose a permission mode](https://code.claude.com/docs/en/permission-modes)：plan mode 的行为、进入方式、批准选项与边界；2026-11-17 读取，产品行为仅对应 Claude Code |
| 计划模式与 Superpowers 的对比 | 上述权限模式说明与 [Superpowers README](https://github.com/obra/superpowers)：方法集范围与工作流；对比维度为整理时的归纳 |
| Superpowers | 同一 README：可组合 Skills、需求探索、计划、执行和检查；正文请求示例为自拟，不记录未核实的包版本 |
| GSD | [原仓库迁移说明](https://github.com/gsd-build/get-shit-done)、[GSD Core README](https://github.com/open-gsd/gsd-core)：阶段循环、子智能体与 `STATE.md`／`CONTEXT.md` 等状态材料 |
| SDD | [Spec Kit 方法说明](https://github.com/github/spec-kit/blob/main/spec-driven.md)与 [README](https://github.com/github/spec-kit)：规范作为持续开发依据、`specs/<分支名>/` 下的 spec／plan／tasks 结构，作为具体方法实例 |
| TDD | [Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)：测试列表与 Red–Green–Refactor；正文去重示例为自拟 |
| 认知债与架构债 | Margaret-Anne Storey，[From Technical Debt to Cognitive and Intent Debt](https://arxiv.org/abs/2603.22106v4)，v4，2026-04-06 摘要：团队／项目语境的认知债；[SEI Architectural Technical Debt Library](https://www.sei.cmu.edu/library/architectural-technical-debt-library/)：架构技术债定义；[Technical Debt](https://martinfowler.com/bliki/TechnicalDebt.html)：后续修改成本 |

示例均用于解释概念；未标为来源案例的内容不归于原作者，也不表示用户实际执行过。文末参考中的书目、版本和章节只记录实际可核实的信息。

Subagent 于 2026-11-19 补充分治类比、层级协作、专业化配置、权限与动态扩展的边界：书籍节选提供方向，OpenCode Agents／Plugins 文档支持具体实现说明；动态重载不作为所有子代理的固有特性。MCP／Skills／上下文工程同步补充反馈连接、评判方法复用与跨会话记忆的关联。

除固定规范和论文版本外，网页与项目链接会随上游更新。`updated` 是笔记整理日期，不是来源发表日期。后续收集书籍或文章中的知识点时，按 [内容整理约定](content-writing.md)补充出处与概念关联。

## AI 基础与检索首批整理（2026-11-19）

新增 8 篇概念笔记与 1 篇学习入口。教材是概念依据；表格中的玩具词表、概率、二维坐标、检索集合与个人笔记流程均明确为自拟解释，不是原书实验数据。未声称通读教材，未将示例 RAG 流程描述为本站已实现功能。

| 教材／论文 | 本次实际读取范围 | 对应内容 |
| --- | --- | --- |
| Jurafsky、Martin，Speech and Language Processing，第 3 版在线草稿，2026-08-19 | 作者官网第 2 章 §2.4–2.4.3、第 5 章开头及 §5.3–5.4、第 7 章开头与 §7.1、7.6–7.7、第 11 章 §11.1.2、11.2–11.4 的相关正文 | Token、表示、解码、训练、检索、RAG 与 Precision／Recall；草稿章号对应这个日期，未补猜纸书页码 |
| Zhang、Lipton、Li、Smola，Dive into Deep Learning，英文在线版 1.0.3 | §9.3.1、§11.1、§11.7.1–11.7.5、§11.9.1–11.9.3 的相关正文 | 序列概率、Attention、Transformer 组件及 BERT／T5／GPT 的结构和适配；不将历史模型数据当成当前产品规格 |
| Lewis 等，Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks，NeurIPS 2020，arXiv v4 | §1–2 相关正文 | 参数／非参数记忆、原始联合训练方案与常见推理时组装资料的区别 |

链接在各篇末尾保留。Introduction to Information Retrieval 的 Stanford 页面与 PDF 本次读取超时，没有据此声称核对或将其列为已使用的正文来源。额外查看 DPR 论文书目摘要，仅作背景，未代替教材正文或转述其效果数字。

本批主题是“表示与生成 → 检索 → 有依据的回答 → 分层评估”。记忆治理、完整架构选型、安全、推理运行与多模态仍未纳入本批完成范围。
