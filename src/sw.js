'use strict';

var cacheName = 'social-feed-feeder';

// Cache required assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[SW] Caching items');
      return cache.addAll([
        '/images/pencil.svg',
        '/images/placeholder-image.jpg',
        '/images/placeholder-image-not-available.jpg',
        'images/uploads/placeholder-image.jpg',
        '/images/x.svg',
        '/scripts/app.js',
        '/index.html',
        '/manifest.json',
        '/sw.js'
      ]);
    })
  );
});


// Network first falling back to cache
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      console.log('[SW] Fetch - Network > Cache', event.request);
      return caches.match(event.request);
    })
  );
});

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.open(cacheName).then(function(cache) {
//       return fetch(event.request).then(function(response) {
//         cache.put(event.request, response.clone());
//         return response;
//       });
//     })
//   );
// });
