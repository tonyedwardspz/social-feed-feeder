'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');

class Bucket extends BaseModel{
  constructor() {
    super();
    this.mongooseModel = mongoose.model('bucket', this.getMongooseSchema());
  }

  getMongooseModel() {
    return this.mongooseModel;
  }

  getMongooseSchema() {
    return new mongoose.Schema({
      bucketID: String,
      campaignID: String,
      userID: String,
      name: String,
      description: String,
      expiry: Date,
      priority: Number,
      maxPerDay: Number,
      repeat: Boolean,
      frequency: Number
    });
  }

  getDatabasePromise(userID) {
    return this.getPromise(this.getMongooseModel(), userID, 'buckets');
  }

  doesItRepeat(repeat){
    if (repeat === 'on'){
      return true;
    } else {
      return false;
    }
  }
}

module.exports = new Bucket();
