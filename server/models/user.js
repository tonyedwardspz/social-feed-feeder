'use strict'

var mongoose = require('mongoose');

class User {
  constructor() {

  }

  static getMongooseModel() {
    return mongoose.model('user', this.getMongooseSchema());
  }

  static getMongooseSchema() {
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
