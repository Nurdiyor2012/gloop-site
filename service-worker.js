self.addEventListener("install", e => {
    e.waitUntil(
      caches.open("gloop").then(cache => {
        return cache.addAll([
          "/gloop-site/",
          "/gloop-site/index.html"
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", e => {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    );
  });
  