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
    dashboardView: new Dashboard(),
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
      } else if (e.target.id === 'campaigns') {
        clearDOM();
        app.campaignController.index();
      }


    }


  });

  // document.querySelector('.campaign_but').addEventListener('click', function(e) {
  //   e.preventDefault();
  //   var id = this.id;
  //   console.log('Campaign button hit: ID ' + id);
  //
  //
  // });

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
