'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');

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
      expiry: Date,
      priority: Number,
      maxPerDay: Number,
      repeat: Boolean,
      frequency: Number
    });
  }

  getDatabasePromise(userID) {
    return this.getPromise(this.getMongooseModel(), userID, 'buckets');
  }

  doesItRepeat(repeat){
    if (repeat === 'on'){
      return true;
    } else {
      return false;
    }
  }

  // TODO: Switch to promises to handle res.send
  delete(req, res, field = 'bucketID') {
    let thisBucket = this.getObject(field, req.params.id);

    this.getMongooseModel().remove(thisBucket , (err, removed) => {
      if (err) {
        console.log(`Error deleting bucket ${err}`);
      } else {
        console.log(`Buckets removed: ${removed}`);
      }

      // quick fix to prevent 4 deep nested callbacks
      if (field === 'bucketID'){
        res.send(JSON.stringify({ a: `${err ? err : removed}` }));
      }
    });
  }
}

module.exports = new Bucket();
