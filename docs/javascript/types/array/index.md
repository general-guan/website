# 数组

## 定义

数组（array）是按次序排列的一组值。每个值的位置都有编号（从 0 开始），整个数组用方括号表示

```jsx
var arr = ['a', 'b', 'c'];
```

任何类型的数据，都可以放入数组

```jsx
var arr = [
	{ a: 1 },
	[1, 2, 3],
	function () {
		return true;
	},
];

arr[0]; // Object {a: 1}
arr[1]; // [1, 2, 3]
arr[2]; // function (){return true;}
```

## 数组的本质

本质上，数组属于一种特殊的对象。`typeof` 运算符会返回数组的类型是 `object`

```jsx
typeof [1, 2, 3]; // "object"
```

数组的特殊性体现在，它的键名是按次序排列的一组整数（0，1，2...）

```jsx
var arr = ['a', 'b', 'c'];

Object.keys(arr);
// ["0", "1", "2"]
```

由于数组成员的键名是固定的（默认总是 0、1、2...），因此数组不用为每个元素指定键名，而对象的每个成员都必须指定键名。JavaScript 语言规定，对象的键名一律为字符串，所以，数组的键名其实也是字符串。之所以可以用数值读取，是因为非字符串的键名会被转为字符串

```jsx
var arr = ['a', 'b', 'c'];

arr[0]; // 'a'
arr['0']; // 'a'
```

## length 属性

数组的`length`属性，返回数组的成员数量

```jsx
['a', 'b', 'c'].length; // 3
```

JavaScript 使用一个 32 位整数，保存数组的元素个数。这意味着，数组成员最多只有 4294967295 个（232 - 1）个，也就是说 `length` 属性的最大值就是 4294967295

只要是数组，就一定有 `length` 属性。该属性是一个动态的值，等于键名中的最大整数加上 `1`

```jsx
var arr = ['a', 'b'];
arr.length; // 2

arr[2] = 'c';
arr.length; // 3

arr[9] = 'd';
arr.length; // 10

arr[1000] = 'e';
arr.length; // 1001
```

上面代码表示，数组的数字键不需要连续，`length` 属性的值总是比最大的那个整数键大 `1`。另外，这也表明数组是一种动态的数据结构，可以随时增减数组的成员

`length` 属性是可写的。如果人为设置一个小于当前成员个数的值，该数组的成员数量会自动减少到 `length` 设置的值

```jsx
var arr = ['a', 'b', 'c'];
arr.length; // 3

arr.length = 2;
arr; // ["a", "b"]
```

清空数组的一个有效方法，就是将 `length` 属性设为 0

```jsx
var arr = ['a', 'b', 'c'];

arr.length = 0;
arr; // []
```

如果人为设置 `length` 大于当前元素个数，则数组的成员数量会增加到这个值，新增的位置都是空位（`undefined`）

```jsx
var a = ['a'];

a.length = 3;
a[1]; // undefined
```

如果人为设置`length`为不合法的值，JavaScript 会报错

```jsx
// 设置负值
[].length = -1
// RangeError: Invalid array length

// 数组元素个数大于等于2的32次方
[].length = Math.pow(2, 32)
// RangeError: Invalid array length

// 设置字符串
[].length = 'abc'
// RangeError: Invalid array length
```

值得注意的是，由于数组本质上是一种对象，所以可以为数组添加属性，但是这不影响 `length` 属性的值

```jsx
var a = [];

a['p'] = 'abc';
a.length; // 0

a[2.1] = 'abc';
a.length; // 0
```

如果数组的键名是添加超出范围的数值，该键名会自动转为字符串

```jsx
var arr = [];
arr[-1] = 'a';
arr[Math.pow(2, 32)] = 'b';

arr.length; // 0
arr[-1]; // "a"
arr[4294967296]; // "b"
```

## **in 运算符**

检查某个键名是否存在的运算符 `in`，适用于对象，也适用于数组

```jsx
var arr = ['a', 'b', 'c'];
2 in arr; // true
'2' in arr; // true
4 in arr; // false
```

注意，如果数组的某个位置是空位，`in` 运算符返回 `false`

```jsx
var arr = [];
arr[100] = 'a';

100 in arr; // true
1 in arr; // false
```

## for...in 循环和数组的遍历

`for...in` 循环不仅可以遍历对象，也可以遍历数组，毕竟数组只是一种特殊对象

```jsx
var a = [1, 2, 3];

for (var i in a) {
	console.log(a[i]);
}
// 1
// 2
// 3
```

但是，`for...in` 不仅会遍历数组所有的数字键，还会遍历非数字键，所以，不推荐使用 `for...in` 遍历数组

```jsx
var a = [1, 2, 3];
a.foo = true;

for (var key in a) {
	console.log(key);
}
// 0
// 1
// 2
// foo
```

数组的遍历可以考虑使用 `for` 循环或 `while` 循环

```jsx
var a = [1, 2, 3];

// for循环
for (var i = 0; i < a.length; i++) {
	console.log(a[i]);
}

// while循环
var i = 0;
while (i < a.length) {
	console.log(a[i]);
	i++;
}

var l = a.length;
while (l--) {
	console.log(a[l]);
}
```

