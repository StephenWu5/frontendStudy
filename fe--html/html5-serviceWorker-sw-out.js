// 通过改动本脚本文件，达到更新最新的资源包，必须通过 caches.open 和cache.addAll 的方式添加
// 本文件的所在文件夹命名（包括上级路径）不能写中文，否则出现问题
const fallbackUrl = self.registration.scope + 'html5-serviceWorker-fallback.html';  
//为安装设置回调函数
self.addEventListener("install", function (event) {
    //执行安装过程 
    event.waitUntil(
        caches.open('v2').then(function (cache) {
            //缓存我们想要缓存的文件
            return cache.addAll([         
                '/',
                './html5-serviceWorker-html.html',
            ]);
        }).then(function () {
            caches.open('v3').then(function (cache) {
                //缓存我们想要缓存的文件
                return cache.addAll([
                ]);
            });
        }).then(function () {
            console.log('所有资源被成功缓存');
        }).catch(function (error) {
            console.log('预抓取失败:', error);
        })
    );
});

// console.log(self, 'self');
// 这里是返回数据
// caches.match 这个方法需要写全称路径!!!
self.addEventListener('fetch', function (event) {
    // console.log(event.request, 'event.request');
    if (event.request.url == 'http://127.0.0.1:5500/fe--html/html5-serviceWorker-fallback.html') {
        event.respondWith(caches.match('http://127.0.0.1:5500/fe--html/html5-serviceWorker-fallback.html').then(function (response) {
            if (response)
                return response;
        }))
    }
    else {
        event.respondWith(
            caches.match(event.request).then(function (resp) {
                return resp || fetch(event.request).then(function (response) {
                    console.log(response, 'response')
                    // 不要挑战demo的常规写法
                    // if (response.status != 200) {
                    //     return caches.match('http://127.0.0.1:5500/fe--html/fe--html/html5-serverWorker/html5-serviceWorker-fallback.html' ).then(data => data);
                    // } else {  
                    return caches.open('v2').then(function (cache) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                    // }
                });
            }).catch(function () {
                return caches.match('/html5-serviceWorker-fallback.html');
            })
        );
    }
});

self.addEventListener("activate", function (event) {
    let cacheWhitelist = ["v2", "v3"];
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log(cacheName + "缓存被删除");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});