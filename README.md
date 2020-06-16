# React  
用于构建用户界面的JavaScript库
声明式、组件化、一次学习
### 三个库
###### react.js：React的核心库
###### react-dom.js：提供操作DOM的react扩展库
###### babel.min.js：解析JSX语法代码转成纯JS语法代码的库

## React JSX: 用于申明react当中的元素 
## 基本用法：
#####  1、创建VDOM元素对象
     const element = <h1> hello, react </h1>    //note： JSX语法，不是字符串、不是HTML
##### 2、元素渲染
   <div id="example"></div>
   <script type="text/babel">
     const element =<h1> Hello, world!</h1>  //构造虚拟DOM
     ReactDOM.render(
           element,         //将虚拟DOM渲染到真实DOM
           document.getElementById('example')
      );
   </script>
