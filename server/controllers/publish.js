'use strict';

let BaseController = require('./base');
let bufferAPI = require('buffer-node');
let buffer = bufferAPI('{{}}');

class PublishController extends BaseController {
  constructor() {
    super('publish controller');
  }

  publishPosts(req, res) {
    console.log('Publish Posts Hit');

    console.log(req.body);
  }


}

module.exports = new PublishController();
