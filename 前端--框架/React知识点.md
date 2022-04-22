# React学习记录

## 前言

最近打算换工作了，因为现在的工作又苦又累，对技术没有什么挑战和提升的帮助，再说，说好的半年餐补费也是没有了，公司拿疫情来做挡箭牌。

这一段时间，找工作，部分公司问到React的知识点，大多数React问题回答不好。吓的我一身冷汗。所以找了时间补了一下该知识点。其实也难怪，因为公司用到的框架是vue，React只是简单做过，没有太过经验。

现在前端流行框架是React和vue，就好比支付领域的支付宝和微信。应该短时间不会改变。只会vue不会React的前端不是好前端，会被时代淘汰的。所以啊，还是学一学React的知识哈。

## 哪些知识？

无非就是vue概念的那一套。

React的一些概念：Vue比 React容易，因为 Vue 提供了很多模板语法或属性帮你搞定事情，比如 v-for、v-if、v-model、watch、computed等。你背下它们的作用就能做事了。

但是 React 比 Vue 单一，因为 React 里面其实只有一个概念，就是函数。React 没有引入任何新的概念（JSX 也只是在写函数而已）。你可以用 JS 的 if 实现 v-if，你可以用 JS 的 for 实现 v-for，你可以用 JS 的 defineProperty 实现 watch，你可以用 JS 的 getter 实现 computed。

####  组件

如何定义一个React，组件就是代码的复用，提高代码的维护性，如果不写组件的话，可能在最上的的那个组件就需要多写很多的data,methods之类的。代码维护性不好。这是我在上家公司看到有的同事不会写组件的感悟，又好气又好笑。

声明组件的2种方式：es6类和方法。现在主流的是Es6类的方法。因为简单快捷。

```javascript
import React from 'react'

class Son extends React.PureComponent{
    constructor(props) { //构造函数，初始化props和state的值
        super(props);

        this.state = {   //定义状态值
            strikes: 0,
            count: 0,
        }

        this.timerTick = this.timerTick.bind(this) //这里绑定this是为了让该方法指向实例，否则的话this为undefined了，这是js上下文的内容，不是React的锅。
        this.increase = this.increase.bind(this) //这里绑定this是为了让该方法指向实例
    },

    //验证组件的属性
    //同时支持自定义验证函数
    //写一个返回Error对象函数
    propTypes: {
        propertyName: React.PropTypes.number.isRequired,
    },

    timerTick(){    //自定义方法1，比起Vue的话，不用写在methods对象里面，自由度高。
        this.setState({
            strikes: this.state.strikes + 100
        })
    }

    increase(){   //自定义方法2
        this.setState({
            count: this.state.count + 1
        })
    }

    //虚拟dom挂载之前
    componentWillMount(){
        console.log('componentWillMount')
    }

    //虚拟dom挂载之后
    //一般请求数据从这里发出
    componentDidMount(){
        console.log('componentDidMount')
        //setInterval(this.timerTick, 1000);
    }

    //拟dom卸载之前，
    //这里可以去掉定时器事件，删除一些绑定事件等。
    componentWillUnmount(){
        console.log('componentWillUnmount1')
        return;
    }


    //该方法当props发生变化时执行，初始化render时不执行;旧的属性还是可以通过this.props来获取，然后做个新旧对比；个方法就好比vue里面的watch props 的变化
    //听说在最新版本被废弃了，我还没用它就废弃了，厉害。
    //不管在componentwillReceiveProps()方法中调用this. setstate()多少次，它都不会触发组件额外的渲染。React做了内部优化，会把状态更新操作放在一起批量执行。
    //初次渲染不会执行该函数。
    componentWillReceiveProps(np){
        console.log('componetwillReceiveprops',np)
        return;
    }

    //决定页面是否渲染生命周期，return true,更新；return false不更新；
    //使用forceUpdate强制更新时，那就跳过该函数。
    shouldComponentUpdate(NP,NS){
        console.log('shouldcomponentUpdate',NP,NS)
        if(NS.strikes <90000){

        return true;
        }else{
            ReactDOM.unmountComponentAtNode(destination);
            return false;
        }
    }

    //React更新Dom之前被调用，它得到两个参数：下一个属性对象，下一个状态对象。
    //不能在该方法中使用this.setState，会进入死循环，谁知谁知道。尽量在componentWillReceiveProps更新状态--setState。
    componentWillUpdate(np,ns){
        console.log('componentWillUpdate')
    }

    //React更新Dom之后被调用，得到两个参数：上一个属性对象，上一个状态对象。
    //可以在这个方法操作更新后的Dom，或者作执行渲染后的操纵。
    //不要在该方法使用setState，不作死就不会死。
    componentDidUpdate(){
        console.log('componentDidUpdate')
    }

    //组件内的渲染函数，确定显示什么内容，
    //通常返回值是虚拟dom树
    render(){
        var style1 = {

            color: '#66ffff',
            fontSize: 50,
        }

        var commonStyle = {
            fontSize: 24,
            color: 'red',
        }
        var count = this.state.count.toLocaleString();


        //return jsx的内容，jsx就是允许在js中写html的内容，简化写法而已。
        //不用jsx可以吗？可以啊，使用React.createElement,createFactory工厂函数，需要写很多行的代码。
        //使用jsx来创建虚拟Dom树易如反掌。
        return (
            <div>
                <div>{count}</div>
                <button onClick={this.increase}>+</button>
                    
            </div>
        )
    }
}
```

看过一本基本的React的电子书，React版本是16之前的，它是用creatClass来创建组件的，这个方法在16版本已去除。不是说老版本不好，可以先学习老版本的属性，从那里入门，在跳到16以上的版本。许多入门博客，书籍和视频都是介绍老版本的，比如阮大哥的react入门博客等等。新版本的时间近，来不及写的，老版本的多。

