'use strict';

var cookieParser = require('cookie-parser');
var express = require('express');

module.exports = function(app, passport){
  app.use('/public', express.static(__dirname + '/public'));
  app.use('/scripts', express.static(__dirname + '/public/scripts'));
  app.use('/styles', express.static(__dirname + '/styles'));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
};
