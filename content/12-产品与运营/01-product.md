---
title: AI 产品形态与交互：从对话到委托
slug: ai-product-interaction
status: published
order: 10
updated: "2026-11-20"
mindmap:
  - label: "先判断该自动化还是增强"
    heading: "自动化还是增强"
  - label: "心智模型要讲清能做什么"
    heading: "心智模型要讲清边界"
  - label: "错误与置信度要可行动"
    heading: "错误与置信度怎样呈现"
  - label: "上线后继续观察真实使用"
    heading: "上线后继续观察"
---

**AI 产品形态** 决定模型在任务里扮演什么角色：替用户做完、和用户一起做，还是只在旁边提示。如果产品形态与任务不合适，即使模型能力很强，也可能被误用或弃用。

## 自动化还是增强

Google 的 People + AI Guidebook 给出一个判断框架：缺少知识或能力、任务枯燥重复或危险时，适合自动化；用户享受任务本身、需要为结果负责、风险高、偏好难以表达时，适合增强。[1]

它也提醒，AI 不是默认选项：规则或启发式可能同样好；需要可预测、完全透明、极低成本或极高价值的任务，未必适合用 AI。[1]

## 心智模型要讲清边界

用户怎样理解系统，会影响他们怎样使用它。产品需要分阶段说明：能做什么、不能做什么、会怎样变化与改进；如果使用拟人化表达，要明确它不是人。[2]

错误的心智模型会导致两种失败：把不该托付的任务交出去，或者因为一次失败就完全弃用。失败时提供非 AI 的默认路径，可以避免用户困在错误中。[2]

微软 HAX（Human-AI eXperience）工具包把这类建议整理成 18 条准则，覆盖初次使用、使用中、出错与长期使用四个阶段，依据其二十多年的人机交互研究。[3]

## 错误与置信度怎样呈现

Guidebook 把错误分成两类：上下文错误（系统按预期工作，但对情境的假设错了）与能力不足（failstate）；还有一类后台错误需要专门的测试与质量保障。[4] 同一行为在不同期待下可能是成功也可能是失败，文中用 60% 可用率举例说明这一点。[4]

置信度不是越精确越好：不可行动或容易误导时，不展示可能更好；可以展示分类、候选列表或数值，数值示例用了 80%。[5] 用户对概率的理解差异很大，呈现方式需要测试。

失败路径要给出情境与下一步，而不只是报错；高风险场景先把替代方案确认安全，再交接给人工。[4]

## 上线后继续观察

Guidebook 建议上线后持续监测新功能的错误，渠道包括客服、社交媒体、产品指标、问卷与用户研究。[4] 它还给出阈值监控的示例：拒绝率超过 20% 时检查模型；下载后 60% 不使用则重新审视营销；打开但只有 25% 完成则访谈用户。[1] 这些是示例阈值，不是通用标准。

## 边界

- 本文讨论的是设计判断，不是合规标准；具体行业要求另见[成本、上线与治理](/notes/cost-launch-governance/)。
- 自动化程度越高，越需要权限与审批设计，参见[过度自主](/notes/excessive-agency/)。
- 交互层的解释不能弥补系统本身的错误；回答质量仍取决于检索、模型与评估。

## 参考

1. Google PAIR，[People + AI Guidebook：User Needs](https://pair.withgoogle.com/chapter/user-needs/)，2026-11-19 读取全章：自动化与增强的判断、AI 不适用的条件、阈值监控示例。
2. 同上，[Mental Models](https://pair.withgoogle.com/chapter/mental-models/)：分阶段说明能力与边界、拟人化提示、非 AI 路径。
3. Microsoft，[HAX Toolkit: AI Guidelines](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/)，2026-11-19 读取：18 条准则与四个阶段。
4. Google PAIR，[Errors and Graceful Failure](https://pair.withgoogle.com/chapter/errors-failing/)：错误分类、失败路径与持续监测。
5. Google PAIR，[Explainability and Trust](https://pair.withgoogle.com/chapter/explainability-trust/)：置信度的展示条件与形式。
