'use strict';

let BaseController = require('./base');
let MongoCampaign = require('../models/campaign').getMongooseModel();
let MongoBucket = require('../models/bucket').getMongooseModel();
let MongoPost = require('../models/post').getMongooseModel();

class CampaignController extends BaseController {
  constructor() {
    super('campaign controller');
  }

  // GET /campaigns
  index(req, res) {
    console.log('[Controller] Campaign:GET hit');
    res.send(JSON.stringify({ a: 'Response from Campaigns GET' }));
  }

  // GET /campaigns/:id
  show(req, res) {
    console.log('[ROUTE] Campaign:GET:id hit');
    res.send(JSON.stringify({ a: 'Response from Campaigns GET:id' }));
  }

  // GET /campaigns/new
  new(req, res) {

  }

  // GET /campaigns/:id/edit
  edit(req, res) {

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

    // TODP - Change to success / failure
    campaign.save(function(err) {
        if (err) {
          console.log(err);
        }
        // return done(err, user);
    });

    res.send(JSON.stringify({ a: 'Response from Campaigns POST' }));
  }

  // PATCH/PUT /campaigns/:id
  update(req, res) {
    console.log('[ROUTE] Campaign:PUT hit');

    MongoCampaign.update({ campaignID: req.params.id }, {$set: {
      name: req.body.name,
      description: req.body.description,
      expiry: req.body.expiry,
      dailyPosts: req.body.dailyPosts
    }}, (err, updated) => {
      if (err) {
        console.log(`Error deleting campaign: ${err}`);
      } else {
        console.log(`Campaign removed: ${updated}`);
        res.send(JSON.stringify({ a: 'Campaign Updated Succesfully' }));
      }
    });
  }

  // DELETE /campaigns/:id
  delete(req, res) {
    console.log('[ROUTE] Campaign:DELETE hit');

    MongoCampaign.remove({ campaignID: req.params.id }, (err, removed) => {
      if (err) {
        console.log(`Error deleting campaign: ${err}`);
      } else {
        console.log(`Campaign removed: ${removed}`);
      }
    });

    MongoBucket.remove({ campaignID: req.params.id }, (err, removed) => {
      if (err) {
        console.log(`Error deleting buckets for campaign: ${err}`);
      } else {
        console.log(`Buckets removed: ${removed}`);
      }
    });

    MongoPost.remove({ campaignID: req.params.id }, (err, removed) => {
      if (err) {
        console.log(`Error deleting posts from buckets for campaign: ${err}`);
      } else {
        console.log(`Posts removed: ${removed}`);
      }
    });

    // res.send(JSON.stringify({ a: 'Response from Campaigns DELETE' }));
  }
}

module.exports = new CampaignController();
