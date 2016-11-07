'use strict';

var BaseController = require('./base');
var Campaign = require('../models/campaign');
var User = require('../singletons/user-singleton').getInstance();

// var User = require('../singletons/user-singleton').getInstance();

class DashboardController extends BaseController {
  constructor() {
    super('dashboard controller');
  }

  // TODO - Convert to promise to allow us to construct data
  // after all async calls have been made.
  getAllData(req, res) {
    console.log(req.body);

    // Fetch and store all required promises
    var promises = [];
    promises.push(Campaign.getDatabasePromise(req.body.id));
    promises.push(User.getDatabasePromise(req.body.id));

    // Run all promises and process when all return data or error
    Promise.all(promises).then(function() {
      // returned data is in arguments[n]
      console.log(arguments[0][0]);
      console.log(arguments[0][1]);
      res.send(JSON.stringify(arguments[0][0]));
    }, function(err) {
      // error occurred
      console.log('ERROR: ' + err);
    });
  }
}

module.exports = new DashboardController();
