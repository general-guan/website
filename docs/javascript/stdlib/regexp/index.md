# RegExp 对象

`RegExp` 对象提供正则表达式的功能

## 概述

正则表达式（regular expression）是一种表达文本模式（即字符串结构）的方法，有点像字符串的模板，常常用来按照“给定模式”匹配文本。比如，正则表达式给出一个 Email 地址的模式，然后用它来确定一个字符串是否为 Email 地址。JavaScript 的正则表达式体系是参照 Perl 5 建立的

新建正则表达式有两种方法。一种是使用字面量，以斜杠表示开始和结束

```javascript
var regex = /xyz/;
```

另一种是使用 `RegExp` 构造函数

```javascript
var regex = new RegExp('xyz');
```

上面两种写法是等价的，都新建了一个内容为 `xyz` 的正则表达式对象。它们的主要区别是，第一种方法在引擎编译代码时，就会新建正则表达式，第二种方法在运行时新建正则表达式，所以前者的效率较高。而且，前者比较便利和直观，所以实际应用中，基本上都采用字面量定义正则表达式

`RegExp` 构造函数还可以接受第二个参数，表示修饰符（详细解释见下文）

```javascript
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;
```

上面代码中，正则表达式 `/xyz/` 有一个修饰符 `i`

## 匹配规则

### 元字符

