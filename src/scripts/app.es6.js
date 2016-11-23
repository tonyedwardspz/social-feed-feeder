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
      e.preventDefault();
      if (e.target.id === 'login' ){
        console.log('Login Button Clicked');
        window.location = 'user/auth';
      }


      else if (e.target.id === 'dashboard') {
        app.dashboardController.index(app.user);
      }

      else if (e.target.id === 'campaign_index') {
        app.campaignController.index();
      } else if (e.target.className === 'campaign_show'){
        app.campaignController.show(e.target.dataset.id);
      } else if (e.target.id === 'campaign_new') {
        app.campaignController.new();
      } else if (e.target.id === 'campaign_save') {
        app.campaignController.create();
      } else if (e.target.id === 'campaign_edit') {
        app.campaignController.edit(e.target.dataset.campaignid);
      } else if (e.target.id === 'campaign_delete') {
        app.campaignController.delete(e.target.dataset.campaignid);
      } else if (e.target.id === 'campaign_save_edit') {
        app.campaignController.update(e.target.dataset.id);
      }

      else if (e.target.id === 'bucket_new') {
        app.bucketController.new(e.target.dataset.campaignid);
      } else if (e.target.id === 'bucket_save') {
        app.bucketController.create();
      } else if (e.target.className === 'bucket_show') {
        app.bucketController.show(e.target.dataset.id);
      } else if (e.target.className === 'bucket_edit') {
        app.bucketController.edit(e.target.dataset.id);
      } else if (e.target.className === 'bucket_delete') {
        app.bucketController.delete(e.target.dataset.id,
                                    e.target.dataset.name,
                                    e.target.dataset.campaignid);
      }
    }


  });
})();
