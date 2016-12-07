/* global version */
'use strict';

// Import Offline Google Analytics script & initialize
importScripts('/scripts/offline-google-analytics-import.js');
goog.offlineGoogleAnalytics.initialize();

// Using a date string ensures that the new service worker is always used,
// plus makes cache busting super easy. Hopefully!
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
  '/images/settings.svg',
  '/scripts/offline-google-analytics-import.js',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-194x194.png',
  '/favicon-32x32.png',
  '/',
];

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
  console.log('[SW] Activated');
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

  // Try the network first, fall back to the cache,
  // finally redirect to base url to allow app.js to send user to dashboard
    event.respondWith(
      fetch(request).then( response => {
        // NETWORK - Stash a copy of this response in the pages cache
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
});

// Trigger push notifications between a specific hours. This is really dirty :(
// Have to use trigger them in this way as Heroku Dynos aren't always on and
// I'm too tight to pay for the upgrade.
function triggerNotification(){
    var hours = new Date().getHours();

    if (hours >= 10 && hours < 11) {
      console.log('[SW] Trigger notification');
      fetch('/user/notification', {
        method: 'GET',
        credentials: 'include'
      }).then(response => {

      }).catch(err => {
        console.log('Failed to fetch: ', err);
      });
    }
}

triggerNotification();
setInterval(triggerNotification, 3600000);
// setInterval(triggerNotification, 30000);
