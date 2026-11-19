---
title: 工具 Schema
slug: tool-schema
status: published
order: 20
updated: "2026-11-17"
mindmap:
  - label: "字段类型与必填项"
    heading: "一个简化的参数定义"
  - label: "禁止额外字段"
    heading: "一个简化的参数定义"
  - label: "Schema 校验与业务授权有不同职责"
  - label: "name、description 与 input_schema 分工"
    heading: "工具定义在接口里的样子"
---

**工具 Schema**是对工具输入结构的机器可读描述，用来说明参数的字段、类型、必填项和取值限制。完整的工具定义通常还包括名称与用途说明。很多接口采用 JSON Schema 描述输入，但完整定义的外层格式由具体 API 或协议决定。[1][2]

模型根据这些说明生成参数，执行程序再验证参数并运行工具。Schema 解决的是输入契约问题，数据访问和业务权限仍需要应用另外检查。

## 一个简化的参数定义

假设笔记搜索工具接受一个关键词，可以用下面的 JSON Schema 描述输入；这只是参数部分，不是完整的 API 请求：

```json
{
  "type": "object",
  "properties": {
    "query": {
      "type": "string",
      "description": "用于搜索笔记的关键词"
    }
  },
  "required": ["query"],
  "additionalProperties": false
}
```

这里 `query` 必须出现，值必须是字符串，也不允许出现额外字段。仅在 `properties` 中声明一个字段，并不意味着它是必填项。[1]

另一个容易混淆的地方是 `default`：它属于注解，JSON Schema 验证过程不会自动用它补上缺失字段。[3]

[Function Calling](/notes/agent-and-function-calling/)使用工具定义来表达调用；[MCP](/notes/mcp/)则规定服务怎样公开工具定义并接收调用。

## 工具定义在接口里的样子

参数 Schema 之上还有一层工具定义。Claude 的接口把 `name`、`description` 与 `input_schema` 放在一起，下面取自官方工具调用示例：[4]

```json
{
  "name": "get_weather",
  "description": "Get the current weather for a given location.",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": {
        "type": "string",
        "description": "City and state, e.g. San Francisco, CA"
      }
    },
    "required": ["location"]
  }
}
```

三项分工不同：`name` 是调用时回传的标识；`description` 决定模型在什么情况下想到这个工具，也影响它怎么填参数；`input_schema` 约束输入。MCP 的 `tools/list` 返回的工具描述使用 `name`、`description`、`inputSchema`，字段名大小写不同，作用一致。[2]

模型生成参数后仍需应用校验并执行。Schema 只描述输入，不表达权限与副作用；对会改动数据的工具，应用要在执行前检查调用者是否有权执行这次操作。

## 参考

1. JSON Schema，[Object](https://json-schema.org/understanding-json-schema/reference/object)，Properties、Required Properties、Additional Properties。
2. MCP，[Tools](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)，2025-11-25 版，工具定义中的 `name`、`description`、`inputSchema`。
3. JSON Schema，[Annotations](https://json-schema.org/understanding-json-schema/reference/annotations)，`default` 的语义。
4. Anthropic，[Tool use with Claude](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)，How tool use works 中的工具定义示例；2026-11-17 读取。
