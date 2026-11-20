---
title: 遗留系统案例：先保护行为，再逐步替换
slug: legacy-refactoring
status: published
order: 20
updated: "2026-11-20"
mindmap:
  - label: "先识别规则并建立行为基线"
    heading: "局部重构先保护行为"
  - label: "PricingPolicy 显式组织折扣规则"
    heading: "案例首个命中的规则决定折扣"
  - label: "兼容转换与开关支持渐进替换"
    heading: "绞杀者模式保留入口逐步替换"
  - label: "防腐层隔离新旧模型语义"
    heading: "防腐层隔离旧系统的语义"
  - label: "开关回切不等于数据回滚"
    heading: "渐进改造的边界"
---

**棕地项目（Brownfield）** 是在已有系统、数据和兼容关系上继续开发。改造的困难不只在代码结构，还在于确认哪些既有行为必须保留、哪些需要明确改变。书中遗留系统主题及配套订单代码，提供了局部重构和渐进替换两种尺度的案例。[1][2]

## 局部重构：先保护行为

配套材料先要求识别 `LegacyOrderService` 中隐含的领域概念，再为折扣计算建立测试，最后把逻辑提取为 `PricingPolicy` 领域服务，并扩展新的折扣规则。[2]

先弄清系统“现在做了什么”，才能判断怎样调整结构，让后续修改更容易。保留行为的重构应有可比较的基线；若发现原行为本身有错，则应单独说明预期变化，而不是在整理结构时悄悄改变业务语义。

## 案例：首个命中的规则决定折扣

`PricingPolicy` 接收一组折扣规则，逐个匹配，使用第一个命中规则的折扣率计算金额。测试覆盖 VIP、重要客户、普通客户、阈值及规则优先级。[3]

例如，测试中的 VIP 理财客户在金额为 60,000 时使用 8% 的规则；金额恰好为 10,000 的另一个 VIP 场景使用 5% 规则。[3] 这些数字沿用案例测试的业务设定。

这里需要留意匹配顺序：首个命中不等于从所有可用折扣中选最大值。将条件拆为规则对象以后，扩展更方便，但顺序仍是必须验证的业务决定。一个命名清楚的领域服务不会自动消除规则冲突。

## 绞杀者模式：保留入口，逐步替换

**绞杀者模式（Strangler Fig）** 是逐步替换遗留系统的现代化方式，让新实现逐渐承接功能，减少一次性替换的范围与风险。[4]

配套代码在订单处理入口使用 `useNew` 参数选择旧服务或新服务。进入新路径时，转换器先把旧 DTO 转为新 DTO，处理后再转回旧表示；旧路径继续调用 `LegacyOrderService`。[5] 因而调用入口可以保持兼容，内部实现逐步迁移。

这只是该案例的切换与兼容机制，并不等于完整的生产灰度平台。`useNew` 是演示中的请求参数，不能仅凭它就推断系统已有流量分组、审计或自动回滚。

## 防腐层：隔离旧系统的语义

**防腐层（Anti-Corruption Layer，ACL）** 是新旧模型之间的翻译与适配边界。它把遗留系统的数据和调用约定转换成新模型使用的表达，避免新领域逻辑到处依赖旧类、旧字段和旧语义。书中第 9.3.4 节将其用于渐进替换。[6]

例如，旧系统用多个字符串标识订单状态，新模型使用明确的状态类型，可以在边界集中完成转换与异常处理。DTO 转换是实现手段之一；若核心业务仍直接读取旧结构，仅增加一个转换器并不足以形成隔离。

## 渐进改造的边界

新旧路径并存时，需要检查结果是否符合约定，也要检查数据库写入和外部调用等副作用。把入口切回旧路径，只能改变后续请求的处理方向，不能撤销新路径已经写入的数据。

从这个案例可以看到各部分的配合：领域概念帮助确定拆分边界，测试保护关键行为，兼容转换减少外部影响，切换机制控制迁移范围。这些机制配合起来，才支持逐步偿还[架构债](/notes/cognitive-and-architecture-debt/)。[测试反馈](/notes/testing-feedback-loops/)解释了不同检查范围能提供哪些证据。

## 参考

1. 张建飞，《Harness工程实战：从零开始驾驭AI软件工程》，第 9 章“遗留棕地项目”，9.2–9.3 节主题据[出版社公开目录](https://detail.youzan.com/show/goods?alias=2op1clbko20vl1d)核对。
2. 作者仓库快照 `51c6b4b`：[重构任务材料](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter10/prompt.md)。仓库的 `chapter10` 目录与印刷书第 9 章主题对应，不能直接把目录号当作书的章号。
3. 同一快照：[PricingPolicy](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter8/crm-backend/src/main/java/com/harness/crm/domain/order/service/PricingPolicy.java)、[折扣测试](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter8/crm-backend/src/test/java/com/harness/crm/domain/order/LegacyOrderServiceCalculateDiscountTest.java)。静态核对测试场景，未重新运行该 Java 项目。
4. Martin Fowler，[Strangler Fig](https://martinfowler.com/bliki/StranglerFigApplication.html)，2024-08-22，渐进式遗留系统现代化的比喻与方法。
5. 配套仓库同一快照：[OrderController](https://github.com/significantfrank/HarnessEngineering/blob/51c6b4ba5c56a6e3b7c344611f03f0d396acaa4a/chapter8/crm-backend/src/main/java/com/harness/crm/adapter/web/OrderController.java)，`process` 方法中的新旧路径与 DTO 转换。

6. 张建飞，同书[第 9.3.4 节“防腐层”](https://weread.qq.com/web/reader/af832910813abc0c8g010463k14b3246024514bfa6bb1534)，2026-11-19 阅读接口隔离、模型转换与外部依赖边界的相关页面；状态转换为解释性示例。
