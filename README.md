# React  
用于构建用户界面的JavaScript库
声明式、组件化、一次学习
### 三个库
###### react.js：React的核心库
###### react-dom.js：提供操作DOM的react扩展库
###### babel.min.js：解析JSX语法代码转成纯JS语法代码的库

## React JavaScript XML（JSX）: 用于申明react当中的元素 
## 基本用法：
#####  1、创建VDOM元素对象
     const element = <h1> hello, react </h1>    //note： JSX语法，不是字符串、不是HTML
##### 2、元素渲染
      ReactDOM.render(VOM,containerDOM）
例：[firstReact](https://github.com/cqujlj/React/blob/master/html/firstReact.html)
   note：可在JSX中使用JavaScript表达式，表达式放在{}中
##### 3、模块和组件
###### 3.1 模块
      向外提供特定功能的js程序，就是一个js文件
###### 3.2 组件
      用来实现特定（局部）功能效果的代码集合（html/css/js）
##### 4、定义组件
###### 方式1：工厂函数组件
      
      
      
      
