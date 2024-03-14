# 概述

## 简介

JavaScript 的数据类型，共有八种

1. 字符串（string）：文本（比如 `Hello World`）
2. 数值（number）：整数和小数（比如 `1` 和 `3.14`）
3. 布尔值（boolean）：`true`（真）和 `false`（假）
4. `undefined` ：表示 “未定义” 或不存在
5. `null` ：表示空值
6. 对象（object）：各种值组成的集合
7. Symbol：表示独一无二的值
8. BigInt：表示整数，没有位数的限制，任何位数的整数都可以精确表示

其中，字符串、数值、布尔值、Symbol、BigInt 这五种类型，合称为原始类型（primitive type）的值，即它们是最基本的数据类型，不能再细分了

对象则称为合成类型（complex type）的值，因为一个对象往往是多个原始类型的值的合成，可以看作是一个存放各种值的容器

至于 `undefined` 和 `null`，一般将它们看成两个特殊值

对象（object）又可以分成三个子类型

- 狭义的对象（object）
- 数组（array）
- 函数（function）

## 判断数据的类型

JavaScript 有三种方法，可以确定一个值是什么类型

- `typeof` 运算符
- `instanceof` 运算符
- `Object.prototype.toString` 方法

### typeof

```js
typeof 123; // "number"
typeof '123'; // "string"
typeof false; // "boolean"
typeof Symbol(); // "symbol"
typeof BigInt(123); // "bigint"

typeof undefined; // "undefined"
typeof null; // "object"

typeof {}; // "object"
typeof []; // "object"
typeof window; // "object"
typeof function f() {}; // "function"
```
