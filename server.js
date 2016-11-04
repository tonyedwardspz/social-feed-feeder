'use strict';

var express = require('express');
var passport = require('passport');

// Load environmental variables (only applied to dev environment)
require('dotenv').config();

// Load the database connection
require('./server/database/database');

// Configure passport authentication
require('./server/config/passport')(passport);

// Configure the express app
var app = express();
require('./server/config/express')(app, passport);

// Load route configuration
require('./server/config/routes')(app, passport);

// Start the app server
let port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('server listening on port ' + port);
});
