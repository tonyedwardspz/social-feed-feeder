/* globals Campaign, BaseController, User, Post, Bucket */
/* exported DashboardController */
'use strict';

class DashboardController extends BaseController {
  constructor() {
    super();
    console.log('From Dashboard Controller');
  }

  index(user) {

    app.db.retrieve('/getAllData', user, data => {
      console.log('[DASH]: Fetch all data');
      this.processData(data[i], function(){
        var html = app.dashboardView.getDashboard(app.user.campaigns,
                                                  app.user.buckets,
                                                  app.user.posts);
        this.updateShell(html);
      });
    });
  }

  processData(data, cb) {
    console.log('Processing Data');
    for(let i = 0; i < data.length; i++){
      if (data.campaigns) {
        app.user.campaigns = Campaign.extractCampaignData(data.campaigns);
      } else if (data.user) {
        User.extractUserData(data.user);
      } else if (data.posts) {
        app.user.posts = Post.extractPostData(data.posts);
      } else if (data.buckets) {
        app.user.buckets = Bucket.extractBucketData(data.buckets);
      }
    }
    cb();

  }
}
