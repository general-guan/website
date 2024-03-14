# 对象

## 简介

### 生成方法

什么是对象？简单说，对象就是一组 “键值对”（key-value）的集合，是一种无序的复合数据集合

```jsx
var obj = {
	foo: 'Hello',
	bar: 'World',
};
```

### 键名

对象的所有键名都是字符串（ES6 又引入了 Symbol 值也可以作为键名），所以加不加引号都可以

```jsx
var obj = {
	foo: 'Hello',
	bar: 'World',
};
```

如果键名是数值，会被自动转为字符串

```jsx
var obj = {
	1: 'a',
	3.2: 'b',
	1e2: true,
};

obj['100']; // true
```

如果键名不符合标识名的条件（比如第一个字符为数字，或者含有空格或运算符），且也不是数字，则必须加上引号，否则会报错

```jsx
// 报错
var obj = {
  1p: 'Hello World'
};

// 不报错
var obj = {
  '1p': 'Hello World',
  'h w': 'Hello World',
  'p+q': 'Hello World'
};
```

### 对象的引用

如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。修改其中一个变量，会影响到其他所有变量

```jsx
var o1 = {};
var o2 = o1;

o1.a = 1;
o2.a; // 1

o2.b = 2;
o1.b; // 2
```

此时，如果取消某一个变量对于原对象的引用，不会影响到另一个变量

```jsx
var o1 = {};
var o2 = o1;

o1 = 1;
o2; // {}
```

但是，这种引用只局限于对象，如果两个变量指向同一个原始类型的值。那么，变量这时都是值的拷贝

```jsx
var x = 1;
var y = x;

x = 2;
y; // 1
```

### 表达式还是语句？

对象采用大括号表示，这导致了一个问题：如果行首是一个大括号，它到底是表达式还是语句？

```jsx
{
	foo: 123;
}
```

JavaScript 引擎读到上面这行代码，会发现可能有两种含义。第一种可能是，这是一个表达式，表示一个包含 `foo` 属性的对象；第二种可能是，这是一个语句，表示一个代码区块，里面有一个标签 `foo`，指向表达式 `123`

为了避免这种歧义，JavaScript 引擎的做法是，如果遇到这种情况，无法确定是对象还是代码块，一律解释为代码块

```jsx
{
	console.log(123);
} // 123
```

上面的语句是一个代码块，而且只有解释为代码块，才能执行

如果要解释为对象，最好在大括号前加上圆括号。因为圆括号的里面，只能是表达式，所以确保大括号只能解释为对象

```jsx
({ foo: 123 }) // 正确
({ console.log(123) }) // 报错
```

这种差异在 `eval` 语句（作用是对字符串求值）中反映得最明显

```jsx
eval('{foo: 123}'); // 123
eval('({foo: 123})'); // {foo: 123}
```

## 属性的操作

### 属性的读取

读取对象的属性，有两种方法，一种是使用点运算符，还有一种是使用方括号运算符

```jsx
var obj = {
	p: 'Hello World',
};

obj.p; // "Hello World"
obj['p']; // "Hello World"
```

请注意，如果使用方括号运算符，键名必须放在引号里面，否则会被当作变量处理

```jsx
var foo = 'bar';

var obj = {
	foo: 1,
	bar: 2,
};

obj.foo; // 1
obj[foo]; // 2
```

方括号运算符内部还可以使用表达式

```jsx
obj['hello' + ' world'];
obj[3 + 3];
```

数字键可以不加引号，因为会自动转成字符串

```jsx
var obj = {
	0.7: 'Hello World',
};

obj['0.7']; // "Hello World"
obj[0.7]; // "Hello World"
```

注意，数值键名不能使用点运算符（因为会被当成小数点），只能使用方括号运算符

```jsx
var obj = {
  123: 'hello world'
};

obj.123 // 报错
obj[123] // "hello world"
```

点运算符和方括号运算符，不仅可以用来读取值，还可以用来赋值

```jsx
var obj = {};

obj.foo = 'Hello';
obj['bar'] = 'World';
```

### 属性的查看

查看一个对象本身的所有属性，可以使用 `Object.keys` 方法

```jsx
var obj = {
	key1: 1,
	key2: 2,
};

Object.keys(obj);
// ['key1', 'key2']
```

### 属性的删除：delete 命令

`delete` 命令用于删除对象的属性，删除成功后返回 `true`

```jsx
var obj = { p: 1 };
Object.keys(obj); // ["p"]

delete obj.p; // true
obj.p; // undefined
Object.keys(obj); // []
```

注意，删除一个不存在的属性，`delete` 不报错，而且返回 `true`

```
var obj = {};
delete obj.p // true
```

只有一种情况，`delete` 命令会返回 `false`，那就是该属性存在，且不得删除

```jsx
var obj = Object.defineProperty({}, 'p', {
	value: 123,
	configurable: false,
});

obj.p; // 123
delete obj.p; // false
```

另外，需要注意的是，`delete` 命令只能删除对象本身的属性

```jsx
var obj = {};
delete obj.toString; // true
obj.toString; // function toString() { [native code] }
```

### 属性是否存在：in 运算符

`in` 运算符用于检查对象是否包含某个属性，如果包含就返回 `true`，否则返回 `false`。它的左边是一个字符串，表示属性名，右边是一个对象

```jsx
var obj = { p: 1 };
'p' in obj; // true
'toString' in obj; // true
```

`in` 运算符的一个问题是，它不能识别哪些属性是对象自身的，哪些属性是继承的。就像上面代码中，对象 `obj` 本身并没有 `toString` 属性，但是 `in` 运算符会返回 `true`，因为这个属性是继承的

这时，可以使用对象的 `hasOwnProperty` 方法判断一下，是否为对象自身的属性

```jsx
var obj = {};
if ('toString' in obj) {
	console.log(obj.hasOwnProperty('toString')); // false
}
```

### 属性的遍历：for...in 循环

`for...in` 循环用来遍历一个对象的全部属性

```jsx
var obj = { a: 1, b: 2, c: 3 };

for (var i in obj) {
	console.log('键名：', i);
	console.log('键值：', obj[i]);
}
// 键名： a
// 键值： 1
// 键名： b
// 键值： 2
// 键名： c
// 键值： 3
```

`for...in` 循环有两个使用注意点

- 它遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性
- 它不仅遍历对象自身的属性，还遍历继承的属性

举例来说，对象都继承了 `toString` 属性，但是 `for...in` 循环不会遍历到这个属性

```jsx
var obj = {};

// toString 属性是存在的
obj.toString; // toString() { [native code] }

for (var p in obj) {
	console.log(p);
} // 没有任何输出
```

如果继承的属性是可遍历的，那么就会被 `for...in` 循环遍历到。但是，一般情况下，都是只想遍历对象自身的属性，所以使用 `for...in` 的时候，应该结合使用 `hasOwnProperty` 方法，在循环内部判断一下，某个属性是否为对象自身的属性

```jsx
var person = { name: '老张' };

for (var key in person) {
	if (person.hasOwnProperty(key)) {
		console.log(key);
	}
}
// name
```
