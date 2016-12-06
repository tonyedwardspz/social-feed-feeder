'use strict';

/**
* Adds an event listener on the app shell listening for cetain events, directing
* traffic to the appropriate contoller. Allowing events to bubble up to the
* app shell allows us to only set these once, instead of on each view update.
*/
let addRoutes = () => {
  app.shell.addEventListener('click', e => {

    if (e.target !== e.currentTarget &&
        e.target.id !== 'attachment' &&
        e.target.id !== 'expiry' &&
        !e.target.className.includes('tweet-url') &&
        e.target.id !== 'repeat' &&
        e.target.id !== 'attachment' &&
        e.target.id !== 'dismiss'
      ) {
      e.preventDefault();

      // Login
      if (e.target.id === 'login' ){
        console.log('Login Button Clicked');
        window.location = 'user/auth';
      }

      // DASHBOARD
      else if (e.target.id === 'dashboard_index') {
        app.dashboardController.index(app.user);
      }

      // CAMPAIGNS
      else if (e.target.id === 'campaign_index') {
        app.campaignController.index();
      } else if (e.target.classList.contains('campaign_show')){
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

      // BUCKETS
      else if (e.target.id === 'bucket_new') {
        app.bucketController.new(e.target.dataset.campaignid);
      } else if (e.target.id === 'bucket_save') {
        app.bucketController.create();
      } else if (e.target.classList.contains('bucket_show')) {
        app.bucketController.show(e.target.dataset.id);
      } else if (e.target.classList.contains('bucket_edit')) {
        app.bucketController.edit(e.target.dataset.id);
      } else if (e.target.classList.contains('bucket_delete')) {
        app.bucketController.delete(e.target.dataset.id,
                                    e.target.dataset.name,
                                    e.target.dataset.campaignid);
      } else if (e.target.id === 'bucket_save_edit') {
        app.bucketController.update(e.target.dataset.id);
      }

      // POSTS
      else if (e.target.id === 'post_new') {
        app.postController.new(e.target.dataset.id);
      } else if (e.target.id === 'post_save') {
        app.postController.create();
      } else if (e.target.classList.contains('post_show')) {
        app.postController.show(e.target.dataset.id);
      } else if (e.target.classList.contains('post_edit')) {
        app.postController.edit(e.target.dataset.id);
      } else if (e.target.classList.contains('post_delete')) {
        app.postController.delete(e.target.dataset.id,
                                  e.target.dataset.name,
                                  e.target.dataset.bucketid);
      } else if (e.target.id === 'post_save_edit') {
        app.postController.update(e.target.dataset.id);
      }

      // USER
      else if (e.target.id === 'user_save') {
        app.userController.update();
      }
    }
  });
  setupSettingsListener();
};

let setupSettingsListener = () => {
  document.getElementById('settings').addEventListener('click', e => {
    e.preventDefault();
    console.log('User settings clicked');
    app.userController.edit();
  });
};