数组的 `forEach` 方法，也可以用来遍历数组

```jsx
var colors = ['red', 'green', 'blue'];
colors.forEach(function (color) {
	console.log(color);
});
// red
// green
// blue
```

## 数组的空位

当数组的某个位置是空元素，即两个逗号之间没有任何值，我们称该数组存在空位（hole）

数组的空位不影响 `length` 属性。虽然这个位置没有值，引擎依然认为这个位置是有效的

```jsx
var a = [1, , 1];
a.length; // 3
```

需要注意的是，如果最后一个元素后面有逗号，并不会产生空位。也就是说，有没有这个逗号，结果都是一样的

```jsx
var a = [1, 2, 3];

a.length; // 3
a; // [1, 2, 3]
```

数组的空位是可以读取的，返回 `undefined`

```jsx
var a = [, , ,];
a[1]; // undefined
```

使用 `delete` 命令删除一个数组成员，会形成空位，并且不会影响 `length` 属性

```jsx
var a = [1, 2, 3];
delete a[1];

a[1]; // undefined
a.length; // 3
```

数组的某个位置是空位，与某个位置是 `undefined`，是不一样的。如果是空位，使用数组的 `forEach` 方法、`for...in` 结构、以及 `Object.keys` 方法进行遍历，空位都会被跳过

```jsx
var a = [, , ,];

a.forEach(function (x, i) {
	console.log(i + '. ' + x);
});
// 不产生任何输出

for (var i in a) {
	console.log(i);
}
// 不产生任何输出

Object.keys(a);
// []
```

如果某个位置是 `undefined`，遍历的时候就不会被跳过

```jsx
var a = [undefined, undefined, undefined];

a.forEach(function (x, i) {
	console.log(i + '. ' + x);
});
// 0. undefined
// 1. undefined
// 2. undefined

for (var i in a) {
	console.log(i);
}
// 0
// 1
// 2

Object.keys(a);
// ['0', '1', '2']
```

## 类似数组的对象

如果一个对象的所有键名都是正整数或零，并且有 `length` 属性，那么这个对象就很像数组，语法上称为“类似数组的对象”（array-like object）

```jsx
var obj = {
	0: 'a',
	1: 'b',
	2: 'c',
	length: 3,
};

obj[0]; // 'a'
obj[1]; // 'b'
obj.length; // 3
obj.push('d'); // TypeError: obj.push is not a function
```

上面代码中，对象`obj`就是一个类似数组的对象。但是，“类似数组的对象”并不是数组，因为它们不具备数组特有的方法。对象`obj`没有数组的`push`方法，使用该方法就会报错

“类似数组的对象”的根本特征，就是具有 `length` 属性。只要有 `length` 属性，就可以认为这个对象类似于数组。但是有一个问题，这种 `length` 属性不是动态值，不会随着成员的变化而变化

```jsx
var obj = {
	length: 0,
};
obj[3] = 'd';
obj.length; // 0
```

典型的 “类似数组的对象” 是函数的 `arguments` 对象，以及大多数 DOM 元素集，还有字符串

```jsx
// arguments对象
function args() {
	return arguments;
}
var arrayLike = args('a', 'b');

arrayLike[0]; // 'a'
arrayLike.length; // 2
arrayLike instanceof Array; // false

// DOM元素集
var elts = document.getElementsByTagName('h3');
elts.length; // 3
elts instanceof Array; // false

// 字符串
'abc'[1]; // 'b'
'abc'.length; // 3
'abc' instanceof Array; // false
```

上面代码包含三个例子，它们都不是数组（`instanceof` 运算符返回 `false`），但是看上去都非常像数组

数组的 `slice` 方法可以将 “类似数组的对象” 变成真正的数组

```javascript
var arr = Array.prototype.slice.call(arrayLike);
```

除了转为真正的数组，“类似数组的对象” 还有一个办法可以使用数组的方法，就是通过 `call()` 把数组的方法放到对象上面

```javascript
function print(value, index) {
	console.log(index + ' : ' + value);
}

Array.prototype.forEach.call(arrayLike, print);
```

下面的例子就是通过这种方法，在 `arguments` 对象上面调用 `forEach` 方法

```javascript
// forEach 方法
function logArgs() {
	Array.prototype.forEach.call(arguments, function (elem, i) {
		console.log(i + '. ' + elem);
	});
}

// 等同于 for 循环
function logArgs() {
	for (var i = 0; i < arguments.length; i++) {
		console.log(i + '. ' + arguments[i]);
	}
}
```

字符串也是类似数组的对象，所以也可以用 `Array.prototype.forEach.call` 遍历

```javascript
Array.prototype.forEach.call('abc', function (chr) {
	console.log(chr);
});
// a
// b
// c
```

注意，这种方法比直接使用数组原生的 `forEach` 要慢，所以最好还是先将 “类似数组的对象” 转为真正的数组，然后再直接调用数组的 `forEach` 方法

```javascript
var arr = Array.prototype.slice.call('abc');
arr.forEach(function (chr) {
	console.log(chr);
});
// a
// b
// c
```
