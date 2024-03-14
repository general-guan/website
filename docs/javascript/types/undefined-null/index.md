# undefined 和 null

## 简介

`null` 表示一个 “空” 的对象

`undefined` 表示未定义

含义非常相似，在 `if` 语句中，它们都会被自动转为 `false`，相等运算符（`==`）甚至直接报告两者相等

```jsx
if (!undefined) {
  console.log('undefined is false');
}
// undefined is false

if (!null) {
  console.log('null is false');
}
// null is false

undefined == null;
// true
```

### 不同点

`null` 转为数值时为 `0` ，`undefined` 转为数值时为 `NaN`
