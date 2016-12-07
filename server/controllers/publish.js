'use strict';

let BaseController = require('./base');
let bufferAPI = require('buffer-node');
let User = require('../singletons/user-singleton').getInstance().getMongooseModel();

class PublishController extends BaseController {
  constructor() {
    super('publish controller');
  }

  publishPosts(req, res) {
    console.log('Publish Posts Hit');

    User.findOne({ 'userID': req.cookies.user_id }, (err, user) => {
      if (err) {
        console.log('error fetching user while sending posts: ', err);
        res.send(JSON.stringify({ a: 'Error fetching user while sending posts' }));
        return;
      }

      let buffer = bufferAPI(req.cookies.auth_token);

      buffer.updates.create('This is the first update from social feed reader',
                            user.accountIDS,
                            null
                          );

      buffer.updates.create('This is the secons update from social feed reader',
                            user.accountIDS,
                            { top: true}
                          );
    });

    console.log(req.cookies.auth_token);
  }


}

module.exports = new PublishController();
