'use strict'

var mongoose = require('mongoose');
let BaseModel = require('./base');

class User extends BaseModel{
  constructor() {
    super();
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
        userID: String,
        accessToken: String,
        refreshToken: String,
        accountIDS: Array
    });
  }

  getDatabasePromise(userID) {
    let mongoModel = this.getMongooseModel();
    return this.getPromise(mongoModel, userID, 'users');
  }
}

module.exports = User;
