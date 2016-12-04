'use strict';

let cookieParser = require('cookie-parser');
let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
var pushpad = require('pushpad');

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

  // Configure express to you passport for auth / middleware
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));

  // make the root directory accessable
  global._root = root;

  // make the pushpad object accessable
  global.pushPadProject = new pushpad.Pushpad({
    authToken: process.env.PUSHPAD_AUTH_TOKEN,
    projectId: process.env.PUSHPAD_PROJECT_ID
  });

  app.use(passport.initialize());
  app.use(passport.session());

};
