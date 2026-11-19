---
title: 行业案例：让环境可读，把生成与评估分开
slug: industry-harness-cases
status: published
order: 50
updated: "2026-11-19"
mindmap:
  - label: "代码生成依赖可操作的工程环境"
    heading: "环境可读性"
  - label: "生成与评估分离，先约定完成标准"
    heading: "独立评估与迭代契约"
  - label: "上下文重置与压缩有不同代价"
    heading: "跨会话接续"
---

书中第 4.2–4.3 节用行业实践讨论 Harness 的作用。理解这些案例时，应保留实验条件与实现细节；下面结合原始报告提炼三项机制，不把单个团队结果当成所有项目的效果保证。[1]

## 环境可读性

OpenAI 的实验报告描述：团队将应用界面、日志和指标暴露给 Agent，并按工作区启动独立实例，方便重现问题与验证改动；仓库中的短入口文件负责指向详细知识。[2]

这里的**可读性**是 Agent 能取得、理解并使用任务所需的工程信息。只提供模型和一句高层目标，并不等于已经准备好可靠执行的条件。

## 独立评估与迭代契约

Anthropic 的报告将规划、生成和评估分为不同角色，并在每轮实现前协商迭代契约，明确交付内容与验证方式；评估者会实际操作应用、检查接口和数据状态，再给出反馈。[3]

**独立评估**减少生成者自评的偏宽松倾向，但评估者仍是可能出错的模型，不能只靠角色名称获得客观性。**迭代契约**则把较高层的产品要求落实为本轮可以检查的完成条件。

## 跨会话接续

报告区分上下文压缩与重置：压缩保留会话连续性，重置依靠交接材料让新会话继续；是否需要重置，会随模型行为与任务条件变化。[3] 因而应选择适合当前问题的策略，不能把某个模型上的做法视为永久架构要求。

这三个机制分别连接[仓库知识](/notes/repository-constraints/)、[评测与反馈](/notes/harness-engineering/)和[上下文工程](/notes/context-engineering/)。

## 参考

1. 张建飞，《Harness工程实战：从零开始驾驭AI软件工程》，实际核对第 4.2、4.3 节开头及相邻案例分析页面。下述实现机制以原始报告为准，不复述未核对的效果数字。
2. Ryan Lopopolo，OpenAI，[Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)，2026-02-11，Increasing application legibility、Repository knowledge。
3. Prithvi Rajasekaran，Anthropic，[Harness design for long-running application development](https://www.anthropic.com/research/harness-design-long-running-apps)，2026-03-24，Why naive implementations fall short、The architecture。
