'use strict';

var path = require('path');
var users = require('../controllers/users');
var campaigns = require('../controllers/campaigns');
var buckets = require('../controllers/buckets');
var posts = require('../controllers/posts');
var dash = require('../controllers/dashboard');
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

  // GET: finds all campaigns
  app.get('/campaigns', campaigns.index);

  // POST: creates a new campaign
  app.post('/campaigns', campaigns.create);

  // GET: find campaign by id
  app.get('/campaigns/:id', campaigns.show);

  // PUT: update campaign by id
  app.put('/campaigns/:id', campaigns.update);

  // DELETE: deletes campaign by id
  app.delete('/campaigns/:id', campaigns.delete);


   //-------------- Bucket Routes --------------\\

   // GET: finds all buckets
   app.get('/buckets', buckets.index);

   // POST: creates a new buckets
   app.post('/buckets', buckets.create);

   // GET: find buckets by id
   app.get('/buckets/:id', buckets.show);

   // PUT: update buckets by id
   app.put('/buckets/:id', buckets.update);

   // DELETE: deletes buckets by id
   app.delete('/buckets/:id', buckets.delete);


   //-------------- Post Routes --------------\\

   // GET: finds all posts
   app.get('/posts', posts.index);

   // POST: creates a new posts
   app.post('/posts', posts.create);

   // GET: find posts by id
   app.get('/posts/:id', posts.show);

   // PUT: update posts by id
   app.put('/posts/:id', posts.update);

   // DELETE: deletes posts by id
   app.delete('/posts/:id', posts.delete);


   //-------------- Misc Routes --------------\\

   // Serve manifest file
   app.get('/manifest.json', function(req, res){
     res.sendFile(path.join(__dirname + '/public/manifest.json'));
   });

   // Catch all Route to the main dash (MUST BE LAST ROUTE)
   app.get('*', function(req, res){
     console.log('[Route] Catch All: ' + req.path);
     console.log('[SERVER.GET] Catch all hit');
     res.sendFile(path.resolve(__dirname, '../../public/index.html'));
   });
};
