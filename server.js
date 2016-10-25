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

// Catch all Route to the main dash
app.get('/', function(req, res){
  console.log('[SERVER.GET] Catch all hit');
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log('server listening on port ' + port);
});
