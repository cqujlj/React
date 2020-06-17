# React  
用于构建用户界面的JavaScript库
声明式、组件化、一次学习
### 三个库
##### react.js：React的核心库
##### react-dom.js：提供操作DOM的react扩展库
##### babel.min.js：解析JSX语法代码转成纯JS语法代码的库

## React JavaScript XML（JSX）: 用于申明react当中的元素 
## 基本用法：
##### 1、创建VDOM元素对象
      const element = <h1> hello, react </h1>    //note： JSX语法，不是字符串、不是HTML
##### 2、元素渲染
       ReactDOM.render(VOM,containerDOM）
例1：[firstReact](https://github.com/cqujlj/React/blob/master/html/01-firstReact.html)
例2：[展示列表数据](https://github.com/cqujlj/React/blob/master/html/02-listData.html)
   note：可在JSX中使用JavaScript表达式，表达式放在{}中
#### 3、模块和组件
##### 3.1 模块： 向外提供特定功能的js程序，就是一个js文件
##### 3.2 组件：用来实现特定（局部）功能效果的代码集合（html/css/js）
#### 4、定义组件
##### 方式1：工厂函数组件（简单组件）
      接受带有数据的单个“ props”（代表属性）对象参数并返回React元素,使用参数：{props.属性名}
##### 方式2：ES6类组件  （复杂组件）
      使用参数：{this.props.属性名}
代码示例：[使用工厂函数组件和ES6类组件](https://github.com/cqujlj/React/blob/master/html/03-components.html)
#### 5、组件的3个属性
##### 5.1 state
        组件 --> 状态机，通过与用户交互，实现不同状态，然后渲染UI，使得用户界面和数据保持一致
       [使用方法](html/04-components-state.html)
###### (1)初始化state,通过一个类的构造函数来初始化this.state，类组件始终使用props调用基础构造函数
                constructor(props) {
                        super(props);
                        this.state = {
                            isShowText: true
                        };
###### (2)获取stat
              this.state.isShowText
###### (3)修改state
         this.setState({ isShowText : !this.state.isShowText})
##### 5.2 props 
    props不可变，子组件只能通过props来传递参数
    [使用方法]html/05-components-props.html)
###### 在函数组件中使用：props.属性名
    function PersonMsg(props) {
            return (
                <ul>
                    <li>姓名：{props.name}</li>
                    <li>年龄：{props.age}</li>
                </ul>
            )
        }
###### 在ES6类组件中使用  this.props.属性名
      class Person extends React.Component {
            render(){
                return(
                    <ul>
                        <li>姓名：{this.props.name}</li>
                        <li>年龄：{props.age}</li>
                    </ul>
                    )
              }
        }
###### 指定属性值的类型和必要性
         PersonMsg.prototype = {
                    name : PropTypes.string.isRequired,   //name是必填项
                    age : PropTypes.number,
                };
###### 指定默认值
        PersonMsg.defaultProps = {
            age:18,
        };
##### 5.3 refs 
      
      
      
