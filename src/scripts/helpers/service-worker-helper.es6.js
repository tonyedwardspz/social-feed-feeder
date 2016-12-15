'use strict';

/**
* Triggers the setting up of the service workers, if available in browser,
* and related listeners.
*/
let setupServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    offlineReadyShow();
    offlineReadyDismissal();
    registerServiceWorker();
  } else {
    console.log(`Your browser does not support service workers`);
  }
};

/**
* Registers a service worker to enable caching, push notifications and
* app installation.
*/
let registerServiceWorker = () => {
  navigator.serviceWorker.register('/service-worker.js').then((registration) => {
    console.log('[SW-APP] Registered');
  }).catch((error) => {
    console.log('[SW-APP] Failed to registered: ', error);
  });
};

/**
* Listens for the state change event of the service worker in order to display
* the ready to work offline message.
*/
let offlineReadyShow = () => {
  navigator.serviceWorker.addEventListener('controllerchange', event => {
    navigator.serviceWorker.controller.addEventListener('statechange', () => {
      if (navigator.serviceWorker.controller.state === 'activated') {
        document.getElementById('offline-ready').classList.add('active');
      }
    });
  });
};

/**
* Sets a listener for the dismissal of the offline ready message.
*/
let offlineReadyDismissal = () => {
  document.getElementById('offline-ready').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('offline-ready').classList.remove('active');
  });
};
