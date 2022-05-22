前端开发，需要和后台联调；很多时候，前端开发并不需要等后台完全写好接口在去联调，自己可以写死数据，渲染数据，加样式。后台人员有时会很忙，他没有时间写好返回所有的数据等等，特别是新开一个项目，从零开始的那种，前端要是等后台写好，开发效率就不高了。所以自己造数据很重要。有一段时间，我每天早上来就催后台给我开服务器，应该不开的话，代码不好写，效率不快，会影响每天的任务的，影响了的话就要苦逼的加班。

我做过一个项目，进件新增编辑的，表单字段，一个表单页面有20~30来个字段，填写完最快都要半首歌的时间，页面刷新又得重新填，又得花那个时间。后来同事小强建议写死一个`json`数据自动填写，填都不用填了。其实省下不少时间。突然间我就意识到写假数据对于一个前端来说，挺重要，可以节省时间，多出来的时间，可以休息，测试项目的功能或者学习新东西。

在上一家体育公司中，我写了一个体测数据的页面，一个页面很长，密密麻麻的全是体测的数据。记得当时页面的每一部分的数据，我都是用同一个数据，其实这样子不好，因为页面需要的最终数据（比如文字的长度，是否符合该字段正则表达式等等）和写的假数据有时很大出入，会影响页面效果的。如果有问题，你就要重新写样式，加班加点。之前写过一个大屏直播的页面，用户的那个名称，一般人都是2到3个汉字，所以我自然没有考虑到4个汉字的名称，结果悲剧了，真有4个字的人名，然后那一块样式排版乱掉，我又得改。这种场景就需要一个`js`工具帮我随机生成2到4字的名字。

