'use strict';

let BaseController = require('./base');
let bufferAPI = require('buffer-node');
let User = require('../singletons/user-singleton').getInstance().getMongooseModel();
let Post = require('../models/post');

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

      Post.getMongooseModel().find({ 'postID': { $in: req.body.posts }}, (err, posts) => {
        posts.forEach(post => {
          let options = {};
          options.media = {};
          options.media.photo = post.attachment;
          // options.media.image = post.attachment;
          // options.media.photo = post.attachment;
          // options.media.image = post.attachment;
          // if (post.attachment.length > 10) {
          //   options = {
          //     media: [ 'photo' post.attachment ]
          //   }
          // }
          console.log(options);
          buffer.updates.create(post.message,
                                user.accountIDS,
                                options
                              );
        });
      });
    });
  }
}

module.exports = new PublishController();
