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
      let postUpdatePromises = [];

      // find object, send to buffer and update last post date
      Post.getMongooseModel().find({ 'postID': { $in: req.body.posts }}, (err, posts) => {
        posts.forEach(post => {
          let options = {};
          options.media = {};
          options.media.photo = post.attachment;
          buffer.updates.create(post.message,
                                user.accountIDS,
                                options);

          postUpdatePromises.push(Post.updatePostDatePromise(post));
        });

        // Once all dates updated send response
        Promise.all(postUpdatePromises).then(() => {
          console.log(`All ${postUpdatePromises.length} posts updated`);
          res.send('All posts updated');
        }, (err) => {
          console.log('Error updating post after scheduling');
          res.send('No posts updated');
        });
      });
    });
  }
}

module.exports = new PublishController();
