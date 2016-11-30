'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');
let formidable = require('formidable');
let path = require('path');
let fs = require('fs');

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

  extractImageAndSave(req, res) {
    let form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(_root , `/public/images/uploads`);

    // save the attached image to '/public/images/uploads/'
    form.on('file', function(field, file) {
      fs.rename(file.path, path.join(form.uploadDir, file.name.split(' ').join('_')));
    });

    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });

    // parse the incoming request containing the form data and save
    form.parse(req, (err, fields, files) => {
      this.updatePost(req, res, JSON.parse(fields.post));
    });
  }

  // TODO: Switch to promises to handle res.send
  delete(req, res, field = 'postID') {
    let thisPost = this.getObject(field, req.params.id);

    this.getMongooseModel().remove(thisPost, (err, removed) => {
      if (err) {
        console.log(`Error deleting post ${err}`);
      } else {
        console.log(`Post removed: ${removed}`);
      }

      // quick fix to prevent 4 deep nested callbacks
      if (field === 'postID'){
        res.send(JSON.stringify({ a: `${err ? err : removed}` }));
      }
    });
  }
}

module.exports = new Post();
