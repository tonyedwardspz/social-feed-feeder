'use strict';

let BaseController = require('./base');
let notifications = require('../models/notification');


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

  // GET /user/notification
  notification(req, res) {

    // make the pushpad object accessable
    console.log('[User] Notification hit for user ' + req.cookies.user_id);

    if (req.cookies.user_id) {

      try {
        let notification = notifications.getNewNotification();

        notification.deliverTo(req.cookies.user_id, function (err, result) {
          console.log('Notification sent to user: ', req.cookies.user_id);
          console.log(err || result);
          if (err) {
            res.send(err);
          } else {
            res.sendStatus(200);
          }
        });
      } catch (error){
        res.send(error);
      }

    }
  }
}

module.exports = new UserController();
