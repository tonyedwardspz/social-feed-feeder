'use strict';

var BaseController = require('./base');

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
    res.send(JSON.stringify({ a: 'Response from Buckets POST' }));
  }

  // PATCH/PUT /buckets/:id
  update(req, res) {
    console.log('[ROUTE] Buckets:PUT hit');
    res.send(JSON.stringify({ a: 'Response from Buckets PUT' }));
  }

  // DELETE /buckets/:id
  delete(req, res) {
    console.log('[ROUTE] Buckets:DELETE hit');
    res.send(JSON.stringify({ a: 'Response from Buckets DELETE' }));
  }
}

module.exports = new BucketController();
