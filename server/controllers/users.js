'use strict';

var BaseController = require('./base');

class UserController extends BaseController {
  constructor() {
    super('user controller');
  }

  auth() {
    console.log('[User] Auth hit');
  }

  authSuccess(req, res) {
    return function(req, res) {
      console.log('[User] Auth Success');
      res.cookie('user_auth', 'true');
      res.writeHead(302, {'Location': '/'});
      res.end();
    };
  }

  authFailure(err, req, res, next) {
    return function(err, req, res, next) {
      console.log('[User] Auth failure: ' + err);
      res.send(err);
    };
  }

  // PATCH/PUT /users/:id
  update(req, res) {
    console.log('[User] Update user');
  }
}

module.exports = new UserController();
