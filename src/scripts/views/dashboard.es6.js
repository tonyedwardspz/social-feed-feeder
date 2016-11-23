'use strict';

class DashboardView {
  constructor() {

  }

  getDashboard(campaigns, buckets, posts){
    console.log('get dashboard');
    return `${getBreadcrumbs('dashboard', null)}
            <h2>Dashboard View</h2>
            <p>This is the main dashboard view<p>
            <div class="row">
              <div class="column">
                <span>${campaigns.length}</span>
                <span>Campaigns</span>
              </div>
              <div class="column">
                <span>${buckets.length}</span>
                <span>Buckets</span>
              </div>
              <div class="column">
                <span>${posts.length}</span>
                <span>Posts</span>
              </div>
            </div>
            <button id='campaign_index'>View Campaigns</button>`;
  }
}
