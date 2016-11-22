'use strict';

var BaseController = require('./base');
var Bucket = require('../models/bucket');
var MongoBucket = Bucket.getMongooseModel();
var MongoPost = require('../models/post').getMongooseModel();

class BucketController extends BaseController {
  constructor() {
    super('bucket controller');
  }

  // GET /buckets
  index(req, res) {
    console.log('[ROUTE] Bucket:GET hit');
    res.send(JSON.stringify({ a: 'Response from Buckets GET' }));
  }

  // GET /buckets/:id
  show(req, res) {
    console.log('[ROUTE] Buckets:GET:id hit');
    res.send(JSON.stringify({ a: 'Response from Buckets GET:id' }));
  }

  // GET /buckets/new
  new(req, res) {

  }

  // GET /buckets/:id/edit
  edit(req, res) {

  }

  // POST /buckets
  create(req, res) {
    console.log('[ROUTE] Buckets:POST hit');

    let bucket = new MongoBucket({
      bucketID: req.body.bucketID,
      campaignID: req.body.campaignID,
      userID: req.body.userID,
      name: req.body.name,
      description: req.body.description,
      expiry: req.body.expiry,
      priority: req.body.priority,
      maxPerDay: req.body.maxPerDay,
      repeat: Bucket.doesItRepeat(req.body.repeat),
      frequency: req.body.frequency
    });

    var result = 'sucess';
    bucket.save(err => {
      if (err) {
        console.log(err);
        result = `error saving bucket : ${err}`;
      }
    });

    res.send(JSON.stringify({ a: result }));
  }

  // PATCH/PUT /buckets/:id
  update(req, res) {
    console.log('[ROUTE] Buckets:PUT hit');
    res.send(JSON.stringify({ a: 'Response from Buckets PUT' }));
  }

  // DELETE /buckets/:id
  delete(req, res) {
    console.log('[ROUTE] Buckets:DELETE hit');

    MongoBucket.remove({ bucketID: req.params.id }, (err, removed) => {
      if (err) {
        console.log(`Error deleting bucket ${err}`);
      } else {
        console.log(`Buckets removed: ${removed}`);
      }
    });

    MongoPost.remove({ bucketID: req.params.id }, (err, removed) => {
      if (err) {
        console.log(`Error deleting posts from buckets ${err}`);
      } else {
        console.log(`Posts removed: ${removed}`);
      }
    });

    res.send(JSON.stringify({ a: 'Response from Buckets DELETE' }));
  }
}

module.exports = new BucketController();
