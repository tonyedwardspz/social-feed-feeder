'use strict';

let BaseController = require('./base');
let MongoCampaign = require('../models/campaign').getMongooseModel();
let Bucket = require('../models/bucket');
let Post = require('../models/post');
let Campaign = require('../models/campaign');

class CampaignController extends BaseController {
  constructor() {
    super('campaign controller');
  }

  // POST /campaigns
  create(req, res) {
    console.log('[ROUTE] Campaign:POST hit');

    let campaign = new MongoCampaign({
      campaignID: req.body.campaignID,
      name: req.body.name,
      description: req.body.description,
      expiry: req.body.expiry,
      dailyPosts: req.body.dailyPosts,
      userID: req.body.userID
    });

    // TODO: Change to success / failure chaining
    let result = 'sucess';
    campaign.save(function(err) {
      if (err) {
        console.log(err);
        result = `error saving campaign : ${err}`;
      }
    });

    res.send(JSON.stringify({ a: result }));
  }

  // PATCH/PUT /campaigns/:id
  update(req, res) {
    console.log('[ROUTE] Campaign:PUT hit');

    MongoCampaign.update({ campaignID: req.params.id }, { $set: {
      name: req.body.name,
      description: req.body.description,
      expiry: req.body.expiry,
      dailyPosts: req.body.dailyPosts
    }}, (err, updated) => {
      if (err) {
        console.log(`Error updating campaign: ${err}`);
      } else {
        console.log(`Campaign updated: ${updated}`);
        res.send(JSON.stringify({ a: 'Campaign Updated Succesfully' }));
      }
    });
  }

  // DELETE /campaigns/:id
  delete(req, res) {
    console.log('[ROUTE] Campaign:DELETE hit');
    Campaign.delete(req, res);
    Bucket.delete(req, res, 'campaignID');
    Post.delete(req, res, 'campaignID');
  }
}

module.exports = new CampaignController();
