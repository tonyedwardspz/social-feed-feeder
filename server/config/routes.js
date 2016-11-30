'use strict';

let path = require('path');
let users = require('../controllers/users');
let campaigns = require('../controllers/campaigns');
let buckets = require('../controllers/buckets');
let posts = require('../controllers/posts');
let dash = require('../controllers/dashboard');
// var cookieParser = require('cookie-parser');

module.exports = function(app, passport) {

  function ensureAuthenticated(req, res, next) {
    // Test to see if user is authenticated

    // TODO - Actually check that this is the user. Struggling to hook up
    // session's for the user
    return next();

    if (req.isAuthenticated()) {
      return next();
    }

    console.log('Not authenticated');
    // redirect to login
    res.redirect('/');
  }

  //-------------- Dashboard / Data Routes --------------\\

  app.post('/getAllData', ensureAuthenticated, dash.getAllData);

  //-------------- User / Authentication Routes --------------\\

  app.get('/user/auth', passport.authenticate('bufferapp'), users.auth);

  app.get('/user/auth/buffer/callback',
    passport.authenticate('bufferapp', {
      failWithError: true
    }),
    function(req, res) {
      users.authSuccess(req, res);
    },
    function(err, req, res, next) {
      users.authFailure(err, req, res, next);
    }
  );

  app.put('/users/:id', users.update);

  //-------------- Campaign Routes --------------\\

  // POST: creates a new campaign
  app.post('/campaigns', campaigns.create);

  // PUT: update campaign by id
  app.put('/campaigns/:id', campaigns.update);

  // DELETE: deletes campaign by id
  app.delete('/campaigns/:id', campaigns.delete);


   //-------------- Bucket Routes --------------\\

   // POST: creates a new buckets
   app.post('/buckets', buckets.create);

   // PUT: update buckets by id
   app.put('/buckets/:id', buckets.update);

   // DELETE: deletes buckets by id
   app.delete('/buckets/:id', buckets.delete);


   //-------------- Post Routes --------------\\

   // PUT: update posts by id
   app.put('/posts/:id', posts.update);

   // DELETE: deletes posts by id
   app.delete('/posts/:id', posts.delete);

   // POST: creates a new post with image
   app.post('/posts/image', posts.createImage);

   // PUT: update posts with an image by id
   app.put('/posts/:id/image', posts.updateImage);


   //-------------- Misc Routes --------------\\

   // Serve manifest file
   app.get('/manifest.json', function(req, res){
     res.sendFile(path.join(__dirname + '/public/manifest.json'));
   });

   // Catch all Route to the main dash (MUST BE LAST ROUTE)
   app.get('*', function(req, res){
     console.log('[Route] Catch All: ' + req.path);
     res.sendFile(path.resolve(__dirname, '../../public/index.html'));
   });
};
