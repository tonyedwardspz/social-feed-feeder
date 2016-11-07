'use strict';

var mongoose = require('mongoose');
var BaseModel = require('./base');

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
      priority: Number,
      maxPerDay: Number,
      repeat: Boolean,
      frequency: Number
    });
  }

  getDatabasePromise(userID) {
    return this.getPromise(this.getMongooseModel(), userID, 'buckets');
  }
}

module.exports = new Bucket();
