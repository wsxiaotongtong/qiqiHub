## Babel

#### 编译器和转译器

一般编译器 Compiler 是指高级语言到低级语言的转换工具，对于高级语言到高级语言的转换工具，被叫做转译器 (Transpiler)。

babel 就是一个 Javascript Transpiler。

#### babel 编译流程

babel 编译是 source to source 的转换,一共有 parse transform generate 三步。

- parse 主要是将代码转换成 AST 树，对源码字符串进行词法分析拆分成单词，最后把单词进行组装。
- transform 主要是遍历 AST，调用各种 transform 插件对 AST 进行增删改，有一个 visitor 函数，可以在此函数做操作
- generate 主要是把转换后的 AST 打印成目标代码，并生成 sourcemap

主要是将代码读取成字符串进行 parse，然后在对 AST 进行处理，最后再转成字符串。

#### Literal，Identifier，Statement，Declaration，Expression，Class，Modules，import，export

1. Literal 就是字面量 number，string，reg 等等.
2. Identifier 是标识符，变量的名称。
3. statement 是语句，可以独立执行，代码最小单位。
4. Declaration 声明语句，在作用域内声明一个变量、函数、class、import、export 等。
5. Expression 表达式，特点是执行完以后有返回值，这是和语句 (statement) 的区别，有的表达式可以独立作为语句执行，会包裹一层 ExpressionStatement。
