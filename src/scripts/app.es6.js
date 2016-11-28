'use strict';

function clearDOM() {
  app.shell.innerHTML = '';
}

function getCookie(name) {
  var value = '; ' + document.cookie;
  var parts = value.split('; ' + name + '=');
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

var app;

(function(){

  app = {
    user: null,
    shell: document.querySelector('main'),
    spinner: document.querySelector('.loader'),
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

  // Direct user flow when landing on page
  if (getCookie('user_auth') === 'true'){
    console.log('User authenticated');
    if (app.user === null) {
      app.user = new User(getCookie('user_id'));
      app.dashboardController.index(app.user);
    }
  } else {
    console.log('User not authenticated');
    app.shell.innerHTML = app.userView.loginScreen();
  }

  // Routes
  addRoutes();

  // Settup twitter message listener
  registerTwiiterInputDetection();

  // Setup popstate listener for user using the back/forward button
  setupPopStateListener();

})();
