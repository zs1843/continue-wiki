# 内容来源索引

整理日期：2026-11-17。以下记录当前 15 篇概念笔记实际使用的资料；每篇正文末尾保留对应参考，关键位置使用编号定位。来源包括方法文章、论文、规范和项目说明，不等同于用户的个人阅读履历。

| 笔记 | 来源与支持范围 |
| --- | --- |
| Agent 与 Function Calling | [Building effective agents](https://www.anthropic.com/research/building-effective-agents)：Agent 与工作流分类；[Tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)：工具调用、执行位置、`tool_use`／`tool_result` 往返示例 |
| 工具 Schema | [JSON Schema Object](https://json-schema.org/understanding-json-schema/reference/object)、[Annotations](https://json-schema.org/understanding-json-schema/reference/annotations)：输入结构与注解；[MCP Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)：工具定义；[Tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)：`name`、`description`、`input_schema` 的官方示例 |
| Agent Loop | 上述 Tool use 的调用反馈过程与 Building effective agents 的环境反馈、停止条件；正文流程图为机制示意 |
| Subagent | [Multi-agent research system](https://www.anthropic.com/research/multi-agent-research-system)：任务委派、独立上下文与压缩汇总、并行数量与时间收益、90.2% 内部评测与 4／15 倍 token 成本、不适合共享上下文任务的说明，作为具体系统实例；[Claude Code Subagents](https://code.claude.com/docs/en/sub-agents)：子代理文件格式、工具与模型配置、只继承自身系统提示的说明 |
| ReAct | [原论文 arXiv v3](https://arxiv.org/abs/2210.03629v3)，2023-03-10（ICLR 2023 正式版）：第 2 节 thought 与动作空间、第 3 节 PaLM-540B 对照数据与 HotpotQA 失败类型标注、第 4 节 ALFWorld／WebShop 结果、失败与微调说明；正文检索轨迹为按论文动作格式自拟 |
| MCP | [Architecture](https://modelcontextprotocol.io/specification/2025-11-25/architecture)、[Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)、[Lifecycle](https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle)、[Prompts](https://modelcontextprotocol.io/specification/2025-11-25/server/prompts)、[Resources](https://modelcontextprotocol.io/specification/2025-11-25/server/resources)，固定参考 2025-11-25 版：角色、初始化、工具发现和调用、提示模板与资源的列举读取；正文流程图按所提供示意图重绘，接口名称按同版本规范核对 |
| Skill | [Agent Skills Specification](https://agentskills.io/specification)：目录、SKILL.md 格式与渐进加载；[Skill authoring best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)：简洁、描述写法、示例与模板、避免的写法，`pdf-processing` 示例；[Agent Skills 概览](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)：SKILL.md 结构与加载层级。四条实践为整理时归纳，逐条对应指南内容 |
| 上下文工程 | [Effective context engineering](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents)：上下文范围、检索、压缩、结构化笔记和子代理 |
| Prompt / Context / Harness | 上述上下文文章与 [Effective harnesses](https://www.anthropic.com/research/effective-harnesses-for-long-running-agents)：指令、信息与运行机制的区分，跨会话任务实例；正文对照表为解释性归纳 |
| 计划模式 | Claude Code，[Choose a permission mode](https://code.claude.com/docs/en/permission-modes)：plan mode 的行为、进入方式、批准选项与边界；2026-11-17 读取，产品行为仅对应 Claude Code |
| 计划模式与 Superpowers 的对比 | 上述权限模式说明与 [Superpowers README](https://github.com/obra/superpowers)：方法集范围与工作流；对比维度为整理时的归纳 |
| Superpowers | 同一 README：可组合 Skills、需求探索、计划、执行和检查；不记录未核实的包版本 |
| GSD | [原仓库迁移说明](https://github.com/gsd-build/get-shit-done)、[GSD Core README](https://github.com/open-gsd/gsd-core)：阶段循环、子智能体与状态材料 |
| SDD | [Spec Kit 方法说明](https://github.com/github/spec-kit/blob/main/spec-driven.md)与 [README](https://github.com/github/spec-kit)：规范作为持续开发依据，作为具体方法实例 |
| TDD | [Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)：测试列表与 Red–Green–Refactor |
| 认知债与架构债 | Margaret-Anne Storey，[From Technical Debt to Cognitive and Intent Debt](https://arxiv.org/abs/2603.22106v4)，v4，2026-04-06 摘要：团队／项目语境的认知债；[SEI Architectural Technical Debt Library](https://www.sei.cmu.edu/library/architectural-technical-debt-library/)：架构技术债定义；[Technical Debt](https://martinfowler.com/bliki/TechnicalDebt.html)：后续修改成本 |

示例均用于解释概念；未标为来源案例的内容不归于原作者，也不表示用户实际执行过。文末参考中的书目、版本和章节只记录实际可核实的信息。

除固定规范和论文版本外，网页与项目链接会随上游更新。`updated` 是笔记整理日期，不是来源发表日期。后续收集书籍或文章中的知识点时，按 [内容整理约定](content-writing.md)补充出处与概念关联。
