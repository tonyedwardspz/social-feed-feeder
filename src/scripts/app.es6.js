'user strict';

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
    campaignController: new CampaignsController(),
    bucketView: new BucketView(),
    bucketController: new BucketController()
  };

  app.shell.innerHTML = app.userView.loginScreen();
  app.spinner.classList.add('hidden');

  if (getCookie('user_auth') === 'true'){
    console.log('User authenticated');
    if (app.user === null) {
      app.user = new User(getCookie('user_id'));
    }
    console.log(app.user);

    app.dashboardController.index(app.user);
  }


  app.shell.addEventListener('click', function(e){

    if (e.target !== e.currentTarget) {
      if (e.target.id === 'login' ){
        console.log('Login Button Clicked');
        window.location = 'user/auth';
      } else if (e.target.id === 'campaign_index') {
        app.campaignController.index();
      } else if (e.target.className === 'campaign_show'){
        e.preventDefault();
        app.campaignController.show(e.target.dataset.id);
      } else if (e.target.id === 'campaign_new') {
        app.campaignController.new();
      } else if (e.target.id === 'campaign_save') {
        e.preventDefault();
        app.campaignController.create();
      } else if (e.target.id === 'bucket_new') {
        app.bucketController.new(e.target.dataset.campaignid);
      } else if (e.target.id === 'bucket_save') {
        e.preventDefault();
        app.bucketController.create();
      }
    }


  });
})();
