'use strict';

var cookieParser = require('cookie-parser');
var express = require('express');

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

};
