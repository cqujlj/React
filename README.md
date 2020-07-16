## 一、 React  
     用于构建用户界面的JavaScript库
     声明式编程、组件化开发、多平台适配、
### 1、三个库
##### 1、react.js：React的核心库，包含react所必须的核心代码
##### 2、react-dom.js：提供操作DOM的react扩展库，react渲染在不同平台所需要的核心代码
##### 3、babel.min.js：将ES6代码转换成ES6、jsx语法转换成JavaScript代码
### 2、添加依赖
##### (1) 直接CDN引入：
     react依赖：https://unpkg.com/react@16/umd/react.development.js
     react-dom依赖：https://unpkg.com/react-dom@16/umd/react-dom.development.js
     babel依赖：https://unpkg.com/babel-standalone@6/babel.min.js
##### (2) 下载，添加本地依赖
##### (3) 通过npm管理
     npm i react --save
     npm i react-dom --save
     npm i babel-standalone --save
### 3React生命周期
#### 广义上：挂载、渲染、卸载
![react lifeCycle](https://github.com/cqujlj/React/blob/master/img/react.jpeg)
#### 1、初始化阶段 initialization
#### (1) constructor()
     完成react数据的初始化，可接受两个参数：props和context；
     在函数内部使用这两个参数时需要使用super()传入
       constructor(props) {
                super(props);   //必须使用super，否则会导致this指向错误
            }
#### 2、挂载阶段 Mounting
##### (1) componentWillMount()
       一般在服务端渲染时使用。代表的过程时：组件已由constructor()初始化数据后，但是DOM还没有渲染
##### (2) componentDidMount()
      组件第一次渲染完成，DOM节点已经生成；在这里可以调用ajax请求，返回数据setState后组件会重新渲染
##### (3) getDerivedStateFromProps(props,state)
      getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
      无论是Mounting还是Updating，也无论是因为什么引起的Updating，全部都会被调用
      将传入的props映射到state上面,替代componentWillReceiveProps
      它应返回一个对象来更新 state，如果返回 null 则不更新任何内容
      此方法适用于罕见的用例，即 state 的值在任何时候都取决于 props
      例: state = {
          email: this.props.defaultEmail,
          prevPropsUserID: this.props.userID
         };

        static getDerivedStateFromProps(props, state) {
          // 只要当前 user 变化，
          // 重置所有跟 user 相关的状态。
          // 这个例子中，只有 email 和 user 相关。
          if (props.userID !== state.prevPropsUserID) {
           return {
             prevPropsUserID: props.userID,
             email: props.defaultEmail
            };
          }
          return null;
        }
#### 3、更新阶段 Update
##### (1) componentWillReceiveProps (nextProps)   //新版本是： getDerivedStateFromProps(nextProps, prevState)
      1、在接受父组件改变后的props需要重新渲染组件时用得比较多
      2、接受一个参数：nextProps
      3、通过对比nextProps和this.props，将nextProps的state为当前组件的state，从而重新渲染组件
      代码实现：  componentWillReceiveProps (nextProps) {
                  nextProps.openNotice !== this.props.openNotice&&this.setState({
                  openNotice:nextProps.openNotice
                          }，() => {
                   console.log(this.state.openNotice:nextProps)
                  //将state更新为nextProps,在setState的第二个参数（回调）可以打印出新的state
                 })
             }
            // before
               componentWillReceiveProps(nextProps) {
                 if (nextProps.isLogin !== this.props.isLogin) {
                   this.setState({ 
                     isLogin: nextProps.isLogin,   
                   });
                 }
                 if (nextProps.isLogin) {
                   this.handleClose();
                 }
               }

             // after
               static getDerivedStateFromProps(nextProps, prevState) {
                 if (nextProps.isLogin !== prevState.isLogin) {
                   return {
                     isLogin: nextProps.isLogin,
                   };
                 }
                 return null;
               }
##### (2) shouldComponentUpdate(nextProps,nextState)
      1、主要用于性能优化；唯一用于控制组件重新渲染的生命周期。
      2、由于setState之后，state会发生变化，组件会进入重新渲染的流程，return false可以组织组件的更新；
      3、父组件的重新渲染会导致其子组件的重新渲染，但不需要所有子组件都渲染，因此需要在子组件的该生命周期中做判断
##### (3) componentWillUpdate (nextProps,nextState)  //新版本：getSnapshotBeforeUpdate(prevProps, prevState)
      当shouldComponentUpdate返回true；组件进入重新渲染阶段
##### (4) componentDidUpdate(prevProps,prevState)
      组件更新完毕后，react在第一次初始化成功会进入会进入componentDidmount,之后每次重新渲染后都会进入这个生命周期
      参数prevProps：更新前的props；prevState：更新前的state
      代码实现：
      componentDidUpdate(prevProps, prevState) {
          if (!prevState.isLogin && this.props.isLogin) {
           this.handleClose();
            }
       }
##### (5) render()
      render函数会插入jsx生成的dom结构，react会生成一份虚拟DOM树，在每一次组件更新时，在此react会通过其diff算法比较更新前后的新旧DOM树，
      比较以后，找到最小的有差异的DOM节点，并重新渲染。
#### 4、卸载阶段 Unmounting
##### (1) componentWillUnmount ()
      完成组件的卸载和数据的销毁
      1、clear在组件中所有的setTimeout、setInterval
      2、移除所有组件中监听 removeEventlistener
      3、在组件中的ajax请求返回setState,而你组件销毁的时候，请求还未完成，报warning   
###### 总结
     类组件的一个组件的生命周期被划分为类render和commit两个阶段；render阶段主要负责组件渲染相关，包括对渲染函数state的更新，为了防止一次更新中render阶段重复执行
     React将阶段可能引入side effect的生命周期函数componentWillReceiveProps、componentWillUpdate，componentWillUnMount等函数移除
     针对需要通过props计算derived计算 derived state的需求，提供静态函数getDerivedStateFromProps；
     针对获取更新前DOM元素的需求，React提供了getSnapshotBeforeUpdate生命周期函数
## 二、 React JavaScript XML（JSX）: 用于申明react当中的元素 
### 基本用法：
#### 1、创建VDOM元素对象(JSX的顶层只能有一个根元素)
      const element = <h1> hello, react </h1>    //note： JSX语法，不是字符串、不是HTML
#### 2、元素渲染
      ReactDOM.render(VOM,containerDOM）   //会覆盖挂载到的containerDOM原生中的所有内容，引入组件可解决这个问题
代码实例：[firstReact](https://github.com/cqujlj/React/blob/master/html/html/01-firstReact.html)
#### 3、JSX嵌入表达式
     若jsx的内容时动态的，可在JSX中使用JavaScript表达式，
     书写规则：{表达式}  表达式可以是变量、字符串、数组、函数调用等任意js表达式
###### 注释方式：{/* 我是一段注释 */}  
##### 3.1 嵌入变量
###### 情况1：当变量是Number、String、Array类型时，可以直接显示
      <h2>{this.state.name}</h2>  //name:"Jack"
      <h2>{this.state.age}</h2>   //age:10
      <h2>{this.state.hobbies}</h2>  //hobbies:["篮球", "唱跳", "rap"]
###### 情况2：“当变量是null、undefined、Boolean,则需要转换成字符串；
     比如toString方法、和空字符串拼接，String(变量)等方式
     <h2>{this.state.flag}</h2>   //flag:true   不显示
        <h2>{this.state.flag + ""}</h2>   //变成字符串后，显示
###### 情况3：对象类型不能作为子元素
       <h2>123{this.state.friend}</h2>  // friend: { name: "kobe", age: 40}  报错
##### 3.2 嵌入表达式
###### 运算表达式 ：
     <h2>{this.state.firstName + " " + this.state.lastName}</h2>
###### 三元表达式 ：
     <h2>{this.state.age >= 18 ? "成年人": "未成年人"}</h2>
###### 执行一个函数 ： 
     <h2>{this.sayHello("kobe")}</h2>
##### 3.3 jsx绑定属性
###### title属性：
      <h2 title={this.state.title}>Hello World</h2>  *title: "你好啊"*/,
###### src属性：
     <img src={this.state.imgUrl} alt=""/>  /*imgUrl: "https://users/upload_avatars/1102036/c3628b478f06.jpeg"*/,
###### href属性：
     <a href={this.state.link} target="_blank">百度一下</a>   /*link: "https://www.baidu.com"*/
###### class属性：jsx中不允许直接写class，使用className替代
     <div className={"message " + (this.state.active ? "active": "")}>你好啊</div>  //active: false
###### style属性：style后面跟的是一个对象类型，对象中是样式的属性名和属性值；属性名转成驼峰标识，而不是连接符-
     <div style={{fontSize: "30px", color: "red", backgroundColor: "blue"}}>我是文本</div>
##### 3.4 jsx列表渲染
     vue方式：v-for   react方式：数组的map高阶函数（使用最多）
###### map高阶函数 --> 展示列表  array.map(callback[,thisArg])
     参数：
     (1) currentValue：callback 数组中正在处理的当前元素。
     (2) index可选：callback 数组中正在处理的当前元素的索引。
     (3) array可选：map 方法调用的数组。
     (4) thisArg可选：执行 callback 函数时值被用作this。
     用例：
     this.state.movies.map((item,index) => {
              return <li  key={index}>{item*2*}</li>  /*可以在回调函数中对数据做一些操作*/ /*在 map() 方法中的元素需要设置 key 属性*/
            }) 
代码实例：[展示列表数据](https://github.com/cqujlj/React/blob/master/html/html/02-%E5%B1%95%E7%A4%BA%E5%88%97%E8%A1%A8%E6%95%B0%E6%8D%AE.html)
###### filter函数 --> 处理数组，获取设定条件下的元素
###### slice函数 --> 处理数组，截取数组中的一部分内容
     用例：
     this.state.numbers.filter(item => item >= 50).slice(0, 3).map(item => {
              return <li>{item}</li>
##### 3.5 关于key
###### key帮助 React 识别哪些元素改变了，比如被添加或删除
     一个元素的 key 一般是这个元素在列表中拥有的一个独一无二的字符串。如使用数据中的 id 来作为元素的 key   key={todo.id}
     当元素没有确定 id 的时候，可以使用元素索引 index 作为 key；key={index}；如果列表项目的顺序可能会变化，不建议使用索引来用作 key 值
###### 用key提取组件 --> 元素的 key 只有放在就近的数组上下文中才有意义
     如果你提取出一个 ListItem 组件，你应该把 key 保留在数组中的这个 <ListItem /> 元素上，而不是放在 ListItem 组件中的 <li> 元素上
     例：function ListItem(props) {
               // 这里不需要指定 key：
               return <li>{props.value}</li>;
             }
              // key 应该在数组的上下文中被指定
            const listItems = numbers.map((number) => <ListItem key={number.toString()} value={number} /> );
###### JSX 允许在大括号中嵌入任何表达式，所以我们可以内联 map() 返回的结果
     例： <ul>
           {numbers.map((number) =>
             <ListItem key={number.toString()  value={number} />
           )}
         </ul>
###### key只是在兄弟节点之间必须唯一
     数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。
     当我们生成两个不同的数组时，我们可以使用相同的 key 值
#### 4、JSX监听事件
     React 事件的命名采用小驼峰式（camelCase），而不是纯小写
     通过{}传入一个事件处理函数，这个函数会在事件发生时被执行
     例：<button onClick={this.btnClick}>点我一下(React)</button>
##### 4.1 this绑定问题
     由于btnClick不是我们主动调用的，而是当onClick发生时，react内部调用了btnClick，这种方式调用函数不知道如何正确绑定this
###### 解决方案
     方法一：bind给btnClick显示绑定this  -->  <button onClick={this.btnClick.bind(this)}>点我</button>
          缺点：每一次渲染是都会重新绑定一次bind
     方法二：通过在构造方法中直接给this.btnClick绑定this --> 在constructor中：this.btnClick = this.btnClick.bind(this);
          好处：只需绑定一次，避免每次渲染时都要重新绑定
     方法三：使用箭头函数 -->  btnClick = () => { console.log(this); } } 
     方案四：事件监听时传入箭头函数  -->   <button onClick={() => this.btnClick()}>点我</button>
     *//bind跟使用箭头函数一样，实际上每次组件渲染时都生成了新的回调函数*
##### 4.2 事件参数传递
     情况一：获取event对象 --> 拿到event对象来做一些事情（比如阻止默认行为)
      btnClick(e) {   /*如果用不到this，直接传入函数就可以获取到event对象*/
          e.preventDefault();
           console.log(e);
       }
     情况二：获取更多参数 --> 传入一个箭头函数，主动执行的事件函数，并且传入相关的其他参数
      <a href="#" onClick={e => this.aClick(e, item, index)}>{item}</a>
      aClick(e, item, index) {
          e.preventDefault();
          console.log(item, index);
          console.log(e);
     }
#### 5、模块和组件
##### 5.1 模块： 向外提供特定功能的js程序，就是一个js文件
##### 5.2 组件：用来实现特定（局部）功能效果的代码集合（html/css/js）
#### 6、定义组件
##### 方式1：工厂函数组件（简单组件）
      接受带有数据的单个“ props”（代表属性）对象参数并返回React元素,使用参数：{props.属性名}
       function MyComponent(props) {
            return <h2>函数组件---{props.name}</h2>
        }
##### 方式2：ES6类组件  （复杂组件）
     使用参数：{this.props.属性名}
      class MyComponent2 extends React.Component{
            render(){
                return <h2>类组件---{this.props.name}----</h2>
            }
        }
代码示例：[使用工厂函数组件和ES6类组件](https://github.com/cqujlj/React/blob/master/html/html/03-components.html)
#### 7、组件的3个属性  ***
##### 7.1 state
     组件 --> 组件状态，通过与用户交互，实现不同状态，然后渲染UI，使得用户界面和数据保持一致
代码示例：[state的基本用法](https://github.com/cqujlj/React/blob/master/html/html/04-components-state.html)
###### 组件中的数据：
     1、参与界面更新的数据（数据流）：当数据变量时，需要重新渲染组件；定义在当前对象的state
           定义：在构造函数中：this.state = {定义的数据}
           更新状态：this.setState()
     2、不参与界面更新的数据：当数据变化时，不需要重新渲染
     note：React的数据流是自上而下的，所以是从父组件向子组件进行传递
###### (1)初始化state,通过一个类的构造函数来初始化this.state，类组件始终使用props调用基础构造函数
     constructor(props) {
       super(props);
           this.state = {
           isShowText: true
           }
     };
###### (2)获取state
     this.state.isShowText
###### (3)修改state
     this.setState({ isShowText : !this.state.isShowText})
     note：state是组件内部的状态（数据），不能够直接修改，必须要通过setState来改变值的状态，从而达到更新组件内部数据的作用
##### 7.2 setState({},fn):从React.Component继承来的
###### 7.2.1 原理:
     Component.prototype.setState = function(partialState, callback) {
       invariant(
         typeof partialState === 'object' ||
           typeof partialState === 'function' ||
           partialState == null,
         'setState(...): takes an object of state variables to update or a ' +
           'function which returns an object of state variables.',
       );
       this.updater.enqueueSetState(this, partialState, callback, 'setState');
     };
     通过调用setState来修改数据：
     当我们调用setState时，会重新执行render函数，根据最新的State来创建ReactElement对象；
     再根据最新的ReactElement对象，对DOM进行修改
###### 7.2.2 同步和异步
###### 在组件生命周期或React合成事件中，setState是异步；
    changeText() {
       this.setState({
         message: "newValue"
       })
       console.log(this.state.message); // oldValue
     }
     设计为异步的原因：避免频繁的render；因此会在获取道多个更新值之后才会批量render
     setSatate有两个参数，第二个参数为回调函数，回调函数会在更新后会执行，可以在回调函数中获立即取更新后的值
     或者在生命周期componentDidUpdate中立即获取更新后的值
     changeText() {
       this.setState({
         message: "newValue"
       }, () => {
         console.log(this.state.message); // newValue
       });
        console.log(this.state.message); // oldValue
     }
###### 在setTimeout或者原生dom事件中，setState是同步的
    例： changeText() {
            setTimeout(() => {
              this.setState({
                message: "newValue"
              });
              console.log(this.state.message); // newValue
            }, 0);
          }
     例： const btnEl = document.getElementById("btn");
            btnEl.addEventListener('click', () => {
              this.setState({
                message: "newValue"
              });
              console.log(this.state.message); // newValue
            })
###### 7.2.3 state合并
     setSatte的源码中源码中其实是有对 原对象 和 新对象进行合并的
     例：add(){
          this.setState({
               count:this.count+1
          })
          this.setState({
               count:this.count+1
          })
          this.setState({
               count:this.count+1
          })
          }
          执行add(),count不会+3，而是被合并了，只会+1；若想+3，可以在回调函数中操作
     例：
     add(){
          this.setState((state)=>{
               return{
                     count:this.count+1
               }
          })
          this.setState((state)=>{
               return{
                     count:this.count+1
               }
          })
           this.setState((state)=>{
               return{
                     count:this.count+1
               }
          })
        }
        执行add(),count会+3；因为state进行合并时，每次遍历都会调用回调函数
###### 7.2.4 react重新渲染流程
props/state发生改变 --> 触发render执行 --> 产生新的DOM树 -->  新旧DOM比较(diff) --> 比较产生差异进行更新 --> patch到真实DOM树
###### 7.2.5 diff算法
     （1）对比不同类型的元素
     （2）对比同一类型的元素
      (3) 对子节点进行递归
##### (附7) React性能优化
##### (附7.1) shouldComponentUpdate
     在react的生命周期里，通过shouldComponentUpdate来判断props和state的数据是否发生变化，
     有变化返回true，触发render，没变化则返回false，不触发render
##### (附7.2) PureComponent
     PureComponent可以进行react性能优化，避免不必要的render渲染
     原理：继承了react.component，自动加载 shouldComponentUpdate，
          当组件更新时，shouldComponentUpdate通过props和state的浅比较来实现shouldComponentUpdate，
          如果props和state没有发生变化，则返回false，不会触发render()
          某些情况下可以用PureComponent提升性能
###### note：
     PureComponent是浅比较，确保比较的数据类型是值类型
     如果是引用类型，不应当有深层次的数据变化

##### 7.3 props 
     组件内部的this.props属性是只读的不可修改，子组件只能通过props来传递参数
代码示例：[props的基本用法](https://github.com/cqujlj/React/blob/master/html/html/05-components-props.html)
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
###### 指定属性值的类型和必要性 --> 可以声明prop为指定的基本数据类型
     PersonMsg.prototype = {
          name : PropTypes.string.isRequired,   //name是必填项
          age : PropTypes.number,
          //requiredAny: React.PropTypes.any.isRequired,    // 不可空的任意类型
       };
###### PropTypes类型检查
     MyComponent.propTypes = {
     // 你可以将属性声明为 JS 原生类型，默认情况下
     // 这些属性都是可选的。
          arr: PropTypes.array,
          bool: PropTypes.bool,
          func: PropTypes.func,
          num: PropTypes.number,
          obj: PropTypes.object,
          str: PropTypes.string,
          sym: PropTypes.symbol,
     
     // 任何可被渲染的元素（包括数字、字符串、元素或数组）
     // (或 Fragment) 也包含这些类型。
          optionalNode: PropTypes.node,
          optionalElement: PropTypes.element,   // 声明为任何可以被render的类型
          optionalElementType: PropTypes.elementType,  //一个 React 元素类型（即，MyComponent)
          optionalMessage: PropTypes.instanceOf(Message),  // JS 的 instanceof 操作符。 声明为类的实例
          optionalEnum: PropTypes.oneOf(['News', 'Photos']),//指定它为枚举类型
     // 一个对象可以是几种类型中的任意一个类型
          optionalUnion: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.instanceOf(Message)
     ]),
      // 可以指定一个数组由某一类型的元素组成
          optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
     // 可以指定一个对象由某一类型的值组成
          optionalObjectOf: PropTypes.objectOf(PropTypes.number),
     // 可以指定一个对象由特定的类型值组成
          optionalObjectWithShape: PropTypes.shape({
          color: PropTypes.string,
          fontSize: PropTypes.number
     ),
      children: PropTypes.element.isRequired //通过 PropTypes.element 来确保传递给组件的 children 中只包含一个元素
     }
###### 指定默认值
     PersonMsg.defaultProps = {
        age:18,
     };
######  将对象的所有属性通过props传递：    <Person{...person}>
###### 在父组件中设置 state， 并通过在子组件上使用 props 将其传递到子组件上
     ReactDOM.render(<PersonMsg {...person}/>, document.getElementById('idName'))
代码示例：[父子组件传值](https://github.com/cqujlj/React/blob/master/html/html/06-state%24%24props.html)
##### 7.3 refs --> 事件处理
代码示例：[refs事件处理](https://github.com/cqujlj/React/blob/master/html/html/06-components-refs.html)
######  组件内的标签都可以定义ref属性来标识自己
     方式1：<input type="text" ref="content"/>
     方式2：<input type="text" ref={input=>this.input=input}/>   //将当前的input 赋值给组件里面的input
###### 事件处理
     通过onXxxx属性来指定组件内的事件处理函数，如onClick、onBlur -->  <input type="text"  onBlur={this.handleBlur}/>
     react中的事件是通过委托方式处理的（委托给最外层元素）
     通过event.target可以得到发生事件的DOM元素 --》 handleBlur(event){  alert(event.target.value) }
     note：要在constructor中给处理函数强制绑定this --> this.handleBlur=this.handleClick.bind(this)
代码实例：[组件的组合使用](https://github.com/cqujlj/React/blob/master/html/html/componentCombine.html)
#### 8、条件渲染  --> 在React中，所有的条件判断都和普通的JavaScript代码一致
##### 8.1 条件判断语句
###### 当逻辑较多时，通过条件判断
      if (this.state.isLogin) {
         titleJsx = <h2>欢迎回来~</h2>
       } else {
         titleJsx = <h2>请先登录~</h2>
      }
##### 8.2 三元运算符
###### 适用于没有太多逻辑的代码：只是根据不同的条件直接返回不同的结果
     <button onClick={e => this.loginBtnClick()}>{this.state.isLogin ? "退出": "登录"}</button>
##### 8.3 &&与运算符
     适用情况：如果条件成立，渲染某一个组件，如果条件不成立，什么内容也不渲染
     {this.state.isLogin && <h2>{this.state.username}</h2>}
     三元运算符做法：{this.state.isLogin ? <h2>{this.state.username}</h2>: null}
     note：在组件的render方法中返回null并不会影响组件的生命周期
##### 8.4 display --> vue种的v-show效果
     <h2 style={{display: nameDisplay}}>{username}</h2>
代码实例[条件渲染-条件判断语句](https://github.com/cqujlj/React/blob/master/html/html/07-Conditional%20Rendering.html)
#### 9、表单
     react的表单元素通常会保持一些内部的state；可变的状态通常保存在组件的状态属性中，并且只能用 setState() 方法进行更新
代码实例[表单组件的使用](https://github.com/cqujlj/React/blob/master/html/html/08-froms.html) 
##### 包含表单组件的分类
###### 1、受控组件：表单项输入数据能够自动收集成状态
     例：<input type="password" value={this.state.pwd} onChange={this.handleChange}/>  //textarea、select都可以
     由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，这使得 React 的 state 成为唯一数据源
     对于受控组件来说，输入的值始终由 React 的 state 驱动
     当要处理多个input时，给每个input元素设置name属性，根据event.target.name 的值选择要执行的操作
###### 2、非受控组件：需要时才手动读取表单输入框中的数据
     例：<input type="text" ref = {input => this.nameInput = input}/>
     非受控组件没有设置value值，在需要该输入值时，手动读取：const name = this.nameInput.value
代码实例：[textarea、select表单实例](https://github.com/cqujlj/React/blob/master/html/html/08-froms-select.html)
#### 10、状态提升
     多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去
     如：子组件1和子组件2都各自保存各自的 state ，要实现数据共享，就需要使用状态提升；
         --> 即将两个组件需要共享的数据保存在共同的父组件中，然后子组件通过 props 获取父组件数据
      父组件中： this.state = { content: '' };
      子组件：<input type='text' value={ this.props.content } onChange={ this.handleChange } />
代码实例：[状态提升](https://github.com/cqujlj/React/blob/master/html/html/09-Lifting%20State%20Up.html)
#### 11、组合 VS 继承
     推荐使用组合而非继承来实现组件间的代码重用
代码实例[父子组件](https://github.com/cqujlj/React/blob/master/html/html/11-Composition-Inheritance.html)
##### 11.1  children prop
     组件可以接受任意 props，包括基本数据类型，React 元素以及函数
     组件使用一个特殊的 children prop 来将他们的子组件传递到渲染结果中 （组件的属性可以是组件,可以将任何东西作为 props 进行传递）
#### 12、组件化的流程
##### (1) 拆分组件，划分为组件层级
##### (2) 实现静态组件：组件内指定render(),暂时没有动态数据、没有交互
##### (3) 实现动态组件
###### 动态显示初始化数据
          Q1：数据保存在哪个组件内？
            若只有一个组件需要使用该数据，则数据初始化在该组件内；
            若多个组件需要使用该数据，则数据在这些组件的共同父组件内进行初始化
          Q2：子组件中不能直接改变父组件的状态，那如何修改state？
             父组件定义函数，传递给子组件，由组件调用来修改state  （state在哪个组件，更新state的行为就应该定义在哪个组件）
###### 实现交互功能
      绑定事件监听
#### 13、父子组件通信
##### 13.1 父组件传值给子组件
###### 子组件是类组件：
     class ChildCpn1 extends Component {
       constructor(props) {
       super(props);
     }
###### 子组件是函数组件
     function ChildCpn2(props) {
       const {name, age, height} = props;
      }
###### 在父组件中
     <ChildCpn1 name="why" age="18" height="1.88"/>
     <ChildCpn2 name="kobe" age="30" height="1.98"/>
##### 13.2 子组件传值给父组件
     在子组件CounterButton中：<button onClick={{props.btnClick}>{props.operator}</button>   
     在父组件中： <CounterButton operator="+1" btnClick={e => this.changeCounter(1)} />
     让父组件给子组件传递一个回调函数，在子组件中调用这个函数即可
##### 13.3 兄弟（同级）组件传值
     安装pubsub：npm install --save pubsub-js
     使用：import PubSub from "pubsub-js"
     发数据的同级组件：
          pubsub(){ 
           PubSub.publish("event",this.state.msg)
          }
          <button onClick={this.pubsub.bind(this)}>点我给兄弟发数据</button>
     接受数据的同级组件：
          PubSub.subscribe((evt,msg)=>{
               console.log(evt,msg)
           })
#### 14、插槽的使用
##### 14.1 children实现
     每个组件都可以获取到 props.children：它包含组件的开始标签和结束标签之间的内容
     在子组件NavBar中： {/*有多个元素时，children指向一个数组*/}
       <div className="nav-bar">
         <div className="item left">{this.props.children[0]}</div>
         <div className="item center">{this.props.children[1]}</div>
         <div className="item right">{this.props.children[2]}</div>
       </div>
      父组件中：
        <NavBar>
          <div>返回</div>
          <div>购物街</div>
          <div>更多</div>
        </NavBar>
     缺点：通过索引值获取传入的元素很容易出错，不能精准的获取传入的原生
##### 14.2 props实现
     子组件NavBar中：
     const {leftSlot,centerSlot,rightSlot} = this.props
     <div className="nav-bar">
        <div className="item left">{leftSlot}</div>
        <div className="item center">{centerSlot}</div>
        <div className="item right">{rightSlot}</div>
      </div>
      父组件中：
      render() {
    const navLeft = <div>返回</div>;
    const navCenter = <div>购物街</div>;
    const navRight = <div>更多</div>;
    return (
      <div>
        <NavBar leftSlot={navLeft} centerSlot={navCenter} rightSlot={navRight} />
      </div>
        )
     }
  优点：能根据属性名，在传入和获取时更加的精准
#### 15. 路由 react-router-dom
##### 15.1安装：npm install --sava react-router-dom
     react-router-dom:更多选项
     react-router:提供核心API
     路由模式：HashRouter ：
              BrowerRouter
##### 15.2 路由的使用
###### (1)导入：import {Route,Link,NavLink,Redirect} from "react-router-dom"
###### (2)index.js中，路由模式包裹根组件：ReactDOM.render( <BrowserRouter> <App /> </BrowserRouter>  document.getElementById('root'));
###### (3)路由导航/配置：
           导入组件：import Home from './components/home/Home'
                   import Profile from './components/profile/Profile'
           路由跳转：<Link to="/home" >Home页面 </Link>   或者<NavLink>
                    <Link to="/profile">Profile页面 </Link>
                    <Redirect from='/' to='/home'/>   {/*重定向，每次打开网页都回直接到home页面*/}
           路由配置：
                    <Route path='/home' component = {Home}/>
                    <Route path='/profile' component = {Profile}/>
          note:
          1、Link VS NavLink
          Link:为应用提供声明式的、无障碍导航; 
          属性 to:string:跳转到某个地址  
               to:objetc:需要跳转到的地址（location）  
               replace:为 true 时，点击链接后将使用新地址替换掉访问历史记录里面的原地址,默认为false，点击链接后将在原有访问历史记录的基础上添加一个新的纪录
          NavLink：是<Link> 的一个特定版本, 会在匹配上当前 URL 的时候会给已经渲染的元素添加样式参数
          2、<Switch>：只渲染出第一个与当前访问地址匹配的 <Route> 若没有匹配则渲染 <Redirect>
          3、<Redirect>：<Redirect> 渲染时将导航到一个新地址，这个新地址覆盖在访问历史信息里面的本该访问的那个地址。
##### 15.3 路由传参
###### (1)prams方式：
     (1)配置参数：<Route path="/home/:name"/>
     (2)发送参数：<Link to='/home/JACK'>跳转到Home</Link>
     (3)接受参数：this.props.match.params.name
###### (2)query方式：
     不需要配置参数，直接发送/接收即可
     (1)发送：<Link to={{ pathname='/home',query:{name:"JACK"}}}>跳转到Home</Link>
          动态路由方式发送：<button onClick={()=>{ this.props.history.push({pathname='/home',query:{name:"JACK"})}}>点我去Home</button>
     (2)接收：this.props.location.query.name
##### 15.4 路由渲染方式
     (1)<Route component>:只有当访问不地址和路由匹配时，一个react component才会被渲染；此时组件接受route props(match,location,history)
     (2)<Route render>:适用于内联渲染 不会引起意料之外得中心挂载
     (3)<Route children>：不管地址是否匹配都会被调用
##### 15.5 Route的三个属性
     (1)path(string)：路由匹配路径 如果没有指定path，则该路由每次都会被匹配渲染
     (2)exact(bool)：true：要求path和location.pathname必须完全匹配
     (3)strict(bool)：true:有结尾斜线得路径只能匹配有斜线得location.pathname
##### 15.6 路由切换的三个属性
     (1)location：指你当前的位置，将要去的位置，或是之前所在的位置
     (2)match：match 对象包含了 <Route path> 如何与 URL 匹配的信息,如：params，url，
     (3)history：可变的，建议从 <Route> 的 prop 里来获取 location；常用方法：push()  go() 
##### 15.7 WithRouter:让不是路由切换的组件也具有路由切换的三个属性
     function App(){
        let [val0,setVal0] = useState(0);
        let [val1,setVal1] = useState(1);
       return(
         <div>
               使用数据：{val}----{val1}
               修改数据：<bytton onClick={()=>{setVal0(val0 + 1)}}>点击修改</button>
         </div>
       )
     }
     userState:定义一个状态，返回一个数组[当前状态值，用于更改状态的函数]
#### 16. Hook
##### 16.1 useState: 简单状态管理
     const [num,setNum] = useState(0);
     · useState 会返回一对值:num：当前状态和一个让你更新它的函数：setNum();
     · 多次调用useState()，一个函数组件可以拥有多个状态
     替代类组件的this.state ={} ,setState()
     例：const [state, setState] = useState(initialState);    //启用函数组件中的状态
          setState(newState) 或  setState(state => state + 1)   //更新组件状态；组件重新渲染后，状态接收新值newState
       note：一些规则：
       (1) 仅顶层调用 Hook ：不能在循环，条件，嵌套函数等中调用useState()。在多个useState()调用中，渲染之间的调用顺序必须相同。
       (2) 仅从React 函数调用 Hook:必须仅在函数组件或自定义钩子内部调用useState()。
##### 16.2 useEffect:Effect Hook 可以让你在函数组件中执行副作用操作（网络请求，监听事件....）
      useEffect(fn,[]) //fn:要执行的操作，[]:监控的数据；返回一个回调函数，作用于清除上一次副作用遗留下来的状态
     默认情况下，它在第一次渲染之后和每次监控数据发生更新之后都会执行fn
     可看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 的组合
     useEffect 可以在组件渲染后实现各种不同的副作用。有些副作用可能需要清除，所以需要返回一个函数，不必清除，则不需要返回。
##### 16.3 useRef:可变引用useRef()保存可变数据，这些数据在更改时不会触发重新渲染
     useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。
     例: const childrenRef = useRef(null)  //函数组件每次 render 之后，childrenRef不会被重复申明
         console.log(childrenRef.current)
         例：function CustomTextInput(props) {
                 const textInput = useRef(null);  // 这里必须声明 textInput，这样 ref 才可以引用它
                 function handleClick() {
                   textInput.current.focus();
                 }
                 return (
                   <div>
                     <input
                       type="text"
                       ref={textInput} />
                     <input
                       type="button"
                       value="Focus the text input"
                       onClick={handleClick}
                     />
                   </div>
                 );
               }
##### 16.4 useCallback:可以保证，无论 render 多少次，我们的函数都是同一个函数，减小不断创建的开销
     例： const onClick = useCallback(() => {
           console.log('button click')
          }, [])
#### 17. redux
     专门的状态管理库，集中管理react中的多个组件的状态
     需求状态：某个组件的状态需要共享的时候、组件中的状态需要改变另一个组件的状态时
##### 三大原则：
     (1)整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中；当需要拆分数据处理逻辑时，可使用reducer 组合 而不是创建多个store
     (2)唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象
     (3)使用纯函数来操作：为了描述 action 如何改变 state tree ，你需要编写 reducers
##### (1) 安装：npm install --save redux
     附加包：React 绑定库、开发者工具
     npm install --save react-redux
     npm install --save-dev redux-devtools
##### (2) 创建reducer.js：
     reducer：Reducer 只是一些纯函数(高阶函数)，它接收先前的 state 和 action，并返回新的 state
     决定每个 action 如何改变应用的 state
     (previousState, action) => newState
     例：const products = (state ={list:[],page:1,total:0},action)=>{
              switch (action.type) {
                  case "ADD":
                      console.log(action);
                      return {...state};  ////修改redux中的数据，必须在reducer中进行
                  default:
                      return state;
              }
          };
###### ·state
     ·store对象包含所有数据
     ·获取当前时刻的state：store.getState();
     ·获取某个时点的数据，多store生成快照： const state = store.getState();
     · 更新state：dispatch(action)
     · 注册监听器：subscribe(listener) 注册监听器
     · 注销监听器：subscribe(listener) 返回的函数注销监听器
##### (3) action.js
     action：发出做某件事的请求，本身不做任何逻辑处理，只是一个纯函数（在js中就是一个普通的对象）
     action 内必须使用一个字符串类型的type字段来表示将要执行的动作；为了维护命名一致性，一般讲action type汇总到一个actionType.js文件中，写成一个常量
     action是一个对象，type属性是必要的，标识action的名称；
     改变内部 state 惟一方法是 dispatch 一个 action
     在组件中执行某个时间调用action去改变state：props.dispatch({ type:"ADD"})  //
     nnote：最好通过创建函数生成 action 对象，而不是在你 dispatch 的时候内联生成它们
     例：export add = (num)=>{
               return{
                    type:"ADD",
                    data:num
                 }
               }
##### (4) 创建store.js：保存数据的地方，只能有一个store.js
    store.js: import {createStore} from "redux"
              import {data} from "./reducer"
              export const store = createStore(data)   //createStore:用于生成store，接受一个函数作为参数，返回新生成的store对象
##### (5) 在组件中使用
     react-redux 提供了两个重要的对象，Provider 和 connect；
     Provider使 React 组件可被连接（connectable）；
     connect把 React 组件和 Redux 的 store 真正连接起来
###### Provider组件
     导入：import {Provider} from "react-redux"
          import store from "./store/store";
     包裹根组件，并传递state，Provider会帮我们维护state
          · 在index.js中：
          导入Provider：import {Provider} from "react-redux"
          包裹根组件： <Provider store={store}>    {/* 将store的数据放到了整个项目中，一个项目只有一个根store*/}
                          <App/> 
                       </Provider>,
###### connect详解：connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])  返回一个加强之后的组件
          作用：包装原组件，将state和action通过props的方式传入到原组件内部；监听store tree变化，使其包装的原组件可以响应state变化
          connect有四个参数，
          (1) mapStateToProps(state, ownProps)  
               把store的数组作为props绑定到组件上
               state：redux中的state
               ownProps：是组件自己的props
                    例： const mapStateToProps = state =>{
                              return{
                                   userMessage: state.uerState,
                                   projectMessage: state.projectState
                              }
                         }
          (2) mapDispatchToProps(dispatch,ownProps)
               将 action 作为 props 绑定到组件上
               dispatch:是store中的dispatch
                    例：requestActions是redux action，requestFunc是action内的一个函数 dispatch 'request' 就会触发saga里面的数据请求
                    const mapDispatch = dispatch =>({
                         requestData: params => dispatch(requestActions.requestFunc('request', {...params}))   
                    })
                    在UI发起数据请求：this.props.requestData({...你要传入的参数});
          (3) mergeProps <—— Object.assign ：将stateProps、dispatchProps和ownProps进行合并
          (4) option
                使用connect来包裹你的MyCom connect(mapStateToProps,mapDispatch) (withRouter(MyCom));
                这样，组件MyCom的props里面就有以上的函数和state，可以直接调用；this.props.xxxx
###### 在Product.js组件使用redux的state
          import {connect} from "react-redux"  //导入connect
          import {loadProduct} from "../../../store/actions/productAction";  //导入action方法
          export default connect(state => state.products)(List) //导出组件时
##### (6) combineReducers(Object):
     · 随着应用变大，你可以把它拆成多个小的 reducers，分别独立地操作 state tree 的不同部分；
     · 每个 reducer 只负责管理全局 state 中它负责的一部分。每个 reducer 的 state 参数都不同，分别对应它管理的那部分 state 数据
     · 把不同的reducer作为一个Object的value值，最终合并成一个rootReducer，传给createStore()
     · 合并之后的rootReducer可以调用各个reducer，并把它们结果合并成一个state，
     · 每个 reducer 根据它们的 key 来筛选出 state 中的一部分数据并处理
     例：
          有两个reducer：noticeReducer.js、productReducer.js
          const reducers = {
               notice:noticeReducer,
               product:productReducer
          }
          const rootReducer = combineReducers(reducers);
     note:combineReducers包裹的reducer会按照配置顺序进行调用
          每一次reduce调用传递的state都是上一次的state，每个reducer之间互不干扰
#### 18、异步action处理
     1每个API请求需要diapatch至少三种action：
     (1) 通知reducer请求开始 --- {type:"FETCH-POSTS"}
     (2) 通知reducer请求成功 --- {type:"FETCH-POSTS",status:"success",response:{...}}
     (3) 通知reducer请求失败 --- {type:"FETCH-POSTS",status:"error",error:"Oops}
##### 18.1 处理异步的方式：中间件
     默认情况下，createStore创建的store没有中间件，只支持同步数据流
     使用applyMiddleware()来增强，处理异步问题；
###### 中间件Middleware：
     独立运行于各个框架之间的代码，运行在action发送出去到达reducer之间的一段代码，
     本质是一个函数：可以访问请求对象和响应对象，可以对请求进行拦截处理，处理后将控制权向下传递，可以终止请求，向客户端做出响应；
###### applyMiddleware():该方法可以使用多个中间件，将所有中间件组成一个数组，依次执行。
##### 18.2 *** Middleware API:saga
      redux-saga：是一个用于管理应用程序 Side Effect（例如异步获取数据，访问浏览器缓存等）的 library
      createSagaMiddleware(options): 创建一个 redux middleware，并将saga连接到redux store，通过createStore的第3个参数传入
      middleware.run(saga,...args): 动态运行saga，只能在applyMiddleware阶段之后执行saga
###### 安装：npm install --save redux-saga
     例：
     1、创建一个homeSaga.js:
          import {call,select} from "redux-saga/effects"
          export function* homeSaga(){
               console.log("homeSaga");
               const user = yield  select(state => state.username)  //选择需要的数据
               const res = yield call(axios.get,"url",{...user});  //异步请求
               console.log(res)
          }
     note：当有多个saga分别管理不同页面的异步请求，
          如saga1.js  saga2.js  saga3.js
          export function* defSaga(){
               yield all(saga1(),saga2(),saga3())
          }
          all：同时并发多个 action，没有顺序
     2、在store.js进行连接
          import {reducer} from "./reducer"
          import {homeSaga} from "./saga/homeSaga"
          import {createStore,applyMiddleware} from "redux"
          import createSagaMiddleware from "redux-saga"
          const sagaMiddleware = createSagaMiddleware();  //创建sagaMiddleware，最后需要调用run来执行一个saga
          const store = createStore(reducer,{},applyMiddleware(sagaMiddleware)); //传入reducer、state、中间件
          export default store
          sagaMiddleware.run(homeSaga);  //最后动态运行一下homeSaga
##### 18.3 saga辅助函数：监听action，只要action发送过来，就会触发对应的saga函数调用
##### (1) takeEvery(pattern,saga,...args):允许同时启动多个异步任务  
     在发起dispatch到store并且匹配pattern的每个action
     takeEvery('*')（使用通配符 * 模式），能捕获发起的所有类型的 action。
##### (2) takeLatest(pattern,saga,...args):在任何时刻 takeLatest只允许一个异步任务在执行 ，该任务为最后被启动那个   
     在发起dispatch到store并且匹配pattern的每个action，并自动取消之前已经启动但仍在执行的任务；
##### (3) throttle(ms,pattern,saga,...args):
     在发起dispatch到store并且匹配pattern的一个action，会执行一个异步，同时会接收一个对应action的异步任务，放到底层buffer(至多保留最近的一个)，
     第一个ms毫秒之内将不会执行异步任务 ？？？
##### 18.4 Effect创建器 
     effect：发送给 middleware 的指令以执行某些操作（Effect 是一个简单的对象，这个对象包含了一些给 middleware 解释执行的信息）
###### (1)call(fn, ...args):方法调用，会阻塞
     或者：yield apply(obj, obj.method, [arg1, arg2, ...])
      例：const res = yield call(axios.get,"url",{...user});  //调用axios.get进行数据请求,call返回一个纯文本对象
      yield会暂停Generator的执行，直到返回的 Promise 被 resolve或者 reject
      因此：call 是一个会阻塞的 Effect。即 Generator 在调用结束之前不能执行或处理任何其他事情
      同步执行两个异步任务：
            const [users, repos] = yield [
                 call(fetch, '/users'),
                 call(fetch, '/repos')
           ]
###### (2)select(selector,...args)
     例：  const user = yield  select(state => state.username)   //选择需要的数据
###### (3) take(pattern):暂停 Generator 直到一个匹配的 action 被发起，(等待一个action发生)只发生一次，
     与takeEvery相同效果写法：
          while（true）{
               yield take("Pattern",data);
          }
###### (4) put(action):派发action
     yield put({ type: 'HOME_RECEIVED', hoem})
###### (5) fork(fn, ...args),无阻塞调用
     当我们 fork 一个 任务，任务会在后台启动，调用者也可以继续它自己的流程，而不用等待被 fork 的任务结束
###### (6) cancel(task):取消任务调用
      const task = yield fork(authorize, user, password)
      cancel(task)
#### 20、懒加载
##### 20.1 import动态加载
     const MyCom = React.lazy(() => import('./MyCom'));
     React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件
     应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级
     import {Suspense} from "react"
     function App(){
          return(
               <div>
                    <suqpense fallback={<div>Loading...</div>}>
                         <Home/>
                    </suspense>
               </div>
          )
     }
     Suspense组件可以包裹多个懒加载组件，可以置于懒加载组件之上的任意位置
##### 20.2 路由懒加载
     const Home = lazy(() => import('./routes/Home'));
     const About = lazy(() => import('./routes/About'));
     const App = () => (
       <Router>
         <Suspense fallback={<div>Loading...</div>}>
           <Switch>
             <Route exact path="/" component={Home}/>
             <Route path="/about" component={About}/>
           </Switch>
         </Suspense>
       </Router>
     );
##### 20.3 命名导出
     export const MyComponent = /* ... */;
     创建一个中间模块，来重新导出为默认模块 export { MyComponent as default } from "./ManyComponents.js";
     const MyComponent = lazy(() => import("./MyComponent.js"));
#### 21 React中的css
##### 21.1 内联样式：
     <div style={{color:"red",fontSize:"24px"}}>内联样式</div>
     样式之间不会冲突，可以动态获取state的状态，动态改变样式；
     驼峰写法
##### 21.2 普通css样式
     普通css就是全局css，任何一个组件的样式规则对整个页面都有效，会导致样式冲突
     解决方法：使用唯一的className
##### 21.3 *css module*
     类似于webpack环境配置下可以使用，React脚手架内置了css modules，解决了局部作用域问题
     写法：<div className={style.title}>css modules 样式</div>
     类名不能使用连接符：className = {style.hemo-title}  无法识别
     不方便动态修改样式
###### (1) css modules产生局部作用域的方法--> 产生唯一的className
     将样式文件输入到style对象，比如style.title代表一个class，构建工具会将类名style.title编译成一个哈希字符串，（唯一的,只对当前组件有效)
###### (2) css modules产生全局作用域
     global(.className):声明一个全局规则，这个类名则不会被编译成hash字符串，对整个页面有效
     :local(.className)是显示的局部作用域语法
##### (3) 配置webpack运用相关loader（见下下一个问题）
##### (4) class的组件
     · 一个选择器可以选择继承另一个选择器的规则，成为组合composition
          .title{ color : red}   
          .text{ fontSize : 24px, composes : title}
          <div className = {style.text}>ABCD</div> 编译之后变成 <div className = {titleHashx,textHashx}>ABCD</div>
     · 继承其他模块
          .text{ fontSize : 24px; composes : title from './another.css' }
##### 21.4 css in js：将样式CSS写入到JavaScript中，并且可以方便的使用JavaScript的状态
#### 22 webpack的配置
##### 22.1 安装相关依赖包：
     全局安装webpack：npm i webpack -g
     安装babel相关包：babel-loader @babel.core  @babel/preset-env @babel/preset-react @babel/runtime ......
     安装处理样式的依赖包：npm install -D less-loader css-loader style-loader
     安装处理图片文件的依赖包：npm install -D url-loader file-loader ......
##### 22.2 配置webpack.config.js文件
     const path = require("path");
     const webpack = require("webpack");
     const config = {
     /*文件入口，一般是src下的index.js是整个项目的入口*/
       entry: './src/index.js',
       /*文件出口：path：用于输出文件的文件名；filename：输出文件名 publicPath：*/
       output:{
          path : __dirname+ '/res/js',
          filename : '[name].js',
          publicPath: 'http://127.0.0.1:3002/js/'   /*publicPath 可以留空，并且在入口起点文件运行时动态设置*/
       },
       resolve : {
          extensions : ['.js','.jsx'],   //表示js  jsx文件不写后缀也可以引用
          alias: { '@': resolve('src')    }  //配置别名 // 这样配置后 @ 可以指向 src 目录
       },
       module:{
          rules:[
                    {
                         test: /\/.(jsx|js)?$/,  //编译js jsx文件，使用babel-loader
                         exclude: /node_modules/,  //该目录下的js jsx文件不打包
                         loader: 'babel-loader'  //options和plugins配置在文件.babelrc中配置
                    },
                    {
                         test:/\.less$/,  //编译less文件，使用['style-loader','css-loader','less-loader']  注意顺序，Webpack Loader 解析顺序从右向左
                         use:[
                              'style-loader',
                              'css-loader?modules&localIndentName = [path][name]---[local]---[hash:base64:5]',
                              'less-loader'
                         ]
                    },
                    {
                         test:/\.css$/,  //编译css文件
                         loader:'style-loader!css-loader'
                         
                    },
                    {
                         test:/\.(png|jpg|jpeg|svg|gif)?$/,
                         loader:'url-loader?limit=8192'
                    },
               ]
       }
     };
     module.exports = config;
###### .babelrc配置 （适用于简单的静态配置）
     {
          "presets":[
               [
                    "@babel/preset-env",   //根据配置转换成浏览器支持的语法 ES6 ES7 --> ES5
                    {
                         "useBuiltIns":"usage",
                         "debug":false
                    }
               ],
               "@babel/preset-react"   //用于react语法转换
          ],
          "plugins": [
               "@babel/plugin-proposal-export-default-form",
               "@babel/plugin-proposal-class-properties"
          ]
     }
     babel执行presets和plugins的顺序如下：
         · Plugins先于Presets执行。
         · Plugins由数组中的第一个plugin开始依次执行。
         · Presets与Plugins执行顺序相反，由数组中最后一个preset开始执行
         · 完整的plugins文档：https://babeljs.io/docs/en/plugins
## 三、 高阶教程
#### 1、context
     Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法
     Context 设计目的是为了共享那些对于一个组件树而言是“全局”的数据
     例：
          // Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
          // 为当前的 theme 创建一个 context（defaultValue)
          const ThemeContext = React.createContext({nackName:"nini",age:17});  
      在函数组件中使用context：
      组件ProfileHeader：
           function ProfileHeader(props) {
            return (
              <div>
                <UserContext.Consumer>  //订阅context的变更
                  {value => {
                    return (
                      <div>
                        <h2>用户昵称: {value.nickname}</h2>
                        <h2>用户等级: {value.level}</h2>
                      </div>
                    )
                  }}
                </UserContext.Consumer>
              </div>
            )
          }
          const ThemeContext = React.createContext({nickName:"NINI",age:"31"})
        组件Profile:
          function Profile(){
               return(
                    <div>
                         <UserContext.Consumer>
                                {value => {
                                  return (
                                    <ThemeContext.Consumer>
                                      {
                                        theme => (
                                          <div>
                                            <ProfileHeader/>  //这里取到ThemeContext的值
                                            <h2 style={theme}>用户昵称: {value.nickname}</h2>  //这里取ThemeContext  '就近原则'
                                            <h2 style={theme}>用户等级: {value.level}</h2>
                                          </div>
                                        )
                                      }
                                    </ThemeContext.Consumer>
                                  )
                                }}
                         </UserContext.Consumer>
                    </div>
               )
          }
#### 2、事件总线
     安装：npm install events
     创建EventEmitter对象：eventBus对象；
     发出事件：eventBus.emit("事件名称", 参数列表);
     监听事件：eventBus.addListener("事件名称", 监听函数)；
     移除事件：eventBus.removeListener("事件名称", 监听函数)；
#### 3、高阶组件：高阶组件是参数为组件，返回值为新组件的函数
     高阶函数的定义：至少满足以下条件之一：
     · 接受一个或多个函数作为输入； 输出一个函数；
     · JavaScript中比较常见的filter、map、reduce都是高阶函数。
      *高阶组件 本身不是一个组件，而是一个函数；这个函数的参数是一个组件，返回值也是一个组件*
     例如：redux中的connect、react-router中的withRouter；
     编写：function higherOrderComponent(WrapperComponent) {
            return class NewComponent extends PureComponent {
              render() {
                return <WrapperComponent/>
              }
            }
          }
          class App extends PureComponent {
            render() {
              return (
                <div>
                  App
                </div>
              )
            }
          }
         //调用 const EnhancedComponent = higherOrderComponent(WrappedComponent);
          export default EnhancedComponent：
          ？？？？？？？？
