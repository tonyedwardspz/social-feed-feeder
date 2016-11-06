'use strict';

var cookieParser = require('cookie-parser');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(app, passport, root){

  // set static paths
  app.use('/public', express.static(root + '/public'));
  app.use('/scripts', express.static(root + '/public/scripts'));
  app.use('/styles', express.static(root + '/public/styles'));

  // Configure express to you passport for auth / middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // MMMMM..... cookies
  app.use(cookieParser());

  // Set various body parsers
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

};
