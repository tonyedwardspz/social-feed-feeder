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

  // Settup twitter message listener
  registerTwiiterInputDetection();

  // Setup popstate listener for user using the back/forward button
  setupPopStateListener();
})();
