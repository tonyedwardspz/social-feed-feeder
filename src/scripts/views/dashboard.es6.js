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
    return `<div class="row">
              <div class="column">
              ${getBreadcrumbs('dashboard', null)}
              </div>
            </div>
            <div class="row">
              <div class="column">
                <h2>Welcome</h2>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <p>Welcome to Social Feed Feeder, your personal social media
                   scheduler.</p>
              </div>
            </div>
            <div class="row stat-container">
              <div class="column stats">
                <span>${campaigns.length}</span>
                <span>Campaigns</span>
              </div>
              <div class="column stats">
                <span>${buckets.length}</span>
                <span class="green">Buckets</span>
              </div>
              <div class="column stats">
                <span>${posts.length}</span>
                <span class="orange">Posts</span>
              </div>
            </div>
            <div class="row">
              <div class="column">
                <button id='campaign_index'>View Campaigns</button>
                <button id='publish_index'>Schedule Posts</button>
              </div>
            </div>`;
  }
}
