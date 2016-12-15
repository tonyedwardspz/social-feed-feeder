'use strict';

let cookieParser = require('cookie-parser');
let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let compress = require('compression');

/**
* Returns HTML for the user setting page
* @param {USERt} user The user object to populate the view with
* @return {String} The HTML string to display
*/
module.exports = function(app, passport, root){

  // set static paths
  app.use('/public', express.static(root + '/public'));
  app.use('/scripts', express.static(root + '/public/scripts'));
  app.use('/styles', express.static(root + '/public/styles'));
  app.use('/images', express.static(root + '/public/images'));

  // Set various body parsers
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({limit: '2mb'}));

  // MMMMM..... cookies
  app.use(cookieParser());

  // Enable gzip
  app.use(compress());

  // Configure express to you passport for auth / middleware
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));

  // make the root directory accessable
  global._root = root;

  app.use(passport.initialize());
  app.use(passport.session());

};
