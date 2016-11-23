'use strict';

class DashboardController extends BaseController {
  constructor() {
    super();
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

      // this.processData(data, function(){
      //   var html = app.dashboardView.getDashboard(app.user.campaigns,
      //                                             app.user.buckets,
      //                                             app.user.posts);
      //   this.updateShell(html);
      // });
    });
  }

  processData(data, cb) {
    console.log('Processing Data: ', data);
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
