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

  getDatabasePromise(userID) {
    let mongoModel = this.getMongooseModel();
    return new Promise(
      function(resolve, reject) {
        mongoModel.find({ 'bufferID': userID}, function(err, data) {
          if (err) {
            reject(err);
          } else {
            resolve({ 'user' : data });
          }
        });
      }
    );
  }

}

module.exports = User;
