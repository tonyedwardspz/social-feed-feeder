'use strict';

var express = require('express');
var path    = require('path');
var passport = require('passport');
var cookieParser = require('cookie-parser');

// Load environmental variables (only applied to dev environment)
require('dotenv').config();

// Load the database connection
require('./server/database/database');

// Configure passport authentication
require('./server/config/passport')(passport);


var app = express();
app.use('/public', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/styles', express.static(__dirname + '/styles'));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

app.get('/manifest.json', function(req, res){
  res.sendFile(path.join(__dirname + '/public/manifest.json'));
});

// API Routes
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








// Catch all Route to the main dash
app.get('/', function(req, res){
  console.log('[SERVER.GET] Catch all hit');
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('server listening on port ' + port);
});
