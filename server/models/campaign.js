'use strict';

var mongoose = require('mongoose');

class Campaign {
  constructor() {
    this.mongooseModel = mongoose.model('campaign', this.getMongooseSchema());
  }

  getMongooseModel() {
    return this.mongooseModel;
  }

  getMongooseSchema() {
    return new mongoose.Schema({
      name: String,
      description: String,
      expiry: Date,
      dailyPosts: Number,
      userID: String
    });
  }

}

module.exports = new Campaign();
