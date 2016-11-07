'use strict';

var BaseController = require('./base');
var Campaign = require('../models/campaign');
var User = require('../singletons/user-singleton').getInstance();
var Bucket = require('../models/bucket');
let Post = require('../models/post');

class DashboardController extends BaseController {
  constructor() {
    super('dashboard controller');
  }

  // TODO - Convert to promise to allow us to construct data
  // after all async calls have been made.
  getAllData(req, res) {
    console.log('[Dashboard] Get all data');
    console.log(req.body);

    // Fetch and store all required promises
    var promises = [];
    promises.push(Campaign.getDatabasePromise(req.body.id));
    promises.push(User.getDatabasePromise(req.body.id));
    promises.push(Bucket.getDatabasePromise(req.body.id));
    promises.push(Post.getDatabasePromise(req.body.id));

    // Run all promises and process when all return data or error
    Promise.all(promises).then(function() {
      console.log('All DATA PROMISES RESOLVED');
      // returned data is in arguments[n]
      for (let i = 0; i < arguments[0].length; i++) {
        console.log(arguments[0][i]);
      }

      res.send(JSON.stringify(arguments[0][0]));
    }, function(err) {
      // error occurred
      console.log('ERROR: ' + err);
    });
  }
}

module.exports = new DashboardController();
