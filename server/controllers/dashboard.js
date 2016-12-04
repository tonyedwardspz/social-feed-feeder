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
    console.log('[Dashboard] Get all data for user: ', req.params.id);

    var hmac = global.pushPadProject.signatureFor(req.params.id);
    console.log(hmac);

    console.log(global.pushPadProject.pathFor(req.params.id));

    // Fetch and store all required promises
    let promises = [];
    promises.push(Campaign.getDatabasePromise(req.params.id));
    promises.push(User.getDatabasePromise(req.params.id));
    promises.push(Bucket.getDatabasePromise(req.params.id));
    promises.push(Post.getDatabasePromise(req.params.id));

    // Run all promises and process when all return data or error
    Promise.all(promises).then(function() {
      console.log('[Dashboard] All database promises resolved');
      // returned data is in arguments[n]
      console.log(arguments[0]);

      res.send(JSON.stringify(arguments[0]));
    }, function(err) {
      console.log('ERROR: ' + err);
    });
  }
}

module.exports = new DashboardController();
