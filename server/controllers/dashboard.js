'use strict';

let BaseController = require('./base');
let Campaign = require('../models/campaign');
let User = require('../singletons/user-singleton').getInstance();
let Bucket = require('../models/bucket');
let Post = require('../models/post');

class DashboardController extends BaseController {
  constructor() {
    super('dashboard controller');
  }

  getAllData(req, res) {
    console.log('[Dashboard] Get all data');

    // Fetch and store all required promises
    let promises = [];
    promises.push(Campaign.getDatabasePromise(req.body.id));
    promises.push(User.getDatabasePromise(req.body.id));
    promises.push(Bucket.getDatabasePromise(req.body.id));
    promises.push(Post.getDatabasePromise(req.body.id));

    // Run all promises and process when all return data or error
    Promise.all(promises).then(function() {
      console.log('[Dashboard] All database promises resolved');
      // returned data is in arguments[n

      res.send(JSON.stringify(arguments[0]));
    }, function(err) {
      console.log('ERROR: ' + err);
    });
  }
}

module.exports = new DashboardController();
