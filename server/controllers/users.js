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
    console.log(req.user);
    console.log('[User] Auth Success');
    res.cookie('user_auth', 'true');
    res.cookie('user_id', req.user.bufferID);
    res.cookie('user_name', req.user.name);
    res.writeHead(302, {'Location': '/'});
    res.end();
  }

  authFailure(err, req, res, next) {
    console.log('[User] Auth failure: ' + err);
    res.send(err);
  }

  getAllData(req, res) {
    
  }

  // PATCH/PUT /users/:id
  update(req, res) {
    console.log('[User] Update user');
  }
}

module.exports = new UserController();
