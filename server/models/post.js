'use strict';

var mongoose = require('mongoose');

class Post {
  constructor() {
    this.mongooseModel = mongoose.model('post', this.getMongooseSchema());
  }

  getMongooseModel() {
    return this.mongooseModel;
  }

  getMongooseSchema() {
    return new mongoose.Schema({
      bucketID: String,
      name: String,
      description: String,
      lastPostDate: Date,
      content: String,
      expiry: Date
    });
  }
}

module.exports = new Post();
