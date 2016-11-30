'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');

class Post extends BaseModel{
  constructor() {
    super();
    this.mongooseModel = mongoose.model('post', this.getMongooseSchema());
  }

  getMongooseModel() {
    return this.mongooseModel;
  }

  getMongooseSchema() {
    return new mongoose.Schema({
      postID: String,
      bucketID: String,
      userID: String,
      message: String,
      lastPostDate: Date,
      attachment: String,
    });
  }

  getDatabasePromise(userID) {
    let mongoModel = this.getMongooseModel();
    return this.getPromise(mongoModel, userID, 'posts');
  }

  saveNewPost(req, res, post) {
    let mongoPost = this.getMongooseModel();
    let newPost = new mongoPost({
      postID: post.postID,
      bucketID: post.bucketID,
      userID: post.userID,
      message: post.message,
      lastPostDate: post.lastPostDate,
      attachment: post.attachment
    });

    var result = 'sucess';
    newPost.save(err => {
      if (err) {
        console.log(err);
        result = `error saving post : ${err}`;
      }
    });

    res.send(JSON.stringify({ a: result }));
  }

  updatePost(req, res, post) {
    this.getMongooseModel().update({ postID: post.postID }, {$set: {
      message: post.message,
      lastPostDate: post.lastPostDate,
      attachment: post.attachment
    }}, (err, updated) => {
      if (err) {
        console.log(`Error saving post: ${err}`);
      } else {
        console.log(`Post Updated: ${updated}`);
        res.send(JSON.stringify({ a: 'Post Updated Succesfully' }));
      }
    });
  }
}

module.exports = new Post();
