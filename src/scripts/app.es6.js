'user strict';

const CONFIG = {
  campaigns : `/campaigns`,
  user : `/user/auth`,
  *[Symbol.iterator]() {
    let properties = Object.keys(this);
    for (let i of properties) {
        yield this[i];
    }
  }
};

(function(){

  let app = {
    db : null
  };


  let database = new Database();
  app.campaignsController = new CampaignsController(database);
  app.usersController = new UsersController(database);

  // // test routes work
  // for (let value of CONFIG) {
  //     app.db.retrieve(value);
  // }

  app.campaignsController.getAll();
  app.usersController.getAll();

})();
