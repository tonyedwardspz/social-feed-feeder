'use strict';

let BaseController = require('./base');
let Bucket = require('../models/bucket');
let MongoBucket = Bucket.getMongooseModel();
let MongoPost = require('../models/post').getMongooseModel();
let Post = require('../models/post');

class BucketController extends BaseController {
  constructor() {
    super('bucket controller');
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

    MongoBucket.update({ bucketID: req.params.id }, {$set: {
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
    }}, (err, updated) => {
      if (err) {
        console.log(`Error deleting campaign: ${err}`);
      } else {
        console.log(`Campaign removed: ${updated}`);
        res.send(JSON.stringify({ a: 'Bucket Updated Succesfully' }));
      }
    });
  }

  // DELETE /buckets/:id
  delete(req, res) {
    console.log('[ROUTE] Buckets:DELETE hit');

    Bucket.delete(req, res);
    Post.delete(req, res, 'bucketID');
  }
}

module.exports = new BucketController();
