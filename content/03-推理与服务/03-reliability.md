---
title: 推理可靠性：超时、重试与降级
slug: inference-reliability
status: published
order: 30
updated: "2026-11-20"
mindmap:
  - label: "只重试瞬时故障"
    heading: "只重试瞬时故障"
  - label: "超时值应从下游延迟推导"
    heading: "超时按下游延迟定"
  - label: "重试会在链路上放大流量"
    heading: "重试会放大流量"
  - label: "熔断与降级用来止损"
    heading: "用熔断与降级止损"
---

**推理可靠性**关注调用失败后怎样处理。模型服务可能超时、限流、返回错误或短暂不可用，需要按故障类型选择重试、超时、熔断与降级，增加控制措施本身并不保证更可靠。

## 只重试瞬时故障

Azure 的重试模式建议只重试瞬时故障，例如网络抖动或短暂不可用；参数错误、鉴权失败这类确定性错误重试没有意义。[1] 重试可以立即执行、固定延迟或递增延迟，常用指数退避并设置上限。[1]

重试安全的前提是操作**幂等**：同一个请求执行一次与执行多次结果相同。读取类请求通常天然幂等；扣款、发消息、创建工单这类操作需要幂等键或去重记录，否则重试可能造成重复副作用。

## 超时按下游延迟定

AWS（Amazon Web Services）的构建者文库建议连接与请求都设置超时，并根据下游服务的延迟分布来定，避免随意设定一个固定值；文中给出的思路是让极少数正常请求被误判为超时（例如 0.1% 对应 p99.9）。[2]

没有超时，故障会以挂起的形式向上传播，占满连接与线程；超时太短，则会把正常慢请求变成错误，引发不必要的重试。超时值需要随下游性能变化定期复核。

## 重试会放大流量

重试是“自私”的：每个调用方都重试，故障期间流量会成倍增加。AWS 举了一个极端例子：5 层调用、每层重试 3 次，最坏会放大到 243 倍。[2]

控制手段包括：只在低层做一次重试、指数退避加随机抖动、设置重试上限，以及用令牌桶（按固定速率发放令牌，令牌用完就拒绝新请求）限制总请求速率。[2] 抖动的作用是把重试时刻打散，避免同一时刻集中重放。

## 用熔断与降级止损

熔断器有三种状态：[3]

- **Closed**：正常放行，统计失败；超过阈值转为 Open。
- **Open**：立即失败，不再调用下游，并开始计时。
- **Half-Open**：计时结束后放少量试探请求；连续成功回到 Closed，任一失败回到 Open。

Open 状态可以返回默认值或缓存结果，实现降级；但降级要有业务含义，不能把“服务不可用”伪装成“没有数据”。[3]

熔断与重试组合时，调用方要能识别熔断异常，避免对已经熔断的服务继续重试。[3] AWS 也提醒，熔断器不容易测试，可能延长恢复时间，常与令牌桶限流一起使用。[2]

## 把幂等写进接口

Agent 的工具调用可能产生副作用，因此重试还要考虑操作是否已经执行。设计工具时，让写操作接受幂等键、把“创建”与“查询”分开、在重试前检查状态，比事后补偿更可靠。相关权限边界见[过度自主](/notes/excessive-agency/)。

## 边界

- 重试与熔断只处理调用层故障，不能修复模型回答错误。
- 降级返回的默认值可能被下游当成真实结果，需要标记来源与时效。
- 超时、重试与限流参数要跟着流量与下游容量调整，不能一次设定长期不变。

## 参考

1. Microsoft Azure Architecture Center，[Retry pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/retry)，2026-11-19 读取全文：瞬时故障、重试策略、幂等与熔断衔接。
2. AWS Builders' Library，[Timeouts, retries, and backoff with jitter](https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter)，同日读取 Timeouts、Retries、Jitter 与结论前正文：超时设定、重试放大与令牌桶。
3. Microsoft Azure Architecture Center，[Circuit Breaker pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker)，同日读取全文：三态、失败阈值、降级与组合使用。
