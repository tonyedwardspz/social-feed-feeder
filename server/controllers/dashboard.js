'use strict';

var BaseController = require('./base');
var Campaign = require('../models/campaign');
var CampaignMM = Campaign.getMongooseModel();
// var User = require('../singletons/user-singleton').getInstance();

class DashboardController extends BaseController {
  constructor() {
    super('dashboard controller');
  }

  // TODO - Convert to promise to allow us to construct data
  // after all async calls have been made.
  getAllData(req, res) {
    var campaigns = 'ares bandit';
    console.log(req.body);
    // console.log('GET USER ID: ' + User.getID());
    CampaignMM.find({ 'userID': req.body.id }, function(err, data) {
      if (err) {
        console.log('ERROR' + err);
      }

      console.log(data);
      res.send(JSON.stringify({ 'campaigns' : data }));
    });


  }

}

module.exports = new DashboardController();
