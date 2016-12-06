'use strict';

let path = require('path');
let users = require('../controllers/users');
let campaigns = require('../controllers/campaigns');
let buckets = require('../controllers/buckets');
let posts = require('../controllers/posts');
let dash = require('../controllers/dashboard');

module.exports = function(app, passport) {

  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated) {
      return next();
    }
    console.log('Not authenticated');
    res.redirect('/');
  }

  //-------------- Dashboard / Data Routes --------------\\

  app.get('/getAllData/:id', ensureAuthenticated, dash.getAllData);

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

  app.put('/user/:id', ensureAuthenticated, users.update);

  app.get('/user/notification', ensureAuthenticated, users.notification);

  //-------------- Campaign Routes --------------\\

  // POST: creates a new campaign
  app.post('/campaigns', ensureAuthenticated, campaigns.create);

  // PUT: update campaign by id
  app.put('/campaigns/:id', ensureAuthenticated, campaigns.update);

  // DELETE: deletes campaign by id
  app.delete('/campaigns/:id', ensureAuthenticated, campaigns.delete);


   //-------------- Bucket Routes --------------\\

   // POST: creates a new buckets
   app.post('/buckets', ensureAuthenticated, buckets.create);

   // PUT: update buckets by id
   app.put('/buckets/:id', ensureAuthenticated, buckets.update);

   // DELETE: deletes buckets by id
   app.delete('/buckets/:id', ensureAuthenticated, buckets.delete);


   //-------------- Post Routes --------------\\

   app.post('/posts', ensureAuthenticated, posts.create);

   // PUT: update posts by id
   app.put('/posts/:id', ensureAuthenticated, posts.update);

   // DELETE: deletes posts by id
   app.delete('/posts/:id', ensureAuthenticated, posts.delete);

   // POST: creates a new post with image
   app.post('/posts/image', ensureAuthenticated, posts.createImage);

   // PUT: update posts with an image by id
   app.put('/posts/:id/image', ensureAuthenticated, posts.updateImage);


   //-------------- Misc Routes --------------\\

   app.get('/manifest.json', function(req, res){
     res.sendFile(path.join(__dirname + '/../../public/manifest.json'));
   });

   app.get('/service-worker.js', (req, res) => {
     console.log('[SW] route hit');
     res.setHeader('content-type', 'text/javascript');
     res.sendFile(path.join(__dirname + '/../../public/service-worker.js'));
   });

    app.get('/favicon-16x16.png', (req, res) => {
      console.log('[ICO] route hit');
      res.sendFile(path.join(__dirname + '/../../public//favicon-16x16.png'));
    });

    app.get('/favicon.ico', (req, res) => {
      console.log('[ICO] route hit');
      res.sendFile(path.join(__dirname + '/../../public//favicon-16x16.png'));
    });

   // Catch all Route to the main dash (MUST BE LAST ROUTE)
   app.get('*', function(req, res){
     console.log('[Route] Catch All: ' + req.path);
     res.sendFile(path.resolve(__dirname, '../../public/index.html'));
   });
};
