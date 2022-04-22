### 实现原理

主要参考vue官网上的自定义事件，父组件`v-bind`给子组件传参数，子组件利用`props`来接受父组件那边传过来的参数。我们还会遇到一个问题，怎么实时拿到props的值给data里面的值呢？其实很简单，利用`watch`属性监听props某个值的变化，把新的值给`data`；

拿值拿到了，就根据业或UI的需求实现页面...

代码写啊写，逻辑走啊走，得到我们最终要的那个值后，怎么把它从子组件里面传出来给父组件呢？其实我们可以利用`.sync`修饰符对`prop`进行”双向数据绑定”：子组件`emit`发射事件，父组件监听这个事件然后更新一个本地数据。

> 我们推荐以 update:myPropName 的模式触发事件取而代之。举个例子，在一个包含 title prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：

```javascript
this.$emit('update:title', newTitle)
-------------子组件在上面，父组件代码在下，可以参考vue官网------------------------------
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

### 性别选择器

#### 实现代码

```javascript

<!--author: StephenWu5 慎用！！！！！性别选择器-->
<template>
    <div class="SexSelector">
        <div class="male" :class="[this.innerSex == 1? 'active': '']" @click="select1">男</div>
        <div class="female" :class="[this.innerSex == 2? 'active': '']" @click="select2">女</div>
    </div>
</template>


<script>
export default{
    name: 'SexSelector',
    props: {
        sex: [String, Number],
        //sex: {
            //type: Number,
            //default: 0
        //}
    },
    watch:{
        sex: function(newQuestion){    //利用监听属性给data里面innerSex赋值吧。
            this.innerSex = newQuestion;
        }
    },
    data: function(){
        return{
            innerSex: '',
            //这里其实可以优化一下
            enumsSelect: [{
                code: 1,
                text: '男'
            },{
                code: 2,
                text: '女'
            }],     // 下拉选
        }
    },
    methods:{
        select1(){
            let male = 1;
            this.innerSex = male;
            console.log(this.innerSex)
            this.$emit('update:sex', male);
        },
        select2(){
            let female = 2;
            this.innerSex = female;
            console.log(this.innerSex)
            this.$emit('update:sex', female);
        }
    },
    created(){
    }
}
</script>


<style scoped lang='less'>
.SexSelector{
    div{
        display: inline-block;
        width: 70px;
        height: 30px;
        border: 1px solid #ccc;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        border-radius: 3px;

        &.active{
            color: #B1CDFF ;
            border-color: #B1CDFF;
        }
    }
    
}
</style>

```

##### 使用方法： 

```js
<sex-select  :sex.sync="obj.sex"></sex-select>
```

#### 效果如下
![db6a87010a7e350e6a579f5a1ae12432.png](en-resource://database/3000:1)




### 仿百度搜索栏

#### 实现代码

```javascript

 <!--author: StephenWu5 慎用！！！！！-->
<template>
    <div id="watch-example" class="select2Wrapper" > 
       <p class='wrapper-item'>
           <input v-model="someName" class="form-control" @focus="showList(true)">
       </p>
       <ul v-show="usersList.length != 0 && showListOrNot" class='wrapper-item'>
            <li v-for="(item,index) in usersList" :key="index" @click="selectThisOne($event,item)">{{item.name}}</li>
       </ul>
   </div>

</template>


<script>
import _ from 'lodash';

export default{
    name: 'Select2',
    props: {
        userName: {
            type: String,
            default: '',
        }
    },
    data(){
        return{
            //userName: '',
            showListOrNot: false,
            someName: this.userName,
            usersList: [],
            usersListReturn: [                  //模拟后台返回的列表数据
                {
                    name: '周星驰',
                    value: 0,
                },
                {
                    name: '周星驰21',
                    value: 0,
                },
                {
                    name: '周星驰',
                    value: 0,
                },
                {
                    name: '周星驰',
                    value: 0,
                },
                {
                    name: '周星驰',
                    value: 0,
                },
                {
                    name: '周星驰',
                    value: 0,
                },
                {
                    name: '周星驰',
                    value: 0,
                },
            ]
        }
    },
    watch: {
        // 如果 `userName` 发生改变，这个函数就会运行    这里主要是运用了vue官网上的侦听器。
        someName: function (newuserName, oldQuestion) {
            this.debouncedGetusers()
        },
        userName: function(newVal, oldVal){
            this.someName = newVal;
        }
    },
    created: function () {
        // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
        this.debouncedGetusers = _.debounce(this.getusers, 500)
    },
    methods: {
        getusers: function () {
            if (this.someName === '') {
                this.usersList = [];
                return
            }
            var vm = this;
            this.usersList = this.usersListReturn; 
            //这里写ajax请求
        },
        selectThisOne(event,item){                  //如何返回给父组件？
            event.preventDefault();
            this.showListOrNot = false;
            this.someName = item.name;
            this.$emit('update:userName', item.name);
        },
        showList(value){
            this.showListOrNot = value;
        }
    } 
}
</script>


<style scoped lang='less'> 
.select2Wrapper{
    z-index: 999;

    position: relative;
    p.wrapper-item{

        input{
            width: 100%;
        }
    }
    ul.wrapper-item{
        position: absolute;
        z-index: 999;
        width: 100%;
        background-color: #9DC1FF;
        background-color: white;
        border: 1px solid #ccc;
        li{
            z-index: 999;
            padding: 0 10px;
            &:hover{
                background-color: #ccc;
            }
        }
    }
}

</style>

```

#### 使用方法

```javascript
<select2  :userName.sync="obj.number" ></select2>

```
#### 效果图

![502f5cb8acea7487aed567807a125c21.png](en-resource://database/2999:1)

#### 注意项
修饰符`asyc`是支持对象，数组等的哈哈。

支持缩写成这个样子，连props的那个都不用写哈，一直错了好久哈。

```
//比如说省略成这个样子
<text-document v-bind:title.sync="doc.title"></text-document>
```

还记得支付方式那里，sync同时支持对象来的哈
```javascript
//doc 也可以是对象哈
<text-document v-bind.sync="doc"></text-document>
````







