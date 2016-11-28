'use strict';

class UserView {
  constructor(){

  }

  show(user) {
    return `<h2>Show User</h2>
            <p>This is the show user view</p>`;
  }

  edit(user) {
    return `<h2>Edit User</h2>
            <p>This is view to edit the user</p>`;
  }

  loginScreen(){
    return `<h2>Feed Feeder</h2>
            <button id='login' name='login'>Login</button>
            <p>Feed Feeder is a social media queing tool</p>`;
  }
}
