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
例：
   <div id="example"></div>
   <script type="text/babel">
     var myId = "tetsId";
     var msg = "Hello, world!";
 //构造虚拟DOM
     const element =<h1 id = {myId}> { msg } <h1> 
 //将虚拟DOM渲染到真实DOM
     ReactDOM.render(
           element,        
           document.getElementById('example')
      );
   </script>
   //可在JSX中使用JavaScript表达式，表达式放在{}中
##### 3、模块和组件
###### 3.1 模块
      向外提供特定功能的js程序，就是一个js文件
###### 3.2 组件
      用来实现特定（局部）功能效果的代码集合（html/css/js）
      
      
      
      
      
