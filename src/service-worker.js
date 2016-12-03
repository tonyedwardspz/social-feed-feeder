/* global version */
'use strict';

// Import Offline Google Analytics script
importScripts('/scripts/offline-google-analytics-import.js');

// Using a date string ensures that the new service worker is always used,
// plus makes cache busting super easy. Hooray!
//VERSION-HERE
const cacheName = version + 'static';
const cacheFiles = [
  '/scripts/app.js',
  '/index.html',
  '/manifest.json',
  '/images/pencil.svg',
  '/images/placeholder-image.jpg',
  '/images/placeholder-image-not-available.jpg',
  '/images/x.svg',
  '/scripts/offline-google-analytics-import.js',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-194x194.png',
  '/favicon-32x32.png',
  '/',
];

// Initialize offline analytics tracking
goog.offlineGoogleAnalytics.initialize();

// Open the cache and store static files
function updateStaticCache() {
  return caches.open(cacheName)
    .then( cache => { return cache.addAll(cacheFiles);});
}

// Save an item into the cache
function stashInCache(cacheName, request, response) {
  caches.open(cacheName).then( cache => cache.put(request, response));
}

// Remove excess items over the passed limit
function trimCache(cacheName, maxItems) {
  caches.open(cacheName).then( cache => {
    cache.keys().then(keys => {
      if (keys.length > maxItems) {
        cache.delete(keys[0])
        .then(trimCache(cacheName, maxItems));
      }
    });
  });
}

// Remove caches whose name is no longer valid
function clearOldCaches() {
  return caches.keys()
  .then( keys => {
    return Promise.all(keys.filter(key => key.indexOf(version) !== 0)
      .map(key => caches.delete(key))
    );
  });
}

// Save items to the cache upon installation
self.addEventListener('install', event => {
  event.waitUntil(updateStaticCache()
  .then( () => {
    console.log('[SW] Installed');
    self.skipWaiting(); })
  );
});

// Clear cache and make this service worker the active one for the page.
// This allows the SW to function immediately, rather than waiting for reload.
self.addEventListener('activate', event => {
  event.waitUntil(clearOldCaches()
    .then( () => self.clients.claim() )
);
});

// Listen for the message event, do some funky stuff
self.addEventListener('message', event => {
  if (event.data.command === 'trimCaches') {
    trimCache(cacheName, 50);
  }
});

// Intercept the fetch request and do some funky stuff
self.addEventListener('fetch', event => {
  let request = event.request;
  let url = new URL(request.url);

  // Ignore non-GET requests, SW can't deal with them
  if (request.method !== 'GET') {
    return;
  }

  // // Don't check the cache for the dashboard to allow app.js to route the user
  // if (request.url.indexOf('dashboard_index') !== -1) {
  //   return;
  // }

  // For HTML requests, try the network first, fall back to the cache,
  // finally redirect to base url to allow app.js to send user to dashboard
  if (request.headers.get('Accept').indexOf('text/html') !== -1) {
    event.respondWith(
      fetch(request).then( response => {
        // NETWORK - Stash a copy of this page in the pages cache
        let copy = response.clone();
        stashInCache(cacheName, request, copy);
        return response;
      })
      .catch( () => {
        // CACHE - Check cache or fallback to base
        return caches.match(request)
          .then( response => response || caches.match('/') );
      })
    );
    return;
  }

  // For non-HTML requests, look in the cache first, fall back to the network
  event.respondWith(
    caches.match(request)
    .then(response => {
      // CACHE
      return response || fetch(request).then( response => {
        // NETWORK - stash a copy of anything in the cache
        let copy = response.clone();
        stashInCache(cacheName, request, copy);
        return response;
      })
      .catch( () => {
        // OFFLINE - If the request is for an image, show an offline placeholder
        if (request.headers.get('Accept').indexOf('image') !== -1) {
          return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', {headers: {'Content-Type': 'image/svg+xml'}});
        }
      });
    })
  );
});
