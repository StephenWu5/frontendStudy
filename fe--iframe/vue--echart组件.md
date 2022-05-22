上一家公司的时候，有个页面，有很多的`echart。echart`图形的形状不一，需要很多的`option`对象。当时我是搞了很多行的配置代码，其实可以从配置抽离公共的部分写在组件内部，不同的写在父组件那里，这样子就可以节省代码。那时离职了，没有时间做这个事情。心里一直记得这个事，刚好最近有空，就完成这个功能。

代码如下。

```
<template>
    <div :id="id" :style="style"></div>
</template>

<script>
import echarts from "echarts"
//如果有很多配置就使用map 映射吧

export default {
    name: 'charts',
    data () {
        return {
            chart: '',
            //百度echart配置，难点是合并组件内部，父组件，和后台三方的数据，不过已经做到。
            echartOption: this.propObj.option,
        }
    },
    props: {
        propObj: {
            type: Object,
            default(){
                return {
                    //这里子组件需要接收父组件传递过来的参数
                    id: '',
                    width: '100%',
                    height: '100%',
                    option: {
                        title: {
                            text: 'ECharts 入门示例'
                        },
                        tooltip: {},
                        legend: {
                            data:['销量']
                        },
                        xAxis: {
                            type: 'category',
                            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [{
                            data: [820, 932, 901, 934, 1290, 1330, 1320],
                            type: 'line'
                        }]
                    }
                }
            }
        }
    },
    computed: {
        style() {
            return {
                width: this.propObj.width,
                height: this.propObj.height
            }
        }
    },
    watch: {
        'propObj.option': {
            handler(newVal, oldVal) {
                this.echartOption =  this.assignObj(oldVal,newVal)
                this.change();
            },
            deep: true
        }
    },
    mounted() {
        this.init();
        this.fetchChart();
    },
    methods: {
        //获取后台数据
        fetchChart() {
            let that = this;
            let chartType = this._props.chart;
            let yTitle = that.chartYAxisList[chartType];
            $.get('/api/rpt/chartData', {chartType: this.chartTypeIdList[chartType], dataType: this.dataType}, function (result) {
                if (result.code === 0) {
                    that.chartX = result.obj.xAxis;
                    that.xTitle = result.obj.xtitle;
                    that.chartData = result.obj.data;
                    let colors = '#' + Math.floor(Math.random() * 16777215).toString(16);
                    //合并最新配置
                    that.echartOption = that.assignObj(that.echartOption,{
                        xAxis: [{
                            name: that.xTitle,
                            data: that.chartX
                        }],
                        yAxis: [{
                            name: yTitle,
                        }],
                        series: [{
                            data: that.chartData,
                            lineStyle: {
                                normal: {
                                    color:colors
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: colors
                                }
                            }
                        }]
                    })
                    that.change();
                }
            })
        },
        //百度echart变化
        change(){
            if (this.chart) {
                this.chart.setOption(this.echartOption)
            } else {
                this.init();
            }
        },
        //百度echart初始化
        init() {
            this.chart = this.$echarts.init(document.getElementById(this.propObj.id))
            this.chart.showLoading();  //开启加载动画
            this.chart.setOption(this.echartOption)
            this.chart.hideLoading();        //关闭加载动画

            window.addEventListener("resize", this.chart.resize());
        },


        //合并option的值、这份代码很关键
        assignObj(vm, firstSource) {
            const callee = arguments.callee //将运行函数赋值给一个变量备用  
            for(let [index,item] of new Map([...arguments].map((item,i) => [i,item]))){
                if(index === 0)  continue; //躲开vm

                let nextSource = [...arguments][index];
                if (nextSource && typeof nextSource !== "object") continue;
                Object.keys(vm).reduce((pre,cur) => { //如果想使用宽松模式，就把这一行的vm改为nextSource
                    if(Object.prototype.toString.call(vm[cur]) !== '[object Object]' && vm.hasOwnProperty(cur) && nextSource.hasOwnProperty(cur))

                        vm[cur] = nextSource[cur]
                    else if(Object.prototype.toString.call(vm[cur]) === '[object Object]' && vm.hasOwnProperty(cur) && nextSource.hasOwnProperty(cur))
                        callee(vm[cur],nextSource[cur]);
                    return vm;
                },vm)
            } 
            return vm
        },

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>


```

最后，欢迎关注我的公众号。

![公众号二维码.jpg](https://upload-images.jianshu.io/upload_images/8195910-4759b64c8d6d9ed7.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
