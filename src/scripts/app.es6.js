'use strict';

var app;

(function(){

  app = {
    user: null,
    shell: document.querySelector('main'),
    db : new Database(),
    userView: new UserView(),
    userController: new UserController(),
    dashboardView: new DashboardView(),
    dashboardController: new DashboardController(),
    campaignView: new CampaignView(),
    campaignController: new CampaignController(),
    bucketView: new BucketView(),
    bucketController: new BucketController(),
    postView: new PostView(),
    postController: new PostController()
  };

  // Authenticate and direct user flow when landing on page
  app.userController.checkAuthentication();

  // Routes
  addRoutes();

  // Setup twitter message listener
  registerTwiiterInputDetection();

  // Setup popstate listener for user using the back/forward button
  setupPopStateListener();

  // Setup listener for the post attachment
  setupAttachmentChangeListener();

  document.getElementById('offline-ready').addEventListener('click', (e) => {
    // if (e.target.id === 'dismiss') {
      e.preventDefault();
      console.log('remove offline notificaion');
      document.getElementById('offline-ready').classList.remove('active');
    // }
  });

  // Register service worker to enable offline lovelyness
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('[SW-APP] Registered');
    }).catch((error) => {
      console.log('[SW-APP] Failed to registered: ', error);
    });

    // Listen for changes in the state and notify user when offline ready
    navigator.serviceWorker.addEventListener('controllerchange', function(event) {
      navigator.serviceWorker.controller.addEventListener('statechange', function() {
        console.log('[SW] Set listener', navigator.serviceWorker.state);
        if (this.state === 'activated') {
          document.getElementById('offline-ready').classList.add('active');
        }
      });
    });
  }
})();
