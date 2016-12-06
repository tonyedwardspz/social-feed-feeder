'use strict';

let BaseController = require('./base');
let notifications = require('../models/notification');
let UserMongooseModel = require('../singletons/user-singleton')
                                              .getInstance().getMongooseModel();


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
    console.log('[User] Update user: ' + req.body.id);

    UserMongooseModel.update({userID: req.body.id.trim()}, { $set: {
      name: req.body.name,
      email: req.body.email,
      maxDailyPosts: req.body.maxDailyPosts
    }}, (err, updated) => {
      if (err){
        console.log('Error updating user', err);
      } else {
        console.log(`[User] updated: ${updated}`);
        res.send(JSON.stringify({ a: '[User] Updated Succesfully' }));
      }
    });
  }

  // GET /user/notification
  notification(req, res) {
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
