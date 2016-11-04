var mongoose = require ('mongoose');

class Database {
  constructor() {
    this.createConnection();
  }

  get() {
    return this.db;
  }

  createConnection(){
    mongoose.connect(process.env.MONGODB_URI, function (err) {
      if (err) {
        console.log ('ERROR connecting to DB: ' + err);
      } else {
        console.log ('Succeeded connected to DB');
      }
    });
  }
}

module.exports = new Database();
