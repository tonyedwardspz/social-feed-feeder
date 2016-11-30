'use strict';

let BaseController = require('./base');
let MongoPost = require('../models/post').getMongooseModel();
let Post = require('../models/post');

class PostController extends BaseController {
  constructor() {
    super('post controller');
  }

  // POST /posts
  create(req, res) {
    console.log('[ROUTE] Posts:POST hit');
    Post.saveNewPost(req, res, req.body);
  }

  // PATCH/PUT /posts/:id
  update(req, res) {
    console.log('[ROUTE] Posts:PUT hit');
    Post.updatePost(req, res, req.body);
  }

  // POST /posts/image
  createImage(req, res) {
    console.log('[Post] image upload hit');
    Post.extractImageAndSave(req, res);
  }

  // PATCH/PUT /posts/:id/image
  updateImage(req, res){
    console.log('[Post] image update hit');
    Post.extractImageAndSave(req, res);
  }

  // DELETE /posts/:id
  delete(req, res) {
    console.log('[ROUTE] Posts:DELETE hit');
    Post.delete(req, res);
  }
}

module.exports = new PostController();