| 元字符  | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| `.`     | 句号匹配任意单个字符除了换行符                               |
| `[]`    | 字符种类，匹配方括号内的任意字符                             |
| `[^]`   | 否定的字符种类，匹配除了方括号里的任意字符                   |
| `*`     | 匹配 >=0 个重复的在 \* 号之前的字符                          |
| `+`     | 匹配 >= 1 个重复的 + 号前的字符                              |
| `?`     | 标记 ? 之前的字符为可选                                      |
| `{n,m}` | 匹配 num 个大括号之前的字符或字符集 (n <= num <= m)          |
| `(xyz)` | 字符集，匹配与 xyz 完全相等的字符串                          |
| `\|`    | 或运算符，匹配符号前或后的字符                               |
| `\`     | 转义字符，用于匹配一些保留的字符 `[ ] ( ) { } . * + ? ^ $ \` |
| `^`     | 从开始行开始匹配                                             |
| `$`     | 从末端开始匹配                                               |

#### 点运算符 `.`

`.` 是元字符中最简单的例子。 `.` 匹配任意单个字符，但不匹配换行符

> ".ar" => The [car]() [par]()ked in the [gar]()age.

#### 字符集

方括号用来指定一个字符集。 在方括号中使用连字符来指定字符集的范围。 在方括号中的字符集不关心顺序。 例如，表达式 `[Tt]he` 匹配 `the` 和 `The`

> "[Tt]he" => [The]() car parked in [the]() garage.

方括号的句号就表示句号。 表达式 `ar[.]` 匹配 `ar.` 字符串

> "ar[.]" => A garage is a good place to park a [car.]()

##### 否定字符集

一般来说 `^` 表示一个字符串的开头，但它用在一个方括号的开头的时候，它表示这个字符集是否定的。 例如，表达式 `[^c]ar` 匹配一个后面跟着 `ar` 的除了 `c` 的任意字符

> "[^c]ar" => The car [par]()ked in the [gar]()age.

#### 重复次数

后面跟着元字符 `+`，`*` or `?` 的，用来指定匹配子模式的次数

##### `*` 号

`*` 号匹配在 `*` 之前的字符出现大于等于 0 次。 例如，表达式 `a*` 匹配 0 或更多个以 a 开头的字符。表达式 `[a-z]*` 匹配一个行中所有以小写字母开头的字符串

> "[a-z]\*" => T[he]() [car]() [parked]() [in]() [the]() [garage]() #21.

`*` 字符和 `.` 字符搭配可以匹配所有的字符 `.*`。 `*` 和表示匹配空格的符号 `\s` 连起来用，如表达式 `\s*cat\s*` 匹配 0 或更多个空格开头和 0 或更多个空格结尾的 cat 字符串

> "\s*cat\s*" => The fat[ cat ]()sat on the con[cat]()enation.

##### `+` 号

`+` 号匹配 `+` 号之前的字符出现 >=1 次。 例如表达式 `c.+t` 匹配以首字母 `c` 开头以 `t` 结尾，中间跟着至少一个字符的字符串

> "c.+t" => The fat [cat sat on the mat]().

##### `?` 号

在正则表达式中元字符 `?` 标记在符号前面的字符为可选，即出现 0 或 1 次。 例如，表达式 `[T]?he` 匹配字符串 `he` 和 `The`

> "[T]he" => [The]() car is parked in the garage.

> "[T]?he" => [The]() car is parked in [the]() garage.

##### `{}` 号

在正则表达式中 `{}` 是一个量词，常用来限定一个或一组字符可以重复出现的次数。 例如， 表达式 `[0-9]{2,3}` 匹配最少 2 位最多 3 位 0~9 的数字

> "[0-9]{2,3}" => The number was 9.[999]()7 but we rounded it off to [10]().0.

我们可以省略第二个参数。 例如，`[0-9]{2,}` 匹配至少两位 0~9 的数字。

> "[0-9]{2,}" => The number was 9.[9997]() but we rounded it off to [10]().0.

如果逗号也省略掉则表示重复固定的次数。 例如，`[0-9]{3}` 匹配 3 位数字

> "[0-9]{3}" => The number was 9.[999]()7 but we rounded it off to 10.0.

#### `(...)` 特征标群

特征标群是一组写在 `(...)` 中的子模式。`(...)` 中包含的内容将会被看成一个整体，和数学中小括号（ ）的作用相同。例如, 表达式 `(ab)*` 匹配连续出现 0 或更多个 `ab`。如果没有使用 `(...)` ，那么表达式 `ab*` 将匹配连续出现 0 或更多个 `b` 。再比如之前说的 `{}` 是用来表示前面一个字符出现指定次数。但如果在 `{}` 前加上特征标群 `(...)` 则表示整个标群内的字符重复 N 次

我们还可以在 `()` 中用或字符 `|` 表示或。例如，`(c|g|p)ar` 匹配 `car` 或 `gar` 或 `par`

> "(c|g|p)ar" => The [car]() is [par]()ked in the [gar]()age.

#### `|` 或运算符

或运算符就表示或，用作判断条件

例如 `(T|t)he|car` 匹配 `(T|t)he` 或 `car`

> "(T|t)he|car" => [The]() [car]() is parked in [the]() garage.

#### 转码特殊字符

反斜线 `\` 在表达式中用于转码紧跟其后的字符。用于指定 `{ } [ ] / \ + * . $ ^ | ?` 这些特殊字符。如果想要匹配这些特殊字符则要在其前面加上反斜线 `\`

例如 `.` 是用来匹配除换行符外的所有字符的。如果想要匹配句子中的 `.` 则要写成 `\.` 以下这个例子 `\.?`是选择性匹配`.`

> "(f|c|m)at\.?" => The [fat]() [cat]() sat on the [mat.]()

#### 锚点

在正则表达式中，想要匹配指定开头或结尾的字符串就要使用到锚点。`^` 指定开头，`$` 指定结尾

##### `^` 号

`^` 用来检查匹配的字符串是否在所匹配字符串的开头

例如，在 `abc` 中使用表达式 `^a` 会得到结果 `a`。但如果使用 `^b` 将匹配不到任何结果。因为在字符串 `abc` 中并不是以 `b` 开头

例如，`^(T|t)he` 匹配以 `The` 或 `the` 开头的字符串

> "(T|t)he" => [The]() car is parked in [the]() garage.

> "^(T|t)he" => [The]() car is parked in the garage.

##### `$` 号

同理于 `^` 号，`$` 号用来匹配字符是否是最后一个

例如，`(at\.)$` 匹配以 `at.` 结尾的字符串

> "(at\.)" => The fat c[at.]() s[at.]() on the m[at.]()

> "(at\.)$" => The fat cat. sat. on the m[at.]()

### 简写字符集

正则表达式提供一些常用的字符集简写。如下：

| 简写 | 描述                                               |
| ---- | -------------------------------------------------- |
| `.`  | 除换行符外的所有字符                               |
| `\w` | 匹配所有字母数字，等同于 `[a-zA-Z0-9_]`            |
| `\W` | 匹配所有非字母数字，即符号，等同于： `[^\w]`       |
| `\d` | 匹配数字： `[0-9]`                                 |
| `\D` | 匹配非数字： `[^\d]`                               |
| `\s` | 匹配所有空格字符，等同于： `[\t\n\f\r\p{Z}]`       |
| `\S` | 匹配所有非空格字符： `[^\s]`                       |
| `\f` | 匹配一个换页符                                     |
| `\n` | 匹配一个换行符                                     |
| `\r` | 匹配一个回车符                                     |
| `\t` | 匹配一个制表符                                     |
| `\v` | 匹配一个垂直制表符                                 |
| `\p` | 匹配 CR/LF（等同于 `\r\n`），用来匹配 DOS 行终止符 |

### 零宽度断言（前后预查）

先行断言和后发断言（合称 lookaround）都属于**非捕获组**（用于匹配模式，但不包括在匹配列表中）。当我们需要一个模式的前面或后面有另一个特定的模式时，就可以使用它们

例如，我们希望从下面的输入字符串 `$4.44` 和 `$10.88` 中获得所有以 `$` 字符开头的数字，我们将使用以下的正则表达式 `(?<=\$)[0-9\.]*`。意思是：获取所有包含 `.` 并且前面是 `$` 的数字

零宽度断言如下：

| 符号  | 描述            |
| ----- | --------------- |
| `?=`  | 正先行断言-存在 |
| `?!`  | 负先行断言-排除 |
| `?<=` | 正后发断言-存在 |
| `?<!` | 负后发断言-排除 |

#### `?=...` 正先行断言

`?=...` 正先行断言，表示第一部分表达式之后必须跟着 `?=...` 定义的表达式

返回结果只包含满足匹配条件的第一部分表达式。 定义一个正先行断言要使用 `()`。在括号内部使用一个问号和等号： `(?=...)`

正先行断言的内容写在括号中的等号后面。 例如，表达式 `(T|t)he(?=\sfat)` 匹配 `The` 和 `the`，在括号中我们又定义了正先行断言 `(?=\sfat)` ，即 `The` 和 `the` 后面紧跟着 `(空格)fat`

> "(T|t)he(?=\sfat)" => [The]() fat cat sat on the mat.

#### `?!...` 负先行断言

负先行断言 `?!` 用于筛选所有匹配结果，筛选条件为 其后不跟随着断言中定义的格式。 `正先行断言` 定义和 `负先行断言` 一样，区别就是 `=` 替换成 `!` 也就是 `(?!...)`

表达式 `(T|t)he(?!\sfat)` 匹配 `The` 和 `the`，且其后不跟着 `(空格)fat`

> "(T|t)he(?!\sfat)" => The fat cat sat on [the]() mat.

#### `?<= ...` 正后发断言

正后发断言 记作`(?<=...)` 用于筛选所有匹配结果，筛选条件为 其前跟随着断言中定义的格式。 例如，表达式 `(?<=(T|t)he\s)(fat|mat)` 匹配 `fat` 和 `mat`，且其前跟着 `The` 或 `the`。

> "(?<=(T|t)he\s)(fat|mat)" => The [fat]() cat sat on the [mat]().

#### `?<!...` 负后发断言

负后发断言 记作 `(?<!...)` 用于筛选所有匹配结果，筛选条件为 其前不跟随着断言中定义的格式。 例如，表达式 `(?<!(T|t)he\s)(cat)` 匹配 `cat`，且其前不跟着 `The` 或 `the`

> "(?<!(T|t)he\s)(cat)" => The cat sat on [cat]().

### 标志

标志也叫模式修正符，因为它可以用来修改表达式的搜索结果。 这些标志可以任意的组合使用，它也是整个正则表达式的一部分

| 标志 | 描述                                                |
| ---- | --------------------------------------------------- |
| `i`  | 忽略大小写                                          |
| `g`  | 全局搜索                                            |
| `m`  | 多行修饰符：锚点元字符 `^` `$` 工作范围在每行的起始 |

#### 忽略大小写 (Case Insensitive)

修饰语 `i` 用于忽略大小写。 例如，表达式 `/The/gi` 表示在全局搜索 `The`，在后面的 `i` 将其条件修改为忽略大小写，则变成搜索 `the` 和 `The`，`g` 表示全局搜索

> "The" => [The]() fat cat sat on the mat.

> "/The/gi" => [The]() fat cat sat on [the]() mat.

#### 全局搜索 (Global search)

修饰符 `g` 常用于执行一个全局搜索匹配，即（不仅仅返回第一个匹配的，而是返回全部）。 例如，表达式 `/.(at)/g` 表示搜索 任意字符（除了换行）+ `at`，并返回全部结果。

> "/.(at)/" => The [fat]() cat sat on the mat.

> "/.(at)/g" => The [fat]() [cat]() [sat]() on the [mat]().

#### 多行修饰符 (Multiline)

多行修饰符 `m` 常用于执行一个多行匹配

像之前介绍的 `(^,$)` 用于检查格式是否是在待检测字符串的开头或结尾。但我们如果想要它在每行的开头和结尾生效，我们需要用到多行修饰符 `m`

例如，表达式 `/at(.)?$/gm` 表示小写字符 `a` 后跟小写字符 `t` ，末尾可选除换行符外任意字符。根据 `m` 修饰符，现在表达式匹配每行的结尾

> "/.at(.)?$/" => The fat
> cat sat
> on the [mat.]()

> "/.at(.)?$/gm" => The [fat]()
> cat [sat]()
> on the [mat.]()

### 贪婪匹配与惰性匹配 (Greedy vs lazy matching)

正则表达式默认采用贪婪匹配模式，在该模式下意味着会匹配尽可能长的子串。我们可以使用 `?` 将贪婪匹配模式转化为惰性匹配模式

> "/(.\*at)/" => [The fat cat sat on the mat]().

> "/(.\*?at)/" => [The fat]() cat sat on the mat.

## 实例属性

正则对象的实例属性分成两类

一类是修饰符相关，用于了解设置了什么修饰符

- `RegExp.prototype.ignoreCase`：返回一个布尔值，表示是否设置了 `i` 修饰符
- `RegExp.prototype.global`：返回一个布尔值，表示是否设置了 `g` 修饰符
- `RegExp.prototype.multiline`：返回一个布尔值，表示是否设置了 `m` 修饰符
- `RegExp.prototype.flags`：返回一个字符串，包含了已经设置的所有修饰符，按字母排序

上面四个属性都是只读的

```javascript
var r = /abc/gim;

