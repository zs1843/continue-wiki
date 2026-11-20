---
title: 检索的权限与更新：过滤、增量与失效
slug: retrieval-permissions-updates
status: published
order: 60
updated: "2026-11-20"
mindmap:
  - label: "权限过滤要在进入上下文之前"
    heading: "权限过滤要在检索前"
  - label: "索引更新不是实时的"
    heading: "索引更新有延迟"
  - label: "删除与失效要和写入一起设计"
    heading: "删除与失效要一起设计"
  - label: "权限变化要触发重新索引"
    heading: "权限变化要能重新索引"
---

**权限过滤** 决定一次检索能返回哪些文档；**增量更新** 决定资料变化后索引多久跟上。系统上线后，这两项设计是否有效会直接影响资料的安全性和时效性。

## 权限过滤要在检索前

OWASP（一个开放的 Web 与应用安全社区组织）的敏感信息泄露条目建议按最小权限限制数据访问，并限制模型可访问的外部数据源；同时指出，写在系统提示里的数据限制可能被绕过，不能当作访问控制。[1]

因此过滤应发生在检索层：每篇文档带访问控制信息（用户、组、租户、可见范围），查询时把当前身份作为过滤条件，而不是先召回再让模型忽略。多租户场景的隔离设计见[数据隔离](/notes/sensitive-data-isolation/)。

## 索引更新有延迟

Elasticsearch 的近实时文档说明：文档写入后约 1 秒内可被搜索到；refresh 把内存缓冲写成新的 segment（索引中一个可被单独搜索的小文件段）并打开，不需要完整 commit；默认每秒 refresh，但只对过去 30 秒内至少收到一次搜索请求的索引执行；可以用 refresh interval、请求参数或显式 `_refresh` 控制。[2]

这意味着“写入成功”不等于“检索可见”。对需要立即一致的场景，要么显式 refresh，要么在应用层合并刚写入的内容，而不是假设索引已经更新。

## 删除与失效要一起设计

资料会删除、过期、改权限。索引层需要能表达这些状态，常见做法是：

- 保留 `updated_at`、`version` 与 `deleted` 标记，查询时过滤掉失效版本。
- 删除文档时同步删除向量与关键词索引项，而不是只删原文。
- 对缓存与重排结果设置失效时间，避免旧权限或旧内容被继续使用。

这些做法是工程归纳，不是某个规范的强制要求。要点是删除必须覆盖所有副本：原文、索引、向量、缓存与日志。

## 权限变化要能重新索引

权限变化往往不改变文档内容，因此不会触发重新嵌入。但如果索引项里存的是旧的访问控制信息，过滤就会出错。权限系统需要能把变更事件传给索引侧，触发该文档的元数据更新。

更彻底的变化，例如更换嵌入模型或切分策略，需要重建整个索引；不同版本的索引可以并存，用别名切换，避免重建期间不可用。

## 边界

- 过滤条件依赖身份信息的准确性，身份解析错误会让权限过滤形同虚设。
- 加密或脱敏字段即使被检索到，也不应进入模型上下文；过滤应在更早的层完成。
- 近实时延迟是搜索引擎的行为，不同实现的时效不同，不能直接套用。
- 增量更新与权限同步都需要监控：索引落后或权限未同步，往往不会立刻报错。

## 参考

1. OWASP Gen AI Security Project，[LLM02:2025 Sensitive Information Disclosure](https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/)，正文据项目仓库 [Markdown 原文](https://raw.githubusercontent.com/OWASP/www-project-top-10-for-large-language-model-applications/main/2_0_vulns/LLM02_SensitiveInformationDisclosure.md) 读取，2026-11-19：最小权限、限制数据源与系统提示限制不可靠。
2. Elastic，[Near real-time search](https://www.elastic.co/guide/en/elasticsearch/reference/current/near-real-time.html)，2026-11-19 读取全文：刷新、可见延迟与 30 秒规则；删除、重索引与缓存失效为整理时的工程归纳。
