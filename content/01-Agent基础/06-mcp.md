---
title: MCP：连接外部能力
slug: mcp
status: published
order: 60
updated: "2026-11-17"
mindmap:
  - label: "Host / Client / Server"
    heading: "三个角色"
  - label: "initialize：版本与能力协商"
    heading: "初始化发现与调用"
  - label: "工具发现 tools/list"
    heading: "工具怎样进入应用"
  - label: "工具调用 tools/call"
    heading: "工具怎样进入应用"
---

**MCP（Model Context Protocol，模型上下文协议）** 是 AI 应用与外部服务交换上下文和能力的开放协议。它规定宿主、客户端与服务器如何连接，并通过协议提供工具、资源和提示模板等能力。[1]

## 三个角色

- **Host（宿主）** ：承载 AI 应用，管理客户端、上下文以及权限决策。
- **Client（客户端）** ：由宿主创建，维护与某个服务器的连接，处理协议消息与能力协商。
- **Server（服务器）** ：提供具体工具、资源或提示模板，可以是本地进程或远程服务。[1]

工具、资源与提示模板是不同能力：分别涉及可执行操作、可读取材料与可复用的提示内容，不能全部等同于工具调用。

## 工具怎样进入应用

客户端可以通过 `tools/list` 发现服务器公开的工具，通过 `tools/call` 发起调用。每个工具有名称、描述和输入 Schema 等信息。[2]

例如，笔记服务可以公开搜索工具。MCP 负责应用如何发现、调用它；模型怎样选择搜索词，属于 [Function Calling 与 Agent](/notes/agent-and-function-calling/)一侧的处理过程。连接成功也不代表有权读取所有笔记，权限仍由宿主和服务落实。

[Skill](/notes/skills/)可以描述一类任务的做法，MCP 可以提供完成任务需要连接的外部能力，二者能够配合使用。

## 初始化、发现与调用

下面以天气查询为例，把一次简化交互分成初始化、发现和调用三个环节。左侧是 OpenCode 宿主中的 MCP 客户端，右侧是提供天气查询工具的 MCP 服务器。

[![MCP 天气查询流程：客户端与服务器完成初始化和能力协商，发现工具、提示模板或资源，再调用 get_weather 获取结果。](/images/mcp-interaction-stages.svg)](/images/mcp-interaction-stages.svg)

*MCP 交互流程示意（据所提供示意图重绘，接口名称按 2025-11-25 版规范核对）。点击图片可单独打开，放大查看。*

初始化时，客户端发送 `initialize`，服务器返回协商的协议版本、自身能力和信息；客户端再发送 `notifications/initialized`，表示初始化完成。[3]

能力发现需要按服务器已声明的能力选择：`tools/list` 返回工具定义，`prompts/list` 和 `resources/list` 返回提示模板或资源的元数据列表。获取模板内容、读取资源内容分别使用 `prompts/get` 与 `resources/read`。[2][4][5]

调用工具时，客户端通过 `tools/call` 传入工具名及参数，服务器返回执行结果。图中的 `get_weather` 是天气查询示例工具名。[2]

## 参考

1. MCP，[Architecture](https://modelcontextprotocol.io/specification/2025-11-25/architecture)，2025-11-25 版，Core Components。
2. MCP，[Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)，同版本，工具发现、定义与调用。本文固定参考此版本。
3. MCP，[Lifecycle](https://modelcontextprotocol.io/specification/2025-11-25/basic/lifecycle)，同版本，初始化请求、响应与 `notifications/initialized` 通知。
4. MCP，[Prompts](https://modelcontextprotocol.io/specification/2025-11-25/server/prompts)，同版本，提示模板的列举与获取。
5. MCP，[Resources](https://modelcontextprotocol.io/specification/2025-11-25/server/resources)，同版本，资源元数据列举与内容读取。
