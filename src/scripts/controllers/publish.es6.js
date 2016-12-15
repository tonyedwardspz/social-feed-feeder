'use strict';

class PublishController extends BaseController {
  constructor() {
    super('PublishController');
  }

  /**
  * Displays the publish post view when the publish_index url is hit.
  * Gets an array of post suggestions and displays them to the user.
  */
  index() {
    console.log('[Publish] Index Hit');
    this.updateShell('<h2>Sorting posts.....</h2>');

    let potentialPosts = [];
    let sortedPosts = [];
    let allCampaigns = [];
    let theseCampaigns = [];
    let unexpiredBuckets = [];
    let todaysDate = new Date();

    // fetch latest data
    app.db.retrieve(`/getAllData/${app.user.id}`, app.user, data => {
      console.log('[DASH]: Fetch all data');

      // Sort returned data
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

      // find unexpired campaigns
      app.user.campaigns.forEach(campaign => {
        if (todaysDate <= new Date(campaign.expiry)) {
          console.log('Campaign has not expired');
          theseCampaigns.push(campaign);
        }
      });

      // find unexpired buckets
      theseCampaigns.forEach(campaign => {
        let buckets = campaign.buckets;
        buckets.forEach(bucket => {
          if (todaysDate <= new Date(bucket.expiry)) {
            console.log('Bucket has not expired');
            unexpiredBuckets.push(bucket);
          }
        });
      });

      // sort buckets by priority
      unexpiredBuckets.sort((a, b) => {
        if (a.priority > b.priority) {
          return 1;
        }
        if (a.priority < b.priority) {
          return -1;
        }
        return 0;
      });

      // Get all potental posts
      unexpiredBuckets.forEach(bucket => {
        let psts = [];
        if (bucket.repeat) {
          psts.push(bucket.posts);
        } else {
          let allPosts = bucket.posts;
          let possiblePosts = [];
          allPosts.forEach(post => {
            if (post.lastPostDate !== '1970-01-01T00:00:00Z') {
              possiblePosts.push(post);
            }
          });
          psts.push(possiblePosts);
        }

        // Extract posts not published in the last week
        psts.forEach(pstArray => {
          let thisWeeksPostNum = 0;
          let notPosted = [];
          pstArray.forEach(pst => {
            let postDate = new Date(pst.lastPostDate);
            let daysAgo = Math.floor((todaysDate.getTime() - postDate.getTime()) / (1000*60*60*24.0));
            if( daysAgo > 0 && daysAgo <= 7 ) {
              thisWeeksPostNum += 1;
            } else {
              notPosted.push(pst);
            }
          });

          // get a random post upto the max per day for the bucket
          if ( thisWeeksPostNum < parseInt(bucket.frequency) && notPosted.length > 0) {
            for (let i = 0; i < parseInt(bucket.maxPerDay); i++) {
              let randomEl = Math.floor(Math.random() * notPosted.length);
              potentialPosts.push(notPosted[randomEl]);
              notPosted.splice(randomEl, 1);
            }
          }
        });

      });

      console.log(potentialPosts);

      // get random items from array, preventing duplication
      let toPost = [];
      for (let i = 0; i < app.user.maxDailyPosts; i++) {
        let randomEl = Math.floor(Math.random() * potentialPosts.length);
        toPost.push(potentialPosts[randomEl]);
        potentialPosts.splice(randomEl, 1);
      }

      // Generate HTML and update DOM
      let ids = toPost.map(el => { return el.postID; });
      let html = app.publishView.index(toPost, ids);
      this.updateShell(html);
      this.updateHistory('publish_index');
    });
  }

  /**
  * Sends a request to the server to send the selected posts to buffer.
  */
  create(ids) {
    console.log('[Publish] Create Hit for: ' + ids);

    // get the remaining post ids from the document and create an object
    let posts = {
      user : User.prepareForUpload(app.user),
      posts : ids.split(',')
    };

    // send them to the server for posting
    app.db.publish(`/publish/${app.user.id}`, posts);

    // update the dom
    this.updateShell('Posts sent');
    this.updateHistory('publish_confirm');
  }
}
