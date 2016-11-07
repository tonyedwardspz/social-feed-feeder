class DashboardView {
  constructor() {

  }

  getDashboard(campaigns, buckets, posts){
    console.log('get dashboard');
    return `<h1>Dashboard View<h1>
            <p>This is the main dashboard view<p>
            <div class="boxes">
              <div class="box">
                <span>${campaigns.length}</span>
                <span>Campaigns</span>
              </div>
              <div class="box">
                <span>${buckets.length}</span>
                <span>Buckets</span>
              </div>
              <div class="box">
                <span>${posts.length}</span>
                <span>Posts</span>
              </div>
            </div>
            <button id='campaign_index'>View Campaigns</button>`;
  }
}
