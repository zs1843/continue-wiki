---
title: ReAct：推理与行动的交替
slug: react
status: published
order: 40
updated: "2026-11-17"
mindmap:
  - label: "thought 不改变环境"
    heading: "推理与行动怎样交替"
  - label: "search、lookup、finish 动作"
    heading: "一个简化示例"
  - label: "CoT 更易产生幻觉"
    heading: "与-cot-和-act-的对比"
  - label: "重复生成容易陷入循环"
    heading: "边界与失败模式"
---

**ReAct（Reasoning and Acting）** 让语言模型把推理轨迹与任务动作交替生成：Thought 写下当前判断，Action 调用外部能力，Observation 返回结果，再据此决定下一步。[1] 它是一套提示与轨迹的组织方式，不是某个模型接口或框架独有的能力。

## 推理与行动怎样交替

按论文的表述，Agent 在时刻 t 根据上下文 c（此前所有动作与观察）选择动作，外部动作空间为 A。[1] ReAct 把动作空间扩展为 A ∪ L，其中 L 是语言空间：落在 L 里的输出称为 thought 或推理轨迹，它只推理当前上下文、更新下文，不改变外部环境，因此不会产生 observation；只有落在 A 里的动作才与环境交互并拿到反馈。

thought 承担的工作在论文里分为几类：拆解问题并制定计划、从观察中抽取关键信息、补充常识或算术、改写检索词、判断信息不足、汇总最终答案。[1] 提示方式是给出若干条人工编写的「thought → action → observation」轨迹作为少样本示例——HotpotQA 用 6 条、FEVER 用 3 条，论文注明示例再多并不提升效果。[1]

thought 出现的密度随任务而变。知识推理类任务基本每一步都夹一条 thought；交互决策类任务动作步数多、奖励稀疏，thought 只在关键位置稀疏出现，由模型自行决定出现时机。[1]

## 一个简化示例

论文为维基百科检索设计了三个动作：`search[entity]` 返回实体的前几句（找不到时给相似实体），`lookup[string]` 返回页面中包含该字符串的下一句，`finish[answer]` 结束并提交答案。[1] 下面的轨迹是按这套格式自拟的示意，不是论文中的案例：

```text
问题：某位作者获得第一个奖项的那年，他出版的第二本书叫什么？
Thought 1：先查作者页，确认第一个奖项的年份。
Action 1：search[某作者]
Observation 1：作者生平的前几句，含获奖年份与作品列表。
Thought 2：年份已确认，接下来查那一年之后出版的第二本书。
Action 2：lookup[作品]
Observation 2：包含作品名的段落，给出出版顺序。
Thought 3：两段信息足够，整理答案。
Action 3：finish[书名]
```

这个例子里，观察值决定下一步检索词。如果 Observation 没有出现需要的信息，Thought 应当改写检索方式；直接凭想象补答案就容易引入幻觉，这也是论文对照 CoT 时强调的差别。

## 与 CoT 和 Act 的对比

CoT（Chain-of-Thought）只在内部生成推理，不接触外部环境；Act 只生成动作，不显式推理；ReAct 把两者交替起来。[1] 论文用 PaLM-540B 在 HotpotQA（EM）和 FEVER（准确率）上做了对照：[1]

| 方法 | HotpotQA | FEVER |
| --- | --- | --- |
| Standard | 28.7 | 57.1 |
| CoT | 29.4 | 56.3 |
| CoT-SC（21 次采样投票） | 33.4 | 60.4 |
| Act | 25.7 | 58.9 |
| ReAct | 27.4 | 60.9 |
| ReAct → CoT-SC | 35.1 | 62.0 |
| CoT-SC → ReAct | 34.2 | 64.6 |

这组数字说明两件事。需要核对具体事实的任务（FEVER）上，ReAct 超过 CoT，因为判断「支持／反驳」常常只差一句原文；HotpotQA 上 ReAct 略低于 CoT，却是对 Act 的提升。[1] 把两者按启发式组合最好：ReAct 步数用尽就退回 CoT-SC，CoT-SC 多数票不够集中就退回 ReAct。[1]

在 ALFWorld 和 WebShop 两个交互任务上，只用一到两条示例的 ReAct，成功率分别比用 10³～10⁵ 条轨迹训练的模仿学习或强化学习基线高 34 和 10 个百分点。[1] 这两项结果说明：在动作空间复杂、需要长程交互的任务里，稀疏推理也能显著改善探索。

## 边界与失败模式

论文人工标注了 HotpotQA 上的成功与失败类型。在 ReAct 的失败样本中，推理错误占 47%、检索结果为空或无用占 23%、幻觉为 0%；CoT 的失败样本里幻觉占 56%。[1] 换句话说，行动换来了「有据可查」，代价是轨迹结构更死。论文还记录了一个 ReAct 特有的错误模式：模型反复生成上一步的 thought 与 action，走不出循环，作者怀疑与贪心解码有关。[1]

几点适用范围：

- 小模型直接提示 ReAct 往往最差。PaLM-8B/62B 上提示 ReAct 不如 CoT，但用 3000 条正确轨迹微调后反超，超过 540B 的提示结果。[1] 这意味着 ReAct 依赖模型同时具备推理能力和按格式行动的能力。
- 动作空间决定上限。论文刻意使用较弱的维基百科接口（只能按实体名取前几句），检索失败会带偏后续推理，这也是它与 CoT 组合的动机。[1]
- 轨迹会写入上下文，token 与延迟随步数增长。步数上限、提前退出和失败回退属于工程必需项，不是提示词细节。
- 论文演示了人工在轨迹中修改 thought 来纠正 Agent 行为，说明推理轨迹是可读、可干预的中间产物。[1]

## 和相邻概念的关系

ReAct 只规定「推理与行动怎么交替」，不规定动作怎样交给模型。动作通常由 [工具 Schema](/notes/tool-schema/) 描述，执行交给 [Function Calling](/notes/agent-and-function-calling/)，多轮运行和停止条件由 [Agent Loop](/notes/agent-loop/) 组织。轨迹累积后如何取舍，属于 [上下文工程](/notes/context-engineering/) 的问题；先规划后执行与边想边做的取舍，可与 [计划模式](/notes/planning-and-superpowers/)对照。

## 参考

1. Shunyu Yao 等，[ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629v3)，arXiv v3（ICLR 2023 正式版），2023-03-10：第 2 节方法与动作空间、第 3 节 PaLM-540B 对照结果与失败模式标注、第 4 节 ALFWorld 与 WebShop 结果。
