'use strict';

class UsersController extends ApplicationController {
  constructor(database) {
    super(database);
    console.log('Users Controller');
  }

  getAll() {
    this.db.retrieve('/users', function(result){
      console.log('Result returned', result);
    });
  }

  auth(){

  }

  authCallback() {

  }

  createNew() {

  }

  delete() {

  }
}
