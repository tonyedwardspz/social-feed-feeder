class Dashboard {
  constructor() {

  }

  getDashboard(){
    console.log('get dashboard');
    return `<h1>Dashboard View<h1>
            <p>This is the main dashboard view<p>
            <button id='campaigns'>View Campaigns</button>`;
  }
}
