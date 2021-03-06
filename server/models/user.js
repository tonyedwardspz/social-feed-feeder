'use strict';

let mongoose = require('mongoose');
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
        email: String,
        maxDailyPosts: Number,
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

  sortBufferAccountIDs(accounts) {
    let accs = [];

    for(let i = 0; i < accounts.length; i++) {
      if (accounts[i].service === 'twitter') {
        accs.push(accounts[i].id);
      }
    }
    return accs;
  }
}

module.exports = User;
