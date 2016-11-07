'use strict'

var mongoose = require('mongoose');

class User {
  constructor() {
    this.mongooseModel = mongoose.model('user', this.getMongooseSchema());
  }

  setID(id) {
    this.id = id;
  }

  getID() {
    return this.id;
  }

  getMongooseModel() {
    return this.mongooseModel;
  }

  getMongooseSchema() {
    return new mongoose.Schema({
        name: String,
        bufferID: String,
        accessToken: String,
        refreshToken: String,
        accountIDS: Array
    });
  }

}

module.exports = User;
