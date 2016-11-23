'use strict';

var cookieParser = require('cookie-parser');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
// var MongoStore = require('connect-mongo')(session);

module.exports = function(app, passport, root){

  // set static paths
  app.use('/public', express.static(root + '/public'));
  app.use('/scripts', express.static(root + '/public/scripts'));
  app.use('/styles', express.static(root + '/public/styles'));
  app.use('/images', express.static(root + '/public/images'));

  // Set various body parsers
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // MMMMM..... cookies
  app.use(cookieParser());

  // Configure express to you passport for auth / middleware
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

};
