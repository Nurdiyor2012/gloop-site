const CACHE_NAME = 'gloop-cache-v1';
const FILES_TO_CACHE = [
  '/gloop-site/',
  '/gloop-site/index.html',
  '/gloop-site/style.css',   // CSS fayl bo‘lsa qo‘shing
  '/gloop-site/app.js',      // JS fayl bo‘lsa qo‘shing
  '/gloop-site/logo.png'     // Logolar va rasm
];

// Install event: cache saqlash
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Cache saqlandi!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // eski SW’ni tezda yangilash
});

// Activate event: eski cache’larni tozalash
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if(key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event: offline fallback bilan
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request)
        .catch(() => caches.match('/gloop-site/index.html')); // offline fallback
    })
  );
});
