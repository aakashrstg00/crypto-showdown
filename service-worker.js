var CACHE_STATIC_NAME = 'static-cache'
var STATIC_FILES_ARRAY = [
    '/index.html',
    '/',
    '/app.js',
    '/favicon.ico',
    'https://use.fontawesome.com/releases/v5.0.6/css/all.css',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/js/materialize.min.js',
    'https://cdn2.iconfinder.com/data/icons/bitcoin-and-mining/44/trade-512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/fonts/roboto/Roboto-Regular.woff',
    'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/fonts/roboto/Roboto-Regular.woff2'
];
self.addEventListener('install', event => {
    console.log('[sw] installing sw.', event);
    event.waitUntil(caches.open(CACHE_STATIC_NAME)
        .then((cache) => {
            console.log('[sw] precaching app shell.');
            cache.addAll(STATIC_FILES_ARRAY)
                .then(res => console.log('[sw] cached all'))
                .catch(err => console.log('[sw] error: ', err));
        }));
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(CACHE_STATIC_NAME)
            .then(cache => {
                return caches.match(event.request)
                    .then(response => {
                        return response || fetch(event.request).then(res => {
                            cache.put(event.request.url, res.clone());
                            return res;
                        });
                    })
            })
    );
});