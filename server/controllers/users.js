'use strict';

let BaseController = require('./base');
var pushpad = require('pushpad');
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

  // GET /user/:id/notification
  notification(req, res) {
    console.log('[User] Notification hit');

    let notification = new pushpad.Notification({
      project: global.pushPadProject,
      body: 'Hello world!', // max 120 characters
      title: 'Website Name', // optional, defaults to your project name, max 30 characters
      targetUrl: 'http://example.com', // optional, defaults to your project website
      iconUrl: 'http://example.com/assets/icon.png', // optional, defaults to the project icon
      ttl: 604800 // optional, drop the notification after this number of seconds if a device is offline
    });

    notification.deliverTo(req.params.id, function (err, result) {
      console.log('Send notification to user: ', req.params.id);
      console.log(err || result);
    });

  }
}

module.exports = new UserController();
