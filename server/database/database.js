'use strict';

let mongoose = require('mongoose');

class Database {
  constructor() {
    this.createConnection();
  }

  createConnection(){
    mongoose.connect(process.env.MONGODB_URI, function (err) {
      if (err) {
        console.log ('ERROR connecting to DB: ' + err);
      } else {
        console.log ('Succeeded connected to DB');
      }
    });

    this.connection = mongoose.connection;
  }
}

module.exports = new Database();
