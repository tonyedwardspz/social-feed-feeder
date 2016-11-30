'use strict';

let BaseController = require('./base');
let MongoPost = require('../models/post').getMongooseModel();
let Post = require('../models/post');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var util = require('util');

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

    let form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(_root , `/public/images/uploads`);

    form.on('file', function(field, file) {
      fs.rename(file.path, path.join(form.uploadDir, file.name.split(' ').join('_')));
    });

    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });

    // parse the incoming request containing the form data
    form.parse(req, function(err, fields, files) {
      Post.saveNewPost(req, res, JSON.parse(fields.post));
    });
  }

  // PATCH/PUT /posts/:id/image
  updateImage(req, res){
    console.log('[Post] image update hit');

    let form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = path.join(_root , `/public/images/uploads`);

    // save the attached image to '/public/images/uploads'
    form.on('file', function(field, file) {
      fs.rename(file.path, path.join(form.uploadDir, file.name.split(' ').join('_')));
    });

    form.on('error', function(err) {
      console.log('An error has occured: \n' + err);
    });

    // parse the incoming request containing the form data and save
    form.parse(req, function(err, fields, files) {
      Post.updatePost(req, res, JSON.parse(fields.post));
    });
  }

  // DELETE /posts/:id
  delete(req, res) {
    console.log('[ROUTE] Posts:DELETE hit');

    MongoPost.remove({ postID: req.params.id }, (err, removed) => {
      if (err) {
        console.log(`Error deleting post ${err}`);
      } else {
        console.log(`Post removed: ${removed}`);
      }
      res.send(JSON.stringify({ a: `${err ? err : removed}` }));
    });
  }
}

module.exports = new PostController();
