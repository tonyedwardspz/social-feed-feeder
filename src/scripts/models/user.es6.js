'use strict';

class User {
  constructor(id) {
    this.id = id;
  }

  // User may already created by this point so we can't instaiate a new one.
  // This would overwrite data returned from the server
  static extractUserData(userData) {
    app.user.id = userData[0].userID;
    app.user.email = userData[0].email;
    app.user.maxDailyPosts = userData[0].maxDailyPosts;
    app.user.name = userData[0].name;
  }

  updateFromForm(form) {
    this.name = form.name.value;
    this.email = form.email.value;
    this.maxDailyPosts = form.maxDailyPosts.value;
  }
}
