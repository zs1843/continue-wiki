---
title: 多 Agent 编排：分工、交接与共享状态
slug: multi-agent-orchestration
status: published
order: 120
updated: "2026-11-20"
mindmap:
  - label: "先决定由代码还是模型编排"
    heading: "先决定由代码还是模型编排"
  - label: "工具调用与交接是两种协作"
    heading: "工具调用与交接是两种协作"
  - label: "用任务与卡片描述协作"
    heading: "用任务与卡片描述协作"
  - label: "并行省时间也会放大成本"
    heading: "并行省时间也会放大成本"
---

**多 Agent 编排** 决定多个代理怎样分工、怎样交接、怎样共享状态。它不是一个必须升级的阶段：单 Agent 加工具往往够用，只有在任务可并行、信息超过单窗口或工具太多时，拆分才划算。

## 先决定由代码还是模型编排

OpenAI Agents SDK 把编排分成两类：由模型决定下一步，或由代码预先定义流程；两者可以混用。代码侧的常见编排包括：用结构化输出做分类、按顺序链式调用、评估—改进循环，以及用 `asyncio.gather` 并行。[1]

这对应[架构选型](/notes/architecture-selection/)里的判断：流程可预测就用代码，路径不可预测才交给模型。

## 工具调用与交接是两种协作

SDK 给出两种把专家接进来的方式：[1]

| 方式 | 做法 | 适合 |
| --- | --- | --- |
| agents-as-tools | 管理者用 `Agent.as_tool()` 调用专家，保留对话控制与最终回答 | 汇总多专家意见、集中护栏 |
| handoffs | 分诊代理把对话交给专家，专家成为本轮活动代理 | 专家直接回复用户、提示需要聚焦、指令要切换 |

两者可以组合：分诊先交接，专家再调用工具。区别在“谁对用户说话”和“谁持有对话状态”。

## 用任务与卡片描述协作

跨厂商或跨进程的协作需要协议。A2A（Agent2Agent）协议把角色分为用户、客户端代理与服务端（远程）代理，远程代理对客户端不透明。[2]

- **Agent Card**：JSON 描述身份、服务地址（endpoint）、能力（流式、推送）、认证方式、技能与输入输出模式；发现方式包括 `/.well-known/agent-card.json`、注册表或直接配置，卡片本身需要认证与 HTTP 缓存策略。[3]
- **Task**：有唯一 id 与生命周期的状态化工作单元；**Message** 是单轮通信，**Part** 可以是文本、原始数据、URL 或结构化数据；**Artifact** 是交付物，可以流式增量返回。[4]
- 响应可以是无状态的 Message，也可以是长任务 Task；状态包括 input-required、auth-required 与 completed、canceled、rejected、failed。终态任务不能重启，后续要在同一 contextId 下新建 Task；referenceTaskIds 可以引用前序任务，支持并行后续。[4]
- 传输方式包括轮询、服务器发送事件（SSE）与推送回调（webhook），底层是 HTTP(S) 加 JSON-RPC 2.0（一种远程调用协议）。[4]

协议解决的是“怎样发现、调用、追踪”，不解决“该不该拆”。

## 并行省时间也会放大成本

Anthropic 的多 Agent 研究系统采用 orchestrator-worker：主代理规划并并行启动子代理，子代理各自在自己的上下文里搜索，最后汇总；另有 CitationAgent 处理引用。[5]

文章报告：Opus 4 主代理加 Sonnet 4 子代理，在 breadth-first 查询上比单 Agent Opus 4 高 90.2%。[5]

成本同样明确：普通 agent 约是 chat 的 4 倍 token，多 Agent 约 15 倍；在 BrowseComp 上，token 用量解释了 80% 的方差，三个因素合计 95%。[5] 也就是说，多 Agent 的优势很大程度来自“花了更多 token 去搜”。

适用条件：任务可并行、信息量超过单窗口、工具很多。不适合：需要共享上下文、强依赖（多数编码任务）、实时协调要求高。[5]

规模上，文章给出的经验是：简单查询 1 个代理、3–10 次调用；比较类 2–4 个子代理、10–15 次调用；复杂任务超过 10 个；3–5 个子代理并行、每个再用 3 个以上工具，复杂查询的时间最多降低 90%。[5]

## 评估与运维

多 Agent 系统要单独评测：文章建议从约 20 条真实查询起步，用大模型评分器（LLM judge）按事实、引用、完整性、来源质量、工具效率评分，再补人工判断。[5]

失败模式也会放大：子代理的错误会沿汇总链累积；同步子代理可能成为瓶颈；子代理输出可以落文件系统、只回引用，减少上下文压力；长任务要能断点恢复。[5]

## 边界

- 多数编码任务不适合拆成多 Agent：文件之间强依赖，共享上下文比并行更重要。[5]
- 协议（A2A）与实现（SDK、框架）不是一回事；协议版本与能力要以读取日期为准。
- 多 Agent 的成本约为 chat 的 15 倍，先确认收益再扩规模；数字来自特定评测，不能直接套用到自己的任务。
- 单 Agent 的循环、工具与记忆仍是基础，见[Agent Loop](/notes/agent-loop/)与[记忆与状态](/notes/memory-and-state/)。

## 参考

1. OpenAI，[Agents SDK: Multi-agent](https://openai.github.io/openai-agents-python/multi_agent/)，2026-11-20 读取正文：模型决策与代码编排、agents-as-tools 与 handoffs 的对比和组合。
2. A2A，[Key concepts](https://a2a-protocol.org/latest/topics/key-concepts/)，同日读取：用户、客户端与服务端代理的角色划分。
3. A2A，[Agent discovery](https://a2a-protocol.org/latest/topics/agent-discovery/)，同日读取：Agent Card 字段、发现方式、认证与缓存。
4. A2A，[Life of a task](https://a2a-protocol.org/latest/topics/life-of-a-task/)，同日读取：Task、Message、Part、Artifact、状态与传输方式。
5. Anthropic，[How we built our multi-agent research system](https://www.anthropic.com/research/multi-agent-research-system)，同日读取正文：orchestrator-worker、90.2%、4 倍／15 倍 token、适用条件、规模经验与评测方法。
