'use strict';

class User {
  constructor(id) {
    this.id = id;
  }

  // User may already created by this point so we can't instaiate a new one.
  // This would overwrite data returned from the server
  static extractUserData(userData) {
    app.user.id = userData[0].userID;
    app.user.name = userData[0].name;
  }
}
