var express = require('express');
var path    = require('path');

var app = express();
app.use('/public', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/public/scripts'));
app.use('/styles', express.static(__dirname + '/styles'));

app.get('/manifest.json', function(req, res){
  res.sendFile(path.join(__dirname + '/public/manifest.json'));
});

app.get('/user/auth', function(req, res){
  console.log('[ROUTE] User Auth hit');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ a: 'This is the JSON response' }));
});

// TODO: Connect to DB




// Campaigns API Routes

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({'error': message});
}

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
