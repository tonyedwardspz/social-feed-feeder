'use strict';

class UserController extends BaseController {
  constructor() {
    super();
    console.log('Users Controller');
  }

  getAll() {
    this.db.retrieve('/users', function(result){
      console.log('Result returned', result);
    });
  }

  auth(){
    return true;
  }

  authCallback() {

  }

  createNew() {

  }

  delete() {

  }
}
