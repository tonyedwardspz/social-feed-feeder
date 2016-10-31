var mongodb = require('mongodb');

class Database {
  constructor() {
    this.db = null;
    this.createConnection();

  }

  get() {
    return this.db;
  }

  createConnection(){
    let db;
    mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
      if (err) {
        console.log(err);
        // process.exit(1);
      }

      // Save database object from the callback for reuse.
      console.log('[DB] Connection ready');
      db = database;
      // return database;
    });
    this.db = db;
  }
}

module.exports = new Database();
