'use strict';

/** A class to control user actions */
class UserController extends BaseController {
  constructor() {
    super();
  }

  /**
  * Gets a cookie for the passed name
  * @param {String} name The name of the cookie to retrieve
  * @return {String} The value of the cookie requested
  */
  getCookie(name) {
    try {
      var value = '; ' + document.cookie;
      var parts = value.split('; ' + name + '=');
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    } catch (error) {
      console.warn(`Could not retrieve the cookie: ${name}`);
    }
  }

  /**
  * Checks that the user is authenticated by looking for the 'user_auth' cookie.
  * It the generates a new user from a retrieved id
  */
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

  edit() {
    console.log('[User Controller] Edit: ' + app.user.id);
    let html = app.userView.edit(app.user);
    this.updateShell(html);
  }

  update() {
    console.log('[User Controller] Update: ' + app.user.id);
    let form = document.querySelector('form');

    this.validateFormData(form, () => {
      document.getElementById('user_save').disabled = true;

      app.user.updateFromForm(form);
      app.db.publish(`/user/${app.user.id}`, app.user, 'PUT');

      app.dashboardController.index();
    });

  }
}