r.ignoreCase; // true
r.global; // true
r.multiline; // true
r.flags; // 'gim'
```

另一类是与修饰符无关的属性，主要是下面两个

- `RegExp.prototype.lastIndex`：返回一个整数，表示下一次开始搜索的位置。该属性可读写，但是只在进行连续搜索时有意义，详细介绍请看后文
- `RegExp.prototype.source`：返回正则表达式的字符串形式（不包括反斜杠），该属性只读

```javascript
var r = /abc/gim;

r.lastIndex; // 0
r.source; // "abc"
```

## 实例方法

### RegExp.prototype.test()

正则实例对象的 `test` 方法返回一个布尔值，表示当前模式是否能匹配参数字符串

```javascript
/cat/.test('cats and dogs'); // true
```

上面代码验证参数字符串之中是否包含 `cat`，结果返回 `true`

如果正则表达式带有 `g` 修饰符，则每一次 `test` 方法都从上一次结束的位置开始向后匹配

```javascript
var r = /x/g;
var s = '_x_x';

r.lastIndex; // 0
r.test(s); // true

r.lastIndex; // 2
r.test(s); // true

r.lastIndex; // 4
r.test(s); // false
```

上面代码的正则表达式使用了 `g` 修饰符，表示是全局搜索，会有多个结果。接着，三次使用 `test` 方法，每一次开始搜索的位置都是上一次匹配的后一个位置

带有 `g` 修饰符时，可以通过正则对象的 `lastIndex` 属性指定开始搜索的位置

```javascript
var r = /x/g;
var s = '_x_x';

