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

  auth(){
    return true;
  }
}
