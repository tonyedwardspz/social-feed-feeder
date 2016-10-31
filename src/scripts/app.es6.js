'user strict';

// const CONFIG = {
//   campaigns : `/campaigns`,
//   user : `/user/auth`,
//   *[Symbol.iterator]() {
//     let properties = Object.keys(this);
//     for (let i of properties) {
//         yield this[i];
//     }
//   }
// };

function clearDOM() {
  app.shell.innerHTML = '';
}

var app;

(function(){

  app = {
    shell: document.querySelector('main'),
    spinner: document.querySelector('.loader'),
    db : new Database(),
    userView: new UserView(),
    userController: new UserController(),
    dashboardView: new DashboardView(),
    dashboardController: new DashboardController(),
    campaignController: new CampaignsController(),
    campaignView: new CampaignView()
  };

  app.shell.innerHTML = app.userView.loginScreen();
  app.spinner.classList.add('hidden');



  app.shell.addEventListener('click', function(e){
    // e.preventDefault();
    if (e.target !== e.currentTarget) {
      if (e.target.id === 'login' ){
        console.log('Login Button Clicked');
        if (app.userController.auth()) {
          app.dashboardController.index();
        }
      } else if (e.target.id === 'campaign_index') {
        app.campaignController.index();
      } else if (e.target.className === 'campaign_show'){
        app.campaignController.show(e.target.dataset.id);
      } else if (e.target.id === 'campaign_new') {
        app.campaignController.new();
      }
    }


  });


  // clearDOM();
  // let database = new Database();
  // app.campaignsController = new CampaignsController(database);
  // app.usersController = new UsersController(database);

  // // test routes work
  // for (let value of CONFIG) {
  //     app.db.retrieve(value);
  // }

  // app.campaignsController.getAll();
  // app.usersController.getAll();

})();