r.lastIndex = 4;
r.test(s); // false

r.lastIndex; // 0
r.test(s); // true
```

注意，带有 `g` 修饰符时，正则表达式内部会记住上一次的 `lastIndex` 属性，这时不应该更换所要匹配的字符串，否则会有一些难以察觉的错误

```javascript
var r = /bb/g;
r.test('bb'); // true
r.test('-bb-'); // false
```

`lastIndex` 属性只对同一个正则表达式有效，所以下面这样写是错误的

```javascript
var count = 0;
while (/a/g.test('babaa')) count++;
```

上面代码会导致无限循环，因为 `while` 循环的每次匹配条件都是一个新的正则表达式，导致 `lastIndex` 属性总是等于 0

如果正则模式是一个空字符串，则匹配所有字符串

```javascript
new RegExp('').test('abc');
// true
```

### RegExp.prototype.exec()

正则实例对象的 `exec()` 方法，用来返回匹配结果。如果发现匹配，就返回一个数组，成员是匹配成功的子字符串，否则返回 `null`

```javascript
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

r1.exec(s); // ["x"]
r2.exec(s); // null
```

如果正则表达式包含圆括号（即含有“组匹配”），则返回的数组会包括多个成员。第一个成员是整个匹配成功的结果，后面的成员就是圆括号对应的匹配成功的组。也就是说，第二个成员对应第一个括号，第三个成员对应第二个括号，以此类推。整个数组的 `length` 属性等于组匹配的数量再加 1

```javascript
var s = '_x_x';
var r = /_(x)/;

