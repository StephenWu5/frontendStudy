self.addEventListener('fetch', function (event) {
    if (event.request.url == "http://localhost/test.html") {
        event.respondWith(caches.match('/html5-serviceWorker-fallback.html'));
    }
    else {
        event.respondWith(
            caches.match(event.request).then(function (resp) {
                return resp || fetch(event.request).then(function (response) {
                    return caches.open('v1').then(function (cache) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            }).catch(function () {
                return caches.match('/html5-serviceWorker-fallback.html');
            })
        );
    }
});