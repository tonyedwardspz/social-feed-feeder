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
      name: String,
      message: String,
      lastPostDate: Date,
      attachment: String,
      expiry: Date
    });
  }

  getDatabasePromise(userID) {
    let mongoModel = this.getMongooseModel();
    return this.getPromise(mongoModel, userID, 'posts');
  }
}

module.exports = new Post();
