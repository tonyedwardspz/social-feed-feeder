'use strict'

var mongoose = require('mongoose');

class Campaign {
  constructor() {

  }

  static getMongooseModel() {
    return mongoose.model('campaign', this.getMongooseSchema);
  }

  static getMongooseSchema() {
    return new mongoose.Schema({
      name: String,
      description: String,
      expiry: Date,
      dailyPosts: Number,
      userID: String
    });
  }

}

module.exports = Campaign;
