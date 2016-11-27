'use strict';

/** Class representing the dashboard view */
class DashboardView {
  constructor() {

  }

  /**
  * Returns HTML for the main dashboard screen
  * @param {Array.<Campaign>} campaigns An array of campaign objects
  * @param {Array.<Bucket>} campaigns An array of bucket objects
  * @param {Array.<Posts>} campaigns An array of post objects
  * @return {String} The HTML string for display
  */
  getDashboard(campaigns, buckets, posts){
    console.log('[Dashboard] Get');
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
