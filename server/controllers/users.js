'use strict';

let BaseController = require('./base');
// var User = require('../singletons/user-singleton').getInstance();
// var UserMM = User.getMongooseModel();


class UserController extends BaseController {
  constructor() {
    super('user controller');
  }

  auth() {
    console.log('[User] Auth hit');
  }

  authSuccess(req, res) {
    console.log('[User] Auth Success');

    res.cookie('user_auth', 'true');
    res.cookie('user_id', req.user.userID);
    res.cookie('user_name', req.user.name);
    res.writeHead(302, {'Location': '/'});
    res.end();
  }

  authFailure(err, req, res, next) {
    console.log('[User] Auth failure: ' + err);

    res.send(err);
  }

  // PATCH/PUT /users/:id
  update(req, res) {
    console.log('[User] Update user');
  }
}

module.exports = new UserController();
