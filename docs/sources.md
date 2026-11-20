# 内容来源索引

最近整理日期：2026-11-19。以下记录当前 68 篇概念笔记实际使用的资料；每篇正文末尾保留对应参考，关键位置使用编号定位。来源包括书籍节选、方法文章、论文、规范和项目说明，不等同于用户的个人阅读履历。

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

## AI 架构、记忆与安全补入（2026-11-19）

新增 5 篇笔记，并把 `content/` 按知识层级重排为模型、知识、编排、系统、工程、方法、治理、案例、反思九组；slug 与文章地址未变。教材与论文的引用只对应实际读取的部分，示例与归纳单独标注。

| 笔记 | 来源与实际读取范围 |
| --- | --- |
| 架构选型 | Anthropic，[Building effective agents](https://www.anthropic.com/research/building-effective-agents)，2026-11-19 读取：工作流与 Agent 的区分、五种工作流、适用条件、成本与护栏建议。文中已提示工具生态自 2024 年 12 月起有变化。判断顺序与假设示例为归纳 |
| 记忆与状态 | LangChain，[Memory overview](https://docs.langchain.com/oss/python/concepts/memory)，2026-11-19 读取：短期与长期记忆、语义／情景／程序记忆、资料档与集合、主路径与后台写入、namespace 存储与召回；OpenAI，[Agents SDK Sessions](https://openai.github.io/openai-agents-python/sessions/)，同日读取：历史取回与写回、`limit`、`pop_item`、压缩与恢复，页面读到 Memory operations 之前；Packer 等，[MemGPT](https://arxiv.org/abs/2310.08560)，arXiv v2，2024-02-12，仅读摘要 |
| 提示注入 | OWASP，[LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)。站点正文在抓取时被截断，改以项目仓库的 [Markdown 原文](https://raw.githubusercontent.com/OWASP/www-project-top-10-for-large-language-model-applications/main/2_0_vulns/LLM01_PromptInjection.md)核对，2026-11-19：定义、两种路径、影响与七类缓解措施；Greshake 等，[arXiv 2302.12173v2](https://arxiv.org/abs/2302.12173)，仅读摘要；Simon Willison，[Prompt injection attacks against GPT-3](https://simonwillison.net/2022/Sep/12/prompt-injection/)，2022-09-12 |
| 过度自主 | OWASP，[LLM06:2025 Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)，同样以仓库 [Markdown 原文](https://raw.githubusercontent.com/OWASP/www-project-top-10-for-large-language-model-applications/main/2_0_vulns/LLM06_ExcessiveAgency.md)核对，2026-11-19：三类根因、缓解措施与场景；客服退款例子为自拟 |
| 数据隔离 | OWASP，[LLM02:2025 Sensitive Information Disclosure](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/)，以仓库 [Markdown 原文](https://raw.githubusercontent.com/OWASP/www-project-top-10-for-large-language-model-applications/main/2_0_vulns/LLM02_SensitiveInformationDisclosure.md)核对，2026-11-19：敏感信息类型、泄露路径、缓解措施与系统提示限制不可靠的说明；多租户例子为自拟 |

OWASP 三个站点页面在抓取时只返回标题与导航，没有把截断页面当作已读正文；仓库原文与站点条目同属该项目的 2025 版列表。arXiv 论文只读摘要，没有转述实验数字。LangChain 与 OpenAI 文档是具体实现的说明，不当作通用标准。

## 第 2–7 批：训练、推理、检索、评估、多模态与产品（2026-11-19）

新增 15 篇笔记，覆盖训练与适配、推理与服务、检索工程、评估方法论、多模态与产品治理。目录同时重排为 15 组（00 学习路线 + 01–14 层）。训练与推理部分优先读取官方文档的 GitHub Markdown 原文，因为站点页面返回的是导航壳或截断正文；论文只读摘要的地方在表中注明。

| 笔记 | 来源与实际读取范围 |
| --- | --- |
| 指令微调 | Hugging Face TRL，[SFT Trainer](https://raw.githubusercontent.com/huggingface/trl/main/docs/source/sft_trainer.md) 全文 Overview–SFTConfig：损失、数据格式、计损范围与学习率示例；[InstructGPT](https://arxiv.org/abs/2203.02155) 摘要 |
| LoRA 与 QLoRA | [LoRA](https://arxiv.org/abs/2106.09685) v2 摘要：低秩矩阵、参数量与显存对比；[QLoRA](https://arxiv.org/abs/2305.14314) 摘要：4-bit 基座、NF4、65B/48GB 与 Guanaco；Hugging Face [PEFT](https://huggingface.co/docs/peft/index.md) 全文 |
| 偏好优化 | [InstructGPT](https://arxiv.org/abs/2203.02155) 摘要：SFT+RLHF 与结果；[DPO](https://arxiv.org/abs/2305.18290) v3 摘要：RLHF 复杂性、重参数化与分类损失 |
| 推理运行与 KV Cache | vLLM [Metrics](https://raw.githubusercontent.com/vllm-project/vllm/main/docs/design/metrics.md) 全文：prefill/decode 区间、TPOT、缓存使用率；vLLM [Paged Attention](https://raw.githubusercontent.com/vllm-project/vllm/main/docs/design/paged_attention.md) 的 Concepts（原文标注为历史文档）；Hugging Face [KV cache](https://raw.githubusercontent.com/huggingface/transformers/main/docs/source/en/kv_cache.md) 全文 |
| 量化 | Hugging Face [量化概览](https://raw.githubusercontent.com/huggingface/transformers/main/docs/source/en/quantization/overview.md) 全文：位宽换算、方法数量、加载方式；[GPTQ](https://arxiv.org/abs/2210.17323) 与 [AWQ](https://arxiv.org/abs/2306.00978) 摘要；KV 量化部分同 KV cache 文档 |
| 推理可靠性 | Azure [Retry](https://learn.microsoft.com/en-us/azure/architecture/patterns/retry) 与 [Circuit Breaker](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker) 全文；AWS Builders' Library [Timeouts, retries, and backoff with jitter](https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter) 的 Timeouts/Retries/Jitter 正文（原链接 302 到此） |
| 文档解析与切分 | Anthropic，[Introducing Contextual Retrieval](https://www.anthropic.com/research/contextual-retrieval)，读取至实施注意事项与结论：块大小与重叠、上下文前缀、失败率与成本、200k token 门槛；解析环节的解释为归纳 |
| 混合检索与查询改写 | 同上：BM25、混合流程与重排候选；Elastic，[Reciprocal rank fusion](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion) 全文：公式、参数与限制；[HyDE](https://arxiv.org/abs/2212.10496) 摘要 |
| 检索的权限与更新 | OWASP [LLM02](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/)（仓库 Markdown 原文）：最小权限与系统提示限制；Elastic，[Near real-time search](https://www.elastic.co/guide/en/elasticsearch/reference/current/near-real-time.html) 全文：刷新与可见延迟；删除与重索引为归纳 |
| 评测集与评分器 | Anthropic，[Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)，读取至附录：评测单位、任务设计、评分器取舍与校准；[LLM-as-a-Judge](https://arxiv.org/abs/2306.05685) 摘要：三类偏差与一致率 |
| 回归与线上评估 | 同上 Anthropic 文章：能力／回归评测、分数上升例子、线上信号与维护建议；基准污染未在该文展开，正文已注明 |
| 视觉编码与跨模态对齐 | [ViT](https://arxiv.org/abs/2010.11929)、[CLIP](https://arxiv.org/abs/2103.00020)、[SigLIP](https://arxiv.org/abs/2303.15343) v4 摘要 |
| 语音与生成 | [Whisper](https://arxiv.org/abs/2212.04356)、[DDPM](https://arxiv.org/abs/2006.11239)、[Latent Diffusion](https://arxiv.org/abs/2112.10752) 摘要；语音合成未读取来源，正文已注明不展开 |
| AI 产品形态与交互 | Google PAIR [User Needs](https://pair.withgoogle.com/chapter/user-needs/)、[Mental Models](https://pair.withgoogle.com/chapter/mental-models/)、[Errors](https://pair.withgoogle.com/chapter/errors-failing/)、[Explainability](https://pair.withgoogle.com/chapter/explainability-trust/) 全章；Microsoft [HAX AI Guidelines](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/) |
| 成本、上线与治理 | NIST [AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) 整页：自愿框架、四功能与版本日期；[Model Cards](https://arxiv.org/abs/1810.03993) 摘要；成本结构为归纳，未引用价格数字 |

本次没有读取成功或内容不符的来源已排除：LangChain 切分文档、Azure 安全裁剪与增量扩充页面均返回 404；arXiv 1503.05991 经核对不是 Hidden Technical Debt 一文，未使用；OpenAI 评测平台文档只用于确认其只读与关停日期，未写入笔记。站点页面截断时改用同项目的 GitHub Markdown 原文，表中已注明。

## 数学基础补入（2026-11-20）

审计后先补两篇数学基础，放在 01 组。均只使用 D2L 在线版，公式与数字逐项核对；示例为自拟换算，不是实验结果。

| 笔记 | 来源与实际读取范围 |
| --- | --- |
| 交叉熵与困惑度 | Zhang、Lipton、Li、Smola，《Dive into Deep Learning》1.0.3，[§4.1 Softmax Regression](https://d2l.ai/chapter_linear-classification/softmax-regression.html)，2026-11-20 读取 softmax 定义、交叉熵公式 4.1.8、对 logit 的导数 4.1.10，正文读到信息论基础开头；[§9.3 Language Models](https://d2l.ai/chapter_recurrent-neural-networks/language-model.html) 的 Perplexity 一节全文（原始 rst 源）。0.5 概率的换算示例为自拟 |
| 梯度、过拟合与正则 | 同上，[§5.3 Backpropagation](https://d2l.ai/chapter_multilayer-perceptrons/backprop.html) 全文（链式法则、中间值与显存）；[§4.6 Generalization in Classification](https://d2l.ai/chapter_linear-classification/generalization-classification.html) 全文（测试误差估计、2500／10000／15000 样本、测试集复用与自适应过拟合）；[§3.7 Weight Decay](https://d2l.ai/chapter_linear-regression/weight-decay.html) 全文（L2 惩罚、更新式、L1 对比、200 维与 20 样本示例）。以上均为原始 rst 源，示例数字来自教材 |

## 推理引擎选型（2026-11-20）

新增一篇，对比 vLLM、SGLang 与 TensorRT-LLM。论文与博客只读摘要或正文，官方文档按页面读取；未读到的能力明确不比较。

| 笔记 | 来源与实际读取范围 |
| --- | --- |
| 推理引擎选型 | vLLM：[PagedAttention 论文摘要](https://arxiv.org/abs/2309.06180)（2–4 倍吞吐）；[2023-06-20 博客](https://vllm.ai/blog/2023-06-20-vllm)（block table、KV 浪费低于 4%、60–80%、24 倍／3.5 倍）；[Automatic Prefix Caching](https://raw.githubusercontent.com/vllm-project/vllm/main/docs/features/automatic_prefix_caching.md) 与 [LoRA](https://raw.githubusercontent.com/vllm-project/vllm/main/docs/features/lora.md) 全文。SGLang：[LMSYS 2024-01-17 博客](https://www.lmsys.org/blog/2024-01-17-sglang/)（radix tree、1 token 一页、LRU、5 倍与前端 DSL）；[论文摘要](https://arxiv.org/abs/2312.07104)（压缩有限状态机、6.4 倍）。TensorRT-LLM：Overview、Paged Attention/IFB/Scheduler、Speculative Decoding、Quantization、Parallelism 与 TensorRT Backend Removed 页面，2026-11-20 读取，Overview 标注最后更新 2026-11-16。未读：vLLM 连续批处理与投机解码文档、SGLang 路由与结构化输出正文，因此正文不做这些对比 |

## 文档理解与结构化检索（2026-11-20）

新增两篇 04 组笔记。Azure 页面读取到指定章节；GraphRAG 读 README 与官方概览；论文只读摘要。

| 笔记 | 来源与实际读取范围 |
| --- | --- |
| 文档理解与 OCR | Azure AI Document Intelligence，[Layout model v4.0](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/prebuilt/layout?view=doc-intel-4.0.0)，2026-11-20 读取至 Sections：输入格式、pages／paragraphs／lines／words／selection marks／tables／figures／sections、Markdown 表示与页数、大小、分辨率限制；[Overview](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview?view=doc-intel-4.0.0) 同日读取（页面截断），仅用于版本与模型定位 |
| 结构化检索 | Microsoft，[GraphRAG README](https://raw.githubusercontent.com/microsoft/graphrag/main/README.md) 全文（索引管线、维护模式、成本提示）；[Indexing Overview](https://microsoft.github.io/graphrag/index/overview/) 与 [Query Overview](https://microsoft.github.io/graphrag/query/overview/) 全文（实体关系、社区摘要、Local／Global／DRIFT／Basic）；[Text-to-SQL 综述](https://arxiv.org/abs/2208.13629) 与 [BIRD](https://arxiv.org/abs/2305.03111v3) 仅读摘要（12,751 对、95 库、40.08% 与 92.96%） |

## 多 Agent 编排（2026-11-20）

新增一篇 05 组笔记。协议与 SDK 文档读正文，Anthropic 文章读正文；未读 LangGraph 多 Agent 文档，正文不比较。

| 笔记 | 来源与实际读取范围 |
| --- | --- |
| 多 Agent 编排 | OpenAI，[Agents SDK: Multi-agent](https://openai.github.io/openai-agents-python/multi_agent/)，2026-11-20 读取正文：模型决策与代码编排、agents-as-tools 与 handoffs；A2A，[Key concepts](https://a2a-protocol.org/latest/topics/key-concepts/)、[Agent discovery](https://a2a-protocol.org/latest/topics/agent-discovery/)、[Life of a task](https://a2a-protocol.org/latest/topics/life-of-a-task/) 正文：角色、Agent Card、Task／Message／Part／Artifact、状态与传输；Anthropic，[How we built our multi-agent research system](https://www.anthropic.com/research/multi-agent-research-system) 正文：90.2%、4 倍／15 倍 token、适用条件、规模与评测 |

## 组织与责任（2026-11-20）

新增一篇 12 组笔记。PAIR 读全章，NIST Playbook 读到 Govern 2.3，Model Cards 只读摘要；商业模式没有读到可引用来源，正文明确不覆盖。

| 笔记 | 来源与实际读取范围 |
| --- | --- |
| 组织与责任 | Google PAIR，[User Needs](https://pair.withgoogle.com/chapter/user-needs/) 与 [Feedback + Control](https://pair.withgoogle.com/chapter/feedback-controls/) 全章，2026-11-20：适用与不适用任务、反馈类型与生效说明、控制权；NIST，[AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) 页（发布时间与 GenAI Profile）与 [Playbook: Govern](https://airc.nist.gov/airmf-resources/playbook/govern/)（GOVERN 1.1–1.7、2.1–2.3，Govern 3 起截断）：角色、责任、风险容忍度、文档与清单；[Model Cards](https://arxiv.org/abs/1810.03993) 摘要 |
