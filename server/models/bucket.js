'use strict';

var mongoose = require('mongoose');

class Bucket {
  constructor() {
    this.mongooseModel = mongoose.model('bucket', this.getMongooseSchema());
  }

  getMongooseModel() {
    return this.mongooseModel;
  }

  getMongooseSchema() {
    return new mongoose.Schema({
      campaignID: String,
      name: String,
      description: String,
      priority: Number,
      maxPerDay: Number,
      repeat: Boolean,
      frequency: Number
    });
  }
}

module.exports = new Bucket();