r.exec(s); // ["_x", "x"]
```

`exec()` 方法的返回数组还包含以下两个属性：

- `input`：整个原字符串
- `index`：模式匹配成功的开始位置（从 0 开始计数）

```javascript
var r = /a(b+)a/;
var arr = r.exec('_abbba_aba_');

arr; // ["abbba", "bbb"]

arr.input; // "_abbba_aba_"
arr.index; // 1
```

如果正则表达式加上 `g` 修饰符，则可以使用多次 `exec()` 方法，下一次搜索的位置从上一次匹配成功结束的位置开始

```javascript
var reg = /a/g;
var str = 'abc_abc_abc';

var r1 = reg.exec(str);
r1; // ["a"]
r1.index; // 0
reg.lastIndex; // 1

var r2 = reg.exec(str);
r2; // ["a"]
r2.index; // 4
reg.lastIndex; // 5

var r3 = reg.exec(str);
r3; // ["a"]
r3.index; // 8
reg.lastIndex; // 9

var r4 = reg.exec(str);
r4; // null
reg.lastIndex; // 0
```

利用 `g` 修饰符允许多次匹配的特点，可以用一个循环完成全部匹配

```javascript
var reg = /a/g;
var str = 'abc_abc_abc';

while (true) {
  var match = reg.exec(str);
  if (!match) break;
  console.log('#' + match.index + ':' + match[0]);
}
// #0:a
// #4:a
// #8:a
```

正则实例对象的 `lastIndex` 属性不仅可读，还可写。设置了 `g` 修饰符的时候，只要手动设置了 `lastIndex` 的值，就会从指定位置开始匹配

## 字符串的实例方法

字符串的实例方法之中，有 4 种与正则表达式有关

- `String.prototype.match()`：返回一个数组，成员是所有匹配的子字符串
- `String.prototype.search()`：按照给定的正则表达式进行搜索，返回一个整数，表示匹配开始的位置
- `String.prototype.replace()`：按照给定的正则表达式进行替换，返回替换后的字符串
- `String.prototype.split()`：按照给定规则进行字符串分割，返回一个数组，包含分割后的各个成员

### String.prototype.match()

字符串实例对象的 `match` 方法对字符串进行正则匹配，返回匹配结果

```javascript
var s = '_x_x';
var r1 = /x/;
var r2 = /y/;

s.match(r1); // ["x"]
s.match(r2); // null
```

从上面代码可以看到，字符串的 `match` 方法与正则对象的 `exec` 方法非常类似：匹配成功返回一个数组，匹配失败返回 `null`

如果正则表达式带有 `g` 修饰符，则该方法与正则对象的 `exec` 方法行为不同，会一次性返回所有匹配成功的结果

```javascript
var s = 'abba';
var r = /a/g;

s.match(r); // ["a", "a"]
r.exec(s); // ["a"]
```

设置正则表达式的 `lastIndex` 属性，对 `match` 方法无效，匹配总是从字符串的第一个字符开始

```javascript
var r = /a|b/g;
r.lastIndex = 7;
'xaxb'.match(r); // ['a', 'b']
r.lastIndex; // 0
```

上面代码表示，设置正则对象的 `lastIndex` 属性是无效的

### String.prototype.search()

字符串对象的 `search` 方法，返回第一个满足条件的匹配结果在整个字符串中的位置。如果没有任何匹配，则返回 `-1`

```javascript
'_x_x'.search(/x/);
// 1
```

### String.prototype.replace()

字符串对象的 `replace` 方法可以替换匹配的值。它接受两个参数，第一个是正则表达式，表示搜索模式，第二个是替换的内容

```javascript
str.replace(search, replacement);
```

正则表达式如果不加 `g` 修饰符，就替换第一个匹配成功的值，否则替换所有匹配成功的值

```javascript
'aaa'.replace('a', 'b'); // "baa"
'aaa'.replace(/a/, 'b'); // "baa"
'aaa'.replace(/a/g, 'b'); // "bbb"
```

上面代码中，最后一个正则表达式使用了 `g` 修饰符，导致所有的 `a` 都被替换掉了

`replace` 方法的一个应用，就是消除字符串首尾两端的空格

```javascript
var str = '  #id div.class  ';

