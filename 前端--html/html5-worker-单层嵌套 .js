onmessage = function (event) {
    var intArray = new Array(100);    // 随机数组
    // 生成100个随机数
    for (var i = 0; i < 100; i++)
        intArray[i] = parseInt(Math.random() * 100);
    var worker;
    // 创建子线程
    worker = new Worker("./html5-worker-单层嵌套 -子线程.js");
    console.log(intArray, 'intArray-父线程');
    // 把随机数组提交给子线程进行挑选
    worker.postMessage(JSON.stringify(intArray));
    worker.onmessage = function (event) {
        // 把挑选结果返回主页面
        postMessage(event.data);
    }
}