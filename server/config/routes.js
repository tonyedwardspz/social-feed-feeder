'use strict';

var path = require('path');

module.exports = function(app, passport) {

  var users = require('../controllers/users');
  var campaigns = require('../controllers/campaigns');
  var buckets = require('../controllers/buckets');
  var posts = require('../controllers/posts');

  //-------------- User / Authentication Routes --------------\\

  app.get('/user/auth', passport.authenticate('bufferapp'), function() {
    console.log('auth hit');
  });

  app.get('/user/auth/buffer/callback', passport.authenticate('bufferapp', { failWithError: true }),
    function(req, res){
      console.log('AUTH SUCCESS');
      res.cookie('user_auth', 'true');
      // res.sendFile(path.join(__dirname + '/public/index.html'));
      res.writeHead(302, {'Location': '/'});
      res.end();
    },
    function(err, req, res, next) {
      console.log('Auth failure: ' + err);
      res.send(err);
    }
  );

  //-------------- Campaign Routes --------------\\

  // GET: finds all campaigns
  app.get('/campaigns', function(req, res) {
    console.log('[ROUTE] Campaign:GET hit');
    res.send(JSON.stringify({ a: 'Response from Campaigns GET' }));
  });

  // POST: creates a new campaign
  app.post('campaigns', function(req, res) {
    console.log('[ROUTE] Campaign:POST hit');
    res.send(JSON.stringify({ a: 'Response from Campaigns POST' }));
  });

  // GET: find campaign by id
   app.get('/campaigns/:id', function(req, res) {
     console.log('[ROUTE] Campaign:GET:id hit');
     res.send(JSON.stringify({ a: 'Response from Campaigns GET:id' }));
   });

  // PUT: update campaign by id
   app.put('/campaigns/:id', function(req, res) {
     console.log('[ROUTE] Campaign:PUT hit');
     res.send(JSON.stringify({ a: 'Response from Campaigns PUT' }));
   });

  // DELETE: deletes campaign by id
   app.delete('campaigns/:id', function(req, res) {
     console.log('[ROUTE] Campaign:DELETE hit');
     res.send(JSON.stringify({ a: 'Response from Campaigns DELETE' }));
   });


   //-------------- Bucket Routes --------------\\



   //-------------- Post Routes --------------\\


   //-------------- Misc Routes --------------\\
   // Catch all Route to the main dash
   app.get('/', function(req, res){
     console.log('[SERVER.GET] Catch all hit');
     res.sendFile(path.join(__dirname + '/public/index.html'));
   });

   // Serve manifest file
   app.get('/manifest.json', function(req, res){
     res.sendFile(path.join(__dirname + '/public/manifest.json'));
   });
};
