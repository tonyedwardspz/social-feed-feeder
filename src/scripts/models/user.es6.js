/* globals User, getCookie */
/* exported User */

class User {
  constructor() {
    this.id = getCookie('user_id');
  }

  // User may already created by this point so we can't instaiate a new one.
  // This would overwrite data returned from the server
  static extractUserData(userData) {
    app.user.id = userData.id;
    app.user.name = userData.name;
  }
}
