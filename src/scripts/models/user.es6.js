'use strict';

/** A class representaing a user */
class User {
  /**
  * @param {id} id The id of the user to generate
  */
  constructor(id) {
    this.id = id;
  }

  /**
  * Updates the apps user with the JSON data from the server. There is no guarentee
  * that an actual user will 'exist' and the point of execution, allthough a
  * dummy object is available
  * @param {Array.JSON} userData JSON data returned from the server
  */
  static extractUserData(userData) {
    app.user.id = userData[0].userID;
    app.user.email = userData[0].email;
    app.user.maxDailyPosts = userData[0].maxDailyPosts;
    app.user.name = userData[0].name;
  }

  /**
  * Updates the current user from the values entered in the users's form
  * @param {Form} form HTML form for values to be extracted from
  */
  updateFromForm(form) {
    this.name = form.name.value;
    this.email = form.email.value;
    this.maxDailyPosts = form.maxDailyPosts.value;
  }

  /**
  * Removes extra data from the user object to avoid uploading all data
  * from the application whenever a user updates their settings.
  * A bit like a JavaScript weightwatchers session.
  * @param {User} user The user object to put on a diet
  * @return {User} The timmed user object
  */
  static prepareForUpload(user){
    delete user.campaigns;
    delete user.posts;
    delete user.buckets;
    return user;
  }
}