三步走起：
1、创建React类。
2、创建React组件元素。
3、创建React组件。

代码如下：

```javascript
var React = require（'react'）；
var ReactDOM = require（'react-dom'）；
var ReactClass = React.createClass（{
    render：function（）{
    return React.createElement（'h1'，{className：'header'}，'React Component'）；
    }
}）；
var reactComponentElement = React.createElement（ReactClass）；
var reactComponent = ReactDOM.render（reactComponentElement，document.
getElementById（'react-application'））；
//你应该对这个例子中的一些代码已经很熟悉了，其余的部分可以分为简单的三步：
```

#### 生命周期

React生命周期其实分3个部分：挂载阶段，更新阶段，卸载阶段。

###### 一、挂载阶段

先是getDefaultProps，getlnitialState分别初始化props和state的值;

接着是componentwillMount，render函数创建虚拟的Dom树，挂载到页面Dom上；

最后是componentDidMount，这里做一些Dom操纵，或者发送ajax请求。

到这里，挂载阶段结束。

###### 二、更新阶段

组件更新的调节是

一、父组件更新引起子组件的更新；二、该组件调用 setState 方法后，该组件会更新；三、如果组件写shouldComponentUpdate ，看返回值是否为true。

以State变化为例：

state变化了，开始是shouldComponentupdate，开发者可以在这里写一些条件判断，满足条件就返回true；否则为false，false不往下走。

接着是componentwillUpdate，这个函数自带两个参数：下一个属性对象和下一个状态对象：nextProps，nextState，做一些界面更新前的事情；

之后是render，创建虚拟Dom树，更新界面Dom。

最后是componentDidUpdate，这个函数自带两个参数：上一个属性对象和上一个状态对象: prevProps和prevState,作一些界面更新后的操纵。不能使用setState。记住哈，不作死就不会死。

###### 三、卸载阶段

当组件要被从界面上移除的时候调用。比如调用ReactDOM.unmountComponentAtNode(destination)移除时。

componentWillUnmount，这里生命周期可以做可做些组件相关的清理工作，例如取消计时器、网络请求，取消一些绑定事件等；同样不能调用setSate()。

//todo 粘贴那两个流程图

###### getDerivedStateFromProps（16.4新增）

这个生命周期语义化，就是从props获取值给State，赋值的过程就是映射。开发者连setState也不用写，方便。

这个方法是在re-rendering之前被调用。就算只是父组件的state发生变化，导致子组件发生`re-rendering`，这个方法依然被调用。

这个生命周期函数是为了替换`componentWillReceiveProps`而来，也就是说，用得着`componetwillReceiveprops`的地方，尽量使用`getDerivedStateFromProps`

###### getSnapshotBeforeUpdate（16.4新增）

这个生命周期翻译过来就是在更新之前获取快照，读取到某个Dom元素的状态，并把这个值传给`componentDidUpdate`作对应的处理。

因为在`componentWillUpdate`读取到的Dom状态是不安全的，没法和在`componentDidUpdate`获取的Dom状态保存一致。

其实我有个疑问：为啥不直接在`componentDidUpdate`直接获取Dom的状态，然后做对应的处理呢？应该是条条大道通罗马，React想另外挖一个路，尽早的拿到目标Dom，然后传给作最快的处理。算是一个优化吧。就好像for语句完全可以循环数组做各种逻辑处理，后面的那些forEach,some,filter,reduce是加强的分支，简单粗暴，谁用谁知道。

#### 通信

1、 父组件操纵子组件

```javascript
//父组件定义一个方法，传给子组件，子组件在componentDidMount方法里面调用一些。
//父组件调用子组件方法
onRef = (ref) => {
this.child = ref
}

//子组件定义
componentDidMount(){
    this.props.onRef(this);
}

//最后父组件就拿到最新的子自己的this对象，然后那就可以操该方法和属性。
```

2、子组件拿到父组件的数据和方法
```javascript
//其实就是在prop里面传下去
{/*弹窗层*/}
<AddOrEditModel style={{width: '180px'}} className="addModel" onRef={this.onRef} fetchList={this.fetchList}></AddOrEditModel>
```


#### 路由（使用插件）

使用react-router-dom插件

state传参, params 传参
```javascript
import {Link} from 'react-router-dom'

this.props.history.push('/child02')
<Link to={'/app/index'}></Link>
```

#### computed和watch

要实现 vue 的 computed，很简单，
写一个方法return 即可
或者使用useMemo。

1、computed
```javascript
//方式1
//无论是count还是val变化，都会导致getNum重新计算
<div mock=getNum()>{}</div>
<div>{getNum()}</div>

getNum(){
    return this.state.a + this.state.b;
}
```
```javascript
//方式2
//useMemo,useCallback
import React, { memo, useMemo, useCallback, useState } from 'react';

const App = memo(() => {
  const [count, setCount] = useState(0);
  let double = useMemo(() => {
    return count * 2
  }, [count]);   //double依赖于count，当count改变时，double自动改变，详情可见我的useMemo文章 
  return (
    <div>
      <button onClick={()=>{setCount((count) => count + 1)}}>count+1</button>
      <div mock=mock()>{}</div>
      <div>{mock()}</div>
    </div>
  )
})
export default App;
```

2、watch

在shouldComponentUpdate里面做对比；

```javascript
shouldComponentUpdate(prevProps,prevState){
if(prevState.namel=this.state.name1)
this setstate({
name2：this state. name1
})
}
```

或者state 定义一个getter ,setter在里面做这个事。

#### 插槽

插槽可以使用this.props.children，if判断是否渲染，满足条件后渲染。
