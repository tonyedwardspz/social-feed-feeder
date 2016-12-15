'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');
let formidable = require('formidable');
let path = require('path');
let fs = require('fs');
var cloudinary = require('cloudinary');

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
    this.getMongooseModel().findOneAndUpdate(
      { postID: post.postID },
      {
        message: post.message,
        lastPostDate: post.lastPostDate,
        attachment: post.attachment,
        userID: post.userID,
        bucketID: post.bucketID
      },
      {
        new: true,
        upsert: true
      }, (err, updated) => {
        if (err) {
          console.log(`Error saving post: ${err}`);
        } else {
          console.log(`Post Updated: ${updated}`);
          res.setHeader('Content-Type', 'application/json');
          res.body = updated;
          res.json(JSON.stringify(updated));
        }
      }
    );
  }

  updatePostDatePromise(post){
    return new Promise((resolve, reject) =>{
        this.getMongooseModel().findOneAndUpdate(
          { postID: post.postID },
          { $set:
            { lastPostDate: new Date().toISOString() }
          }, (err, updated) => {
            if (err) {
              reject(err);
            } else {
              resolve(updated);
            }
          }
        );
      }
    );
  }

  extractImageAndSave(req, res) {
    let form = new formidable.IncomingForm();
    form.multiples = true;

    form.on('error', (err) => {
      console.log('An error has occured: \n' + err);
    });

    // parse the incoming request containing the form data
    // upload to cloudinary and save
    form.parse(req, (err, fields, files) => {
      cloudinary.uploader.upload(files.image.path,
        (result) => {
          console.log(result);

          let post = JSON.parse(fields.post);
          post.attachment = result.secure_url;
          this.updatePost(req, res, post);
        }
      );
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
