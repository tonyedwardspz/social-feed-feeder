'use strict';

var BaseController = require('./base');

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
