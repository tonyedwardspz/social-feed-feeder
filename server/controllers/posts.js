'use strict';

var BaseController = require('./base');

class PostController extends BaseController {
  constructor() {
    super('post controller');
  }

  // GET /posts
  index(req, res) {
    console.log('[Controller] Post:GET hit');
    res.send(JSON.stringify({ a: 'Response from Posts GET' }));
  }

  // GET /posts/:id
  show(req, res) {
    console.log('[ROUTE] Posts:GET:id hit');
    res.send(JSON.stringify({ a: 'Response from Posts GET:id' }));
  }

  // GET /posts/new
  new(req, res) {

  }

  // GET /posts/:id/edit
  edit(req, res) {

  }

  // POST /posts
  create(req, res) {
    console.log('[ROUTE] Posts:POST hit');
    res.send(JSON.stringify({ a: 'Response from Posts POST' }));
  }

  // PATCH/PUT /posts/:id
  update(req, res) {
    console.log('[ROUTE] Posts:PUT hit');
    res.send(JSON.stringify({ a: 'Response from Posts PUT' }));
  }

  // DELETE /posts/:id
  delete(req, res) {
    console.log('[ROUTE] Posts:DELETE hit');
    res.send(JSON.stringify({ a: 'Response from Posts DELETE' }));
  }
}

module.exports = new PostController();
