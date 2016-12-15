'use strict';

/** A class representing the publish posts view */
class PublishView {
  constructor() {

  }

  /**  Generates the html for the publish posts view */
  index(posts, ids) {
    return `${getBreadcrumbs('publish_index')}
            <h2>Publish Posts</h2>
            <div class="row">
              <div class="column">
                <p>Here are suggested poast to send to Buffer. Check them out
                and hit publish.</p>
              </div>
            </div>
            <div class="publish-posts">
              ${app.postView.postList(posts)}
            </div>
            <button id="publish_these_posts" data-ids="${ids}">
            Publish These Posts</button>
            `;
  }

  sucess() {
    return `${getBreadcrumbs('publish_sucess')}
            <h2>WooHoo</h2>
            <p>Your posts have been sucessfully posted to buffer.</p>
            <p>Keep a beady eye on your twitter stream for your shiney new content!</p>
            <p>In the mean time.....
            <a href="/dashboard_index" title="Dashboard">head to the dashboard</a> to add some more.`;
  }
}
