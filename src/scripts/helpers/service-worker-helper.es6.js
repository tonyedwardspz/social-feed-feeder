'use strict';

let setupServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    offlineReadyShow();
    offlineReadyDismissal();
    registerServiceWorker();
  } else {
    console.log(`Your browser does not support service workers`);
  }
};

let registerServiceWorker = () => {
  navigator.serviceWorker.register('/service-worker.js').then((registration) => {
    console.log('[SW-APP] Registered');
  }).catch((error) => {
    console.log('[SW-APP] Failed to registered: ', error);
  });
};

let offlineReadyShow = () => {
  navigator.serviceWorker.addEventListener('controllerchange', event => {
    navigator.serviceWorker.controller.addEventListener('statechange', () => {
      if (navigator.serviceWorker.state === 'activated') {
        document.getElementById('offline-ready').classList.add('active');
      }
    });
  });
};

let offlineReadyDismissal = () => {
  document.getElementById('offline-ready').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('offline-ready').classList.remove('active');
  });
};
