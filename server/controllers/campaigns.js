'use strict';

var BaseController = require('./base');
var mongoose = require ('mongoose');


var CampaignModel = new mongoose.Schema({
  name: String,
  description: String,
  expiry: Date,
  dailyPosts: Number,
  userID: String
});

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
    console.log(req.body);
    var MongoCampaign = mongoose.model('campaign', CampaignModel);
    let campaign = new MongoCampaign({
      name: req.body.name,
      description: req.body.description,
      expiry: req.body.expiry,
      dailyPosts: req.body.dailyPosts,
      userID: req.body.userID
    });

    // TODP - Change to success / failure
    campaign.save(function(err) {
        if (err) {console.log(err);}
        // return done(err, user);
    });

    console.log('[ROUTE] Campaign:POST hit');
    res.send(JSON.stringify({ a: 'Response from Campaigns POST' }));
  }

  // PATCH/PUT /campaigns/:id
  update(req, res) {
    console.log('[ROUTE] Campaign:PUT hit');
    res.send(JSON.stringify({ a: 'Response from Campaigns PUT' }));
  }

  // DELETE /campaigns/:id
  delete(req, res) {
    console.log('[ROUTE] Campaign:DELETE hit');
    res.send(JSON.stringify({ a: 'Response from Campaigns DELETE' }));
  }
}

module.exports = new CampaignController();
