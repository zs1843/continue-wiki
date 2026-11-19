---
title: 计划模式
slug: plan-mode
status: published
order: 10
updated: "2026-11-17"
mindmap:
  - label: "先分析，不改动源码"
  - label: "提示之外还要权限层拦截"
    heading: "原理与实现"
  - label: "批准计划是一次状态切换"
    heading: "一次会话怎么走"
  - label: "是工作模式，不是方法论"
    heading: "边界与代价"
---

**计划模式（Plan Mode）** 是编程 Agent 提供的一种工作模式：模型先阅读代码、运行只读命令、提出实施计划，在用户批准之前不修改源码。[1]

它属于权限模式的一种，与自动执行、逐条确认等模式并列；是否提供、如何进入取决于具体产品。下面以 Claude Code 的产品说明为例，具体行为以对应版本为准。[1]

## 原理与实现

计划模式不是一个单独的 API，也不靠模型「自觉」。它通常由三层配合：[1]

1. **指令层**：宿主的系统提示声明当前处于计划模式，要求先研究、再给计划、不修改文件。它影响模型倾向，但只是文字约束。
2. **权限层**：宿主在执行工具调用前检查。对文件写入类工具直接拒绝；对 shell 命令按策略处理——只读命令放行，其余交给分类器或询问用户。
3. **状态层**：模式是会话状态，而不是每次调用的参数。批准计划会退出计划模式并切到另一个权限模式，想再规划要重新进入。

三层缺一不可：只有提示词，模型「忘了」就能越界；只有权限层而没有计划产物，用户没有可审的东西；只有状态和审批而没有拦截，审批只是形式。下面的示意代码展示拦截点在哪儿，不是 Claude Code 的实现：

```ts
// 说明性伪代码：展示工具调用被拦截的位置
type Mode = 'default' | 'auto' | 'plan';

declare const autoModeAvailable: boolean;

const WRITE_TOOLS = new Set(['Edit', 'Write', 'NotebookEdit']);

// 真实实现需要解析 shell，处理管道、重定向与变量展开，这里只做示意
function isReadOnlyShell(command: string): boolean {
  return /^(ls|cat|rg|grep|head|tail|wc|git (status|diff|log))\b/.test(command);
}

function gate(mode: Mode, tool: string, input: { command?: string }) {
  if (mode !== 'plan') return 'allow';
  if (WRITE_TOOLS.has(tool)) return 'deny';
  if (tool === 'Bash') {
    if (isReadOnlyShell(input.command ?? '')) return 'allow';
    // 自动模式可用时交给分类器审查，否则询问用户
    return autoModeAvailable ? 'classify' : 'ask';
  }
  return 'allow';
}
```

模式切换同样是一段显式逻辑，批准计划后才进入执行：

```ts
let mode: Mode = 'default';

// 用户批准计划：退出计划模式，切到自动执行或逐条确认
function onPlanApproved(next: 'auto' | 'default') {
  mode = next;
}

// 想再次规划，必须重新进入计划模式
function enterPlanMode() {
  mode = 'plan';
}
```

计划产物本身是模型的自由文本，不是固定 schema；产品可以把它直接展示，也可以存成文件再在编辑器里修改。[1] 因此「计划」与「规范」不同——它没有强制的字段和验收标准，靠人审。

## 一次会话怎么走

进入计划模式有三种方式：会话内按 `Shift+Tab` 切换、在单条请求前加 `/plan`，或以 `claude --permission-mode plan` 启动。[1] 如果希望项目默认以计划模式开始，可以在 `.claude/settings.json` 里设置：

```json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

进入后，模型读文件、跑只读命令、写计划；计划完成后产品给出处理选项：批准并进入自动执行、批准后逐条确认编辑，或继续计划并说明要改什么。[1] 批准后会话退出计划模式，切到对应的权限模式开始编辑；想再规划，需要重新切回。

计划本身可以在编辑器里修改（`Ctrl+G`），说明它是可审查的中间产物，而不是最终答案。[1]

## 边界与代价

- 计划模式是产品行为，不是通用规范。不同工具的叫法、可用工具与拦截范围不同，跨产品不能按名称假设一致。[1]
- 拦截在权限层执行，但只约束「改动」不约束「读取」：探查仍会产生命令与输出，计划质量取决于模型读到了什么、是否覆盖关键路径。
- 多一次审批就多一次往返；任务简单时，直接执行再检查往往更快。
- 在允许绕过权限的交互会话里，计划模式的拦截可以被配置绕过，不能把它当成安全边界。[1]
- 提示层不是保证。若宿主没有权限层，只在系统提示里写「不要编辑」，模型仍可能修改文件。

## 和相邻概念的关系

计划模式解决「何时从分析转入执行」，不规定方法。它和 [SDD](/notes/spec-driven-development/) 的区别在于：前者是会话内的工作模式，后者要求把规范贯穿实现与验收，二者可以配合。与 [Superpowers 的对比](/notes/planning-and-superpowers/)单独展开。

它也不替代 [Agent Loop](/notes/agent-loop/) 的运行机制：循环、工具调用与停止条件仍然存在，计划模式只是在开始编辑之前加了一道确认。[上下文工程](/notes/context-engineering/)决定计划阶段能看到哪些材料，[ReAct](/notes/react/) 的边想边做则与它形成对照。

## 参考

1. Claude Code 文档，[Choose a permission mode](https://code.claude.com/docs/en/permission-modes)，Analyze before you edit with plan mode；2026-11-17 读取。产品行为仅对应 Claude Code，其他工具请核对各自说明。
