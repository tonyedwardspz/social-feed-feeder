'use strict';

/** A class representing the User settings views */
class UserView {
  constructor(){

  }

  /**
  * Returns HTML for the user setting page
  * @param {User} user The user object to populate the view with
  * @return {String} The HTML string to display
  */
  edit(user) {
    return `<h2>Edit Your Details</h2>
            <p>To get the most from this application, please
            <a href="https://socialfeedfeeder.pushpad.xyz/p/2376"
            title="Enable Push Notifications" id="enable-push">enable push
            notifications</a>.<p>
            ${this.form(user)}`;
  }

  /**
  * Returns HTML for the user settings form
  * @param {User} user The user object to populate the form with
  * @return {String} The HTML string for the form
  */
  form(user) {
    return `<form name="edit-user-form">
              <label for="name">Name</label>
              <input type="text" id="name" name="name"
                     value="${user.name}" required/>

              <label for="email">Email</label>
              <input type="email" name="email" id="email"
                     value="${user.email ? user.email : ''}"
                     placeholder="example@email.com" required />

              <label for="maxDailyPosts">Maximum Daily Posts</label>
              <input type="number" name="maxDailyPosts" id="maxDailyPosts"
                     value="${user.maxDailyPosts ? user.maxDailyPosts : 1}" />

              <button id="user_save">Save</button>
              <button id="dashboard_index" class="danger">Cancel</button>
            </form>`;
  }

  loginScreen(){
    return `<h2>Feed Feeder</h2>
            <button id='login' name='login'>Login</button>
            <p>Feed Feeder is a social media queing tool</p>`;
  }
}
