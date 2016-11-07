'use strict';

var mongoose = require('mongoose');
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
      bucketID: String,
      userID: String,
      name: String,
      description: String,
      lastPostDate: Date,
      content: String,
      expiry: Date
    });
  }

  getDatabasePromise(userID) {
    let mongoModel = this.getMongooseModel();
    return this.getPromise(mongoModel, userID, 'posts');
  }
}

module.exports = new Post();