str.replace(/^\s+|\s+$/g, '');
// "#id div.class"
```

`replace`方法的第二个参数可以使用美元符号 `$`，用来指代所替换的内容

- `$&`：匹配的子字符串
- `` $` ``：匹配结果前面的文本
- `$'`：匹配结果后面的文本
- `$n`：匹配成功的第 `n` 组内容，`n` 是从 1 开始的自然数
- `$$`：指代美元符号 `$`

```javascript
'hello world'.replace(/(\w+)\s(\w+)/, '$2 $1');
// "world hello"

'abc'.replace('b', "[$`-$&-$']");
// "a[a-b-c]c"
```

`replace` 方法的第二个参数还可以是一个函数，将每一个匹配内容替换为函数返回值

```javascript
'3 and 5'.replace(/[0-9]+/g, function (match) {
  return 2 * match;
});
// "6 and 10"

var a = 'The quick brown fox jumped over the lazy dog.';
var pattern = /quick|brown|lazy/gi;

a.replace(pattern, function replacer(match) {
  return match.toUpperCase();
});
// The QUICK BROWN fox jumped over the LAZY dog.
```

作为 `replace` 方法第二个参数的替换函数，可以接受多个参数。其中，第一个参数是捕捉到的内容，第二个参数是捕捉到的组匹配（有多少个组匹配，就有多少个对应的参数）。此外，最后还可以添加两个参数，倒数第二个参数是捕捉到的内容在整个字符串中的位置（比如从第五个位置开始），最后一个参数是原字符串。下面是一个网页模板替换的例子

```javascript
var prices = {
  p1: '$1.99',
  p2: '$9.99',
  p3: '$5.00',
};

var template =
  '<span id="p1"></span>' + '<span id="p2"></span>' + '<span id="p3"></span>';

template.replace(
  /(<span id=")(.*?)(">)(<\/span>)/g,
  function (match, $1, $2, $3, $4) {
    return $1 + $2 + $3 + prices[$2] + $4;
  }
);
// "<span id="p1">$1.99</span><span id="p2">$9.99</span><span id="p3">$5.00</span>"
```

### String.prototype.split()

字符串对象的 `split` 方法按照正则规则分割字符串，返回一个由分割后的各个部分组成的数组

```javascript
str.split(separator, [limit]);
```

该方法接受两个参数，第一个参数是正则表达式，表示分隔规则，第二个参数是返回数组的最大成员数

```javascript
// 非正则分隔
'a,  b,c, d'.split(',');
// [ 'a', '  b', 'c', ' d' ]

// 正则分隔，去除多余的空格
'a,  b,c, d'.split(/, */);
// [ 'a', 'b', 'c', 'd' ]

// 指定返回数组的最大成员
'a,  b,c, d'.split(/, */, 2);
// ['a', 'b'];
```

上面代码使用正则表达式，去除了子字符串的逗号后面的空格

```javascript
// 例一
'aaa*a*'.split(/a*/);
// [ '', '*', '*' ]

// 例二
'aaa**a*'.split(/a*/);
// ["", "*", "*", "*"]
```

上面代码的分割规则是 0 次或多次的 `a`，由于正则默认是贪婪匹配，所以例一的第一个分隔符是 `aaa`，第二个分割符是 `a`，将字符串分成三个部分，包含开始处的空字符串

例二的第一个分隔符是 `aaa`，第二个分隔符是 0 个 `a`（即空字符），第三个分隔符是 `a`，所以将字符串分成四个部分

如果正则表达式带有括号，则括号匹配的部分也会作为数组成员返回

```javascript
'aaa*a*'.split(/(a*)/);
// [ '', 'aaa', '*', 'a', '*' ]
```

上面代码的正则表达式使用了括号，第一个组匹配是 `aaa`，第二个组匹配是 `a`，它们都作为数组成员返回
