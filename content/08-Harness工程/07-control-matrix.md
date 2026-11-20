---
title: 控制矩阵：指导、检测与执行方式
slug: harness-control-matrix
status: published
order: 70
updated: "2026-11-20"
mindmap:
  - label: "指导在行动前，检测在行动后"
    heading: "控制发生在什么时候"
  - label: "计算式规则与推断式判断"
    heading: "控制由什么执行"
  - label: "执行方式不等于阻断强度"
    heading: "怎样使用这个矩阵"
---

**控制矩阵**把控制时机与执行方式分开，帮助选择合适的 Harness 机制。书中第 4.4 节提及这一主题；这里的具体定义依据 Birgitta Böckeler 的一手文章。[1]

## 控制发生在什么时候

**Guide（指导）** 在行动前提供方向，**Sensor（检测机制）** 在行动后检查结果。前者减少偏差发生的机会，后者让偏差可被发现并参与修正。

## 控制由什么执行

**计算式控制（Computational）** 通过程序规则执行；**推断式控制（Inferential）** 依靠模型作语义判断。将执行方式与控制时机组合，就得到表中的四种情况：[1]

| | 行动前指导 | 行动后检测 |
| --- | --- | --- |
| 计算式 | 生成固定结构的脚手架脚本 | 类型检查、结构测试 |
| 推断式 | 编码约定、任务方法说明 | 模型审查、语义评判 |

## 怎样使用这个矩阵

例如，模块边界既可以先通过说明提示，也可以在改动后用结构测试检查。两种做法可以互相补充。[1]

执行方式不等于阻断强度：测试仅报告结果还是阻止合并，取决于接入方式；模型作出的判断也可以被流程用作拦截信号，但并不会因此变成确定性结论。一个 Skill 还可能同时包含说明和脚本，不能只按文件名分类。

[套件选型](/notes/harness-kit-selection/)解释如何根据偏差选机制；[控制闭环](/notes/harness-control-loop/)说明检测结果怎样进入下一步行动。

## 参考

1. Birgitta Böckeler，[Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html)，2026-04-02，Feedforward and Feedback、Computational vs Inferential。矩阵为基于原文的归纳；执行方式与阻断强度的区别为解释性分析。本次原书第 4.4 节显示省略内容，未将这张表冒充原书逐项转述。
