---
title: 布尔值
---

布尔值代表 “真” 和 “假” 两个状态。“真” 用关键字 `true` 表示，“假” 用关键字 `false` 表示。布尔值只有这两个值

下列运算符会返回布尔值：

- 前置逻辑运算符： `!`
- 相等运算符：`===`，`!==`，`==`，`!=`
- 比较运算符：`>`，`>=`，`<`，`<=`

如果 JavaScript 预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值。转换规则是除了下面六个值被转为 `false`，其他值都视为 `true`

> 自身一个，字符串一个，数值两个，还有两个原始类型

- `false`
- `""` 或 `''`（空字符串）
- `0`
- `NaN`
- `undefined`
- `null`