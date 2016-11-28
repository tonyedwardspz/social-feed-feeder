'use strict';

class UserController extends BaseController {
  constructor() {
    super();
  }

  getAll() {
    this.db.retrieve('/users', function(result){
      console.log('Result returned', result);
    });
  }

  getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  checkAuthentication() {
    if (this.getCookie('user_auth') === 'true'){
      console.log('[User Controller] Succesfully authenticated');
      if (app.user === null) {
        app.user = new User(this.getCookie('user_id'));
        app.dashboardController.index(app.user);
      }
    } else {
      console.log('[User Contoller] Not authenticated');
      app.shell.innerHTML = app.userView.loginScreen();
    }
  }

  auth(){
    return true;
  }
}
