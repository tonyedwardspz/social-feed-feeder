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
    return new Promise(
      function(resolve, reject) {
        mongoModel.find({ 'userID': userID}, function(err, data) {
          if (err) {

            reject(err);
          } else {
            resolve({ 'campaigns' : data });
          }
        });
      }
    );
  }
}

module.exports = new Campaign();
