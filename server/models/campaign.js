'use strict';

let mongoose = require('mongoose');
let BaseModel = require('./base');

class Campaign extends BaseModel {
  constructor() {
    super();
    this.mongooseModel = mongoose.model('campaign', this.getMongooseSchema());
  }

  getMongooseModel() {
    return this.mongooseModel;
  }

  getMongooseSchema() {
    return new mongoose.Schema({
      campaignID: String,
      name: String,
      description: String,
      expiry: Date,
      dailyPosts: Number,
      userID: String
    });
  }

  getDatabasePromise(userID) {
    let mongoModel = this.getMongooseModel();
    return this.getPromise(mongoModel, userID, 'campaigns');
  }

  delete(req, res, field = 'campaignID') {
    let thisCampaign = this.getObject(field, req.params.id);

    this.getMongooseModel().remove(thisCampaign, (err, removed) => {
      if (err) {
        console.log(`Error deleting campaign: ${err}`);
      } else {
        console.log(`Campaign removed: ${removed}`);

        if (field === 'campaignID') {
          res.send(JSON.stringify({ a: `${err ? err : removed}` }));
        }
      }
    });
  }
}

module.exports = new Campaign();
