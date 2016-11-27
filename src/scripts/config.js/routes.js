'use strict';

let addRoutes = () => {
  app.shell.addEventListener('click', function(e){

    // let any clicks bubble up to the apps shell to allow dynamic changing of
    // content.... except in a few edge cases
    if (e.target !== e.currentTarget &&
        e.target.id !== 'attachment' &&
        e.target.id !== 'expiry'
      ) {
      e.preventDefault();
      if (e.target.id === 'login' ){
        console.log('Login Button Clicked');
        window.location = 'user/auth';
      }


      // DASHBOARD
      else if (e.target.id === 'dashboard') {
        app.dashboardController.index(app.user);
      }


      // CAMPAIGNS
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


      // BUCKETS
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
      } else if (e.target.id === 'bucket_save_edit') {
        app.bucketController.update(e.target.dataset.id);
      }


      // POSTS
      else if (e.target.id === 'post_new') {
        app.postController.new(e.target.dataset.id,
                               e.target.dataset.campaignid);
      } else if (e.target.id === 'post_save') {
        app.postController.create();
      } else if (e.target.className === 'post_show') {
        app.postController.show(e.target.dataset.id);
      } else if (e.target.className === 'post_edit') {
        app.postController.edit(e.target.dataset.id);
      } else if (e.target.className === 'post_delete') {
        app.postController.delete(e.target.dataset.id,
                                  e.target.dataset.name,
                                  e.target.dataset.campaignid);
      }
    }
  });
};
