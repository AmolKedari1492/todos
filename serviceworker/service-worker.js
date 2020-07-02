// service-worker.js
// https://www.vairix.com/tech-blog/progressive-web-apps-and-service-workers
// Name of the cache bucket.
const cacheName = 'wpa-sw-cache-v1';

const urlsToCache = [
    '/',
    '/main.js',
    'index.html',
];

// In the install life cycle event add the resources into the cache bucket. 
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                // Add resources to cache
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request.url).then(response => {
            return response || fetch(response.request.url);
      )
    );
});
