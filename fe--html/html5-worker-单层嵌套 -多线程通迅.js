function AjaxRequest(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost/前端--html/test.php', true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            // 写你的逻辑
        }
    };
    xhr.send(null);
}
onmessage=function(event){
    var worker;
    // 创建发送数据的子线程
    worker=new Worker("./html5-worker-单层嵌套 -子线程1.js");
    console.log(self, 'self');
    console.log(navigator, 'navigator');
    // 不知道为啥sessionStorage是undefined
    // console.log(sessionStorage,'sessionStorage--localStorage');
    AjaxRequest();
    setInterval(() => {
        console.log('setInterval');
    }, 1000)
    setTimeout(() => {
        console.log('setTimeout');
    }, 1000)
    console.log(Object, 'object');
    console.log(isNaN(NaN), 'isNaN');
    console.log(WebSocket, 'WebSocket');
    worker.postMessage("");
    worker.onmessage = function(event) {
        // 接收子线程中的数据，本示例中为创建好的随机数组
        var data=event.data;
        importScripts('./html5-worker -importScripts.js','./html5-worker -importScripts copy.js');
        // 创建接收数据子线程
        worker=new Worker("./html5-worker-单层嵌套 -子线程2.js");
       // 把从发送数据子线程中返回的消息传递给接收数据的子线程
        worker.postMessage(data);
        worker.onmessage = function(event) {
             // 获取接收数据子线程中传回的数据，本示例中为挑选结果
             var data=event.data;
            // 把挑选结果发送回主页面
            postMessage(data);
       }
    }
}