'use strict';

let BaseController = require('./base');
let MongoPost = require('../models/post').getMongooseModel();

class PostController extends BaseController {
  constructor() {
    super('post controller');
  }

  // GET /posts
  index(req, res) {
    console.log('[Controller] Post:GET hit');
    res.send(JSON.stringify({ a: 'Response from Posts GET' }));
  }

  // GET /posts/:id
  show(req, res) {
    console.log('[ROUTE] Posts:GET:id hit');
    res.send(JSON.stringify({ a: 'Response from Posts GET:id' }));
  }

  // GET /posts/new
  new(req, res) {

  }

  // GET /posts/:id/edit
  edit(req, res) {

  }

  // POST /posts
  create(req, res) {
    console.log('[ROUTE] Posts:POST hit');

    let bucket = new MongoPost({
      postID: req.body.postID,
      bucketID: req.body.bucketID,
      userID: req.body.userID,
      message: req.body.message,
      lastPostDate: req.body.lastPostDate,
      attachment: req.body.attachment
    });

    var result = 'sucess';
    bucket.save(err => {
      if (err) {
        console.log(err);
        result = `error saving bucket : ${err}`;
      }
    });

    res.send(JSON.stringify({ a: result }));
  }

  // PATCH/PUT /posts/:id
  update(req, res) {
    console.log('[ROUTE] Posts:PUT hit');

    MongoPost.update({ postID: req.params.id }, {$set: {
      message: req.body.message,
      lastPostDate: req.body.lastPostDate,
      attachment: req.body.attachment
    }}, (err, updated) => {
      if (err) {
        console.log(`Error deleting campaign: ${err}`);
      } else {
        console.log(`Campaign removed: ${updated}`);
        res.send(JSON.stringify({ a: 'Post Updated Succesfully' }));
      }
    });  
  }

  // DELETE /posts/:id
  delete(req, res) {
    console.log('[ROUTE] Posts:DELETE hit');

    MongoPost.remove({ postID: req.params.id }, (err, removed) => {
      if (err) {
        console.log(`Error deleting post ${err}`);
      } else {
        console.log(`Post removed: ${removed}`);
      }
      res.send(JSON.stringify({ a: `${err ? err : removed}` }));
    });
  }
}

module.exports = new PostController();