![办公地点.jpg](https://upload-images.jianshu.io/upload_images/8195910-0583b19e9f02da02.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
上图为2019年的工作环境

研究了一个专门造假数据的库，叫`mock`。其实这个东西我在2018年的年初就已经知道了，有一次面试，面试官问过这个问题（结果是流泪的），后来只不过看了2天的官方文档，就让它在一边吃灰，因为在上一家体育公司的项目中应用场景不多。最近项目闲下来，我花了1天的时间（其实就是半天）写了一个工具类js，方便自己以后在新开项目时或者特别需要假数据时使用。

`mock`有两个好处：1. 随机的生成假数据，每次页面刷新都不一样；2. 它可以拦截`ajax`请求，就是说当你定义在`mock`里面的接口路径和真实的后台接口路径一样时，前者就把后者拦截。


代码如下面所示哈：
```
import Mock from 'mockjs';
let Random = Mock.Random;

//枚举的工具对象
//其实就是`map`方法遍历一个数组，生成一个数组和一个`code`数组，`code`和新数组的序号是一致的，所以就可以轻易的输入`code`拿到想要的值
class EsEnum {
    constructor(arr) {
        let typeArr = [];
        if (!Array.isArray(arr)){
            throw 'arr is not an array!';
            return;
        }

        arr.map(element => {
            if(!element.code || !element.name) {
                return;
            }
            // 保存code值组成的数组，方便A.getName(name)类型的调用
            typeArr.push(element.code);
            // 根据code生成不同属性值，以便A.B.name类型的调用
            this[element.code] = element;
        });
        
        // 保存源数组
        this.arr = arr; 
        this.typeArr = typeArr;
    }

    // 根据code得到对象
    valueOf(code) {
        return this.arr[this.typeArr.indexOf(code)];
    }

    // 根据code获取name值
    getNameByCode(code){
        let prop = this.valueOf(code);
        if (!prop){
            throw 'No enum constant'  + code;
            return;
        }

        return prop.name;
    }

    // 返回源数组
    getValues() {
        return this.arr;
    }
}


// 配置拦截 ajax 的请求时的行为，支持的配置项目有 timeout。
 Mock.setup({
    timeout: '200 - 400'
})

    
//接口api
/** 
 *  * @description: 通用工具类  
 *  * @author: StephenWu5   
 *  * @paras   接口链接，接口类型，返回数据结构，返回数据的长度
 *  * @date: 2019-12-3 15:38:27 
 */
export const  createApiByMock = function(apiUrl,apiType,paraSet) {  
    let data = []; //等下要返回的数据
    let returnData ={};
    let dataLength = paraSet.dataLength || 10;

    for (let i = 0; i < dataLength; i++) {
        let images = [1,2,3].map(x=>Random.image('200x100', Random.color(), Random.word(2,6))); //随机成长3个图片信息 尺寸 颜色 和随机字母的数组
        let paraSetNew = JSON.parse(JSON.stringify(paraSet))
        let dataTypeEnum = new EsEnum([
            //==============================================配置的开始==========================================================
            {code: '0', i},   //id 唯一性
            {code: '1', name: Random.cname()},   //中文姓名    cfirst 模拟姓氏  clast 模拟名字    name 英文名字
            {code: '2', name: Random.cword(8,20)},   //标题  8和20是长度
            {code: '3', name: Random.integer(100,5000)},   // 100到5000的随机整数    natural  返回随机的自然数
            {code: '4', name: images.slice(0,Random.integer(1,3))},//截取随机一到三个图片    
            {code: '5', name: Random.image('200x100', '#4A7BF7', 'picture')}, //模拟图片 宽高不指定则随机   
            {code: '6', name: Random.date()},   //日期  yyyy-MM-dd   yyyy-mm-dd是指定格式
            {code: '7', name: Random.time()},   //时间
            {code: '8', name: Random.province()},   //省
            {code: '9', name: Random.city()},   //市  Mock.mock('@city(true)')  加参数true会有奇效哈
            {code: '10', name: Random.county()},   //区   Mock.mock('@county(true)')
            {code: '11', name: Mock.mock('@EMAIL()')},   //邮箱
            {code: '12', name: Mock.mock(/^1[0-9]{10}$/)},   //手机(座机)  这里可以正则
            {code: '13', name: Mock.mock('13531544954')},   //身份证

            Mock.mock({ code: '14', "name|1":['精品语文班','精品作业A班','英语班','语文班']}),   //身份证包括一切的枚举，使用率最高

            {code: '21', name: Random.csentence(5, 10)},   //生成一条随机的中文句子
            {code: '22', name: Random.cparagraph(0, 10)},   //随机生成0到10段句子
            {code: '23', name: Random.url()},   //url
            {code: '24', name: Random.ip()},   //ip
        //==============================================配置的结束==========================================================
        ])
        for(let key in paraSetNew){
            if(!key){  
                return;
            }
            if(key === 'dataLength'){
                continue;
            }
            paraSetNew[''+key] = dataTypeEnum[""+paraSet[""+key]]['name']
        } 

        delete paraSetNew.dataLength;  //就看你想不想留dataLength;
        data.push(
            //{allData: (dataTypeEnum)},  //这里就是精华所在哈
            paraSetNew
        )
    }

    //利用assign添加默认值 status message
    returnData = Object.assign({
        status: 200,
        message: 'success',
        length: data.length,
    }, {data});


    // Mock.mock( url, post/get , 返回的数据)；
    Mock.mock(apiUrl,apiType, returnData); // 获取验证码
}

```


使用就是新建一个`js`文件，把它导入到项目中，使用如下：
这一步只是在项目注册这个`api`，还要写一个调用该`api`的方法才可以。真有一个下午，就是今天，我在项目中引入这个工具类，也注册了，看不到效果，我以为是这两个地方写错了，找来找去，原来是缺了调用该api的方法（就是最后一步下方的代码）。半小时就这样折腾没了。西湖啊，我的泪。
```
import {createApiByMock} from './mock';


//使用实例   dataLength 是返回数组的长度哈
let paraSet = {
    name: 1,
    age: 3,
    dataLength: 10
}
createApiByMock('http://localhost:8080/getMockData','get',paraSet);
```

最后一步，调用该`api`。
其实这个代码和mock无关，只不过我的接口名和项目的不一样，所以就写成这样子。
```
//得到mock数据， 
export const getMockData = (data) => Request.get(`/getMockData`, data, createHeader());
```

这样子就可以快速拿到自己想要的数据，简单。需要特别注意的是，和`mock`相关的代码，特别是第2部分的代码，生产，测试环境不能提交，要是不小心提交了，领导会很生气的，他会让你不能下班或者不上班，所以还需要在项目中加上环境判断的代码，决定是否使用注册`api`那部分的代码哈。

写到这里，我突然感觉，那些`vue`，`jquery`，`react`其实就是和我这个`js`是类似的啊，只不过前者就是很多技术大佬写出来，维护，功能强大，可以做很多事情，文件体积大，经过了单元测试，使用的话不会出什么问题；而我这个体积小，功能单一，只能做一件事情，比较辣鸡。前者是优秀电视剧《甄嬛传》的话，后者就是抖音短视频。前者后者只不过都是前端工程师开发的工具，让我们快速的写页面，和那些ppt模版，编辑器`vscode`,`vim`没有什么两样都属于工具来的，类似父亲的泥水刀，农民耕田用的水牛，厨师的菜刀。

以后有空闲的话，再搞`axios`，`utils`，vue组件`echart`等几个常用的工具类出来吧。方便你我她他它使用，顺便假装大佬哈哈哈哈哈哈哈。

最后，欢迎关注我的公众号。

![公众号二维码.jpg](https://upload-images.jianshu.io/upload_images/8195910-4759b64c8d6d9ed7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
