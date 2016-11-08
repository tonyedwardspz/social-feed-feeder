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

      for(let i = 0; i < data.length; i++){
        if (data[i].campaigns) {
          app.user.campaigns = Campaign.extractCampaignData(data[i].campaigns);
        } else if (data[i].user) {
          User.extractUserData(data[i].user);
        } else if (data[i].posts) {
          app.user.posts = Post.extractPostData(data[i].posts);
        } else if (data[i].buckets) {
          app.user.buckets = Bucket.extractBucketData(data[i].buckets);
        }
      }

      var html = app.dashboardView.getDashboard(app.user.campaigns,
                                                app.user.buckets,
                                                app.user.posts);
      this.updateShell(html);
    });


  }
}
