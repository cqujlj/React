# React  
     用于构建用户界面的JavaScript库
     声明式编程、组件化开发、多平台适配、
## 三个库
##### 1、react.js：React的核心库，包含react所必须的核心代码
##### 2、react-dom.js：提供操作DOM的react扩展库，react渲染在不同平台所需要的核心代码
##### 3、babel.min.js：将ES6代码转换成ES6、jsx语法转换成JavaScript代码
## 添加依赖
##### 1、直接CDN引入：
     react依赖：https://unpkg.com/react@16/umd/react.development.js
     react-dom依赖：https://unpkg.com/react-dom@16/umd/react-dom.development.js
     babel依赖：https://unpkg.com/babel-standalone@6/babel.min.js
##### 2、下载，添加本地依赖
##### 3、通过npm管理
     npm i react --save
     npm i react-dom --save
     npm i babel-standalone --save
## React生命周期
#### 广义上：挂载、渲染、卸载
![react lifeCycle](https://github.com/cqujlj/React/blob/master/img/react.jpeg)
#### 1、初始化阶段 initialization
#### (1) constructor()
     完成react数据的初始化，可接受两个参数：props和context；
     在函数内部使用这两个参数时需要使用super()传入
       constructor(props) {
                super(props);   //必须使用super，否则会导致this指向错误
            }
### 2、挂载阶段 Mounting
##### (1) componentWillMount()
       一般在服务端渲染时使用。代表的过程时：组件已由constructor()初始化数据后，但是DOM还没有渲染
##### (2) componentDidMount()
      组件第一次渲染完成，DOM节点已经生成；在这里可以调用ajax请求，返回数据setState后组件会重新渲染
##### (3)getDerivedStateFromProps
     将传入的props映射到state上面,替代componentWillReceiveProps
### 3、更新阶段 Update
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
### 4、卸载阶段 Unmounting
##### (1) componentWillUnmount ()
      完成组件的卸载和数据的销毁
      1、clear在组件中所有的setTimeout、setInterval
      2、移除所有组件中监听 removeEventlistener
      3、在组件中的ajax请求返回setState,而你组件销毁的时候，请求还未完成，报warning
## React JavaScript XML（JSX）: 用于申明react当中的元素 
### 基本用法：
#### 1、创建VDOM元素对象(JSX的顶层只能有一个根元素)
      const element = <h1> hello, react </h1>    //note： JSX语法，不是字符串、不是HTML
#### 2、元素渲染
      ReactDOM.render(VOM,containerDOM）   //会覆盖挂载到的containerDOM原生中的所有内容，引入组件可解决这个问题
代码实例：[firstReact](https://github.com/cqujlj/React/blob/master/html/01-firstReact.html)
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
代码实例：[展示列表数据](https://github.com/cqujlj/React/blob/master/html/02-listData.html)
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
##### 方式2：ES6类组件  （复杂组件）
     使用参数：{this.props.属性名}
代码示例：[使用工厂函数组件和ES6类组件](https://github.com/cqujlj/React/blob/master/html/03-components.html)
#### 7、组件的3个属性  ***
##### 7.1 state
     组件 --> 组件状态，通过与用户交互，实现不同状态，然后渲染UI，使得用户界面和数据保持一致
代码示例：[state的基本用法](https://github.com/cqujlj/React/blob/master/html/04-components-state.html)
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
###### (2)获取stat
     this.state.isShowText
###### (3)修改state
     this.setState({ isShowText : !this.state.isShowText})
     note：state是组件内部的状态（数据），不能够直接修改，必须要通过setState来改变值的状态，从而达到更新组件内部数据的作用
##### 7.2 props 
     组件内部的this.props属性是只读的不可修改，子组件只能通过props来传递参数
代码示例：[props的基本用法](https://github.com/cqujlj/React/blob/master/html/05-components-props.html)
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
代码示例：[父子组件传值](https://github.com/cqujlj/React/blob/master/html/06-state$$props.html)
##### 7.3 refs --> 事件处理
代码示例：[refs事件处理](html/06-components-refs.html)
######  组件内的标签都可以定义ref属性来标识自己
     方式1：<input type="text" ref="content"/>
     方式2：<input type="text" ref={input=>this.input=input}/>   //将当前的input 赋值给组件里面的input
###### 事件处理
     通过onXxxx属性来指定组件内的事件处理函数，如onClick、onBlur -->  <input type="text"  onBlur={this.handleBlur}/>
     react中的事件是通过委托方式处理的（委托给最外层元素）
     通过event.target可以得到发生事件的DOM元素 --》 handleBlur(event){  alert(event.target.value) }
     note：要在constructor中给处理函数强制绑定this --> this.handleBlur=this.handleClick.bind(this)
代码实例：[组件的组合使用](html/componentCombine.html)
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
代码实例[条件渲染-条件判断语句](https://github.com/cqujlj/React/blob/master/html/07-Conditional%20Rendering.html)
#### 9、表单
     react的表单元素通常会保持一些内部的state；可变的状态通常保存在组件的状态属性中，并且只能用 setState() 方法进行更新
代码实例[表单组件的使用](https://github.com/cqujlj/React/blob/master/html/08-froms.html) 
##### 包含表单组件的分类
###### 1、受控组件：表单项输入数据能够自动收集成状态
     例：<input type="password" value={this.state.pwd} onChange={this.handleChange}/>  //textarea、select都可以
     由于在表单元素上设置了 value 属性，因此显示的值将始终为 this.state.value，这使得 React 的 state 成为唯一数据源
     对于受控组件来说，输入的值始终由 React 的 state 驱动
     当要处理多个input时，给每个input元素设置name属性，根据event.target.name 的值选择要执行的操作
###### 2、非受控组件：需要时才手动读取表单输入框中的数据
     例：<input type="text" ref = {input => this.nameInput = input}/>
     非受控组件没有设置value值，在需要该输入值时，手动读取：const name = this.nameInput.value
代码实例：[textarea、select表单实例](https://github.com/cqujlj/React/blob/master/html/08-froms-select.html)
#### 10、状态提升
     多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去
     如：子组件1和子组件2都各自保存各自的 state ，要实现数据共享，就需要使用状态提升；
         --> 即将两个组件需要共享的数据保存在共同的父组件中，然后子组件通过 props 获取父组件数据
      父组件中： this.state = { content: '' };
      子组件：<input type='text' value={ this.props.content } onChange={ this.handleChange } />
代码实例：[状态提升](https://github.com/cqujlj/React/blob/master/html/09-Lifting%20State%20Up.html)
#### 11、组合 VS 继承
     推荐使用组合而非继承来实现组件间的代码重用
代码实例[父子组件](https://github.com/cqujlj/React/blob/master/html/11-Composition-Inheritance.html)
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
##### 路由传参
###### (1)prams方式：
     (1)配置参数：<Route path="/home/:name"/>
     (2)发送参数：<Link to='/home/JACK'>跳转到Home</Link>
     (3)接受参数：this.props.match.params.name
###### (2)query方式：
     不需要配置参数，直接发送/接收即可
     (1)发送：<Link to={{ pathname='/home',query:{name:"JACK"}}}>跳转到Home</Link>
          动态路由方式发送：<button onClick={()=>{ this.props.history.push({pathname='/home',query:{name:"JACK"})}}>点我去Home</button>
     (2)接收：this.props.location.query.name
##### 路由渲染方式
     (1)<Route component>:只有当访问不地址和路由匹配时，一个react component才会被渲染；此时组件接受route props(match,location,history)
     (2)<Route render>:适用于内联渲染 不会引起意料之外得中心挂载
     (3)<Route children>：不管地址是否匹配都会被调用
##### Route的三个属性
     (1)path(string)：路由匹配路径 如果没有指定path，则该路由每次都会被匹配渲染
     (2)exact(bool)：true：要求path和location.pathname必须完全匹配
     (3)strict(bool)：true:有结尾斜线得路径只能匹配有斜线得location.pathname
##### 路由切换的三个属性
     (1)location：指你当前的位置，将要去的位置，或是之前所在的位置
     (2)match：match 对象包含了 <Route path> 如何与 URL 匹配的信息,如：params，url，
     (3)history：可变的，建议从 <Route> 的 prop 里来获取 location；常用方法：push()  go() 
##### WithRouter:让不是路由切换的组件也具有路由切换的三个属性
     function App(){
        let [val0,setVal0] = userState(0);
        let [val1,setVal1] = userState(1);
       return(
         <div>
               使用数据：{val}----{val1}
               修改数据：<bytton onClick={()=>{setVal0(val0 + 1)}}>点击修改</button>
         </div>
       )
     }
     userState:定义一个状态，返回一个数组[当前状态值，用于更改状态的函数]
#### 16. redux
     专门的状态管理库，集中管理react中的多个组件的状态
     需求状态：某个组件的状态需要共享的时候    组件中的状态需要改变另一个组件的状态时
##### 三大原则：
     (1)单一数据源：整个react项目只有一个store用于管理状态
     (2)state可读：不能直接修改state，应该通过redux中特定的方法来修改
     (3)使用纯函数来操作：action来改变redux的state
##### 安装：npm install --save redux
##### 创建store：保存数据的地方，只能有一个store.js
    store.js: import {createStore} from "redux"
              import {data} from "./reducer"
              export const store = createStore(data)   //createStore:用于生成store，接受一个函数作为参数，返回新生成的store对象
##### state
     ·store对象包含所有数据
     ·获取当前时刻的state：store.getState();
     ·获取某个时点的数据，多store生成快照： const state = store.getState();
     ·一个state对应一个view
##### action
     state的变化会导致view的变化，action是改变state的唯一方法
     action是一个对象，type属性是必要的，标识action的名称；
     action.js：export add = (num)=>{
               return{
                    type:"ADD",
                    data:num
                 }
               }
