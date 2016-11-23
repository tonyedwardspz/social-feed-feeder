'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');

class Campaign extends BaseModel {
  constructor() {
    super();
    this.mongooseModel = mongoose.model('campaign', this.getMongooseSchema());
  }

  getMongooseModel() {
    return this.mongooseModel;
  }

  getMongooseSchema() {
    return new mongoose.Schema({
      campaignID: String,
      name: String,
      description: String,
      expiry: Date,
      dailyPosts: Number,
      userID: String
    });
  }

  getDatabasePromise(userID) {
    let mongoModel = this.getMongooseModel();
    return this.getPromise(mongoModel, userID, 'campaigns');
  }
}

module.exports = new Campaign();
