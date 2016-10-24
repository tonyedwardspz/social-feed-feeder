var express = require('express');
var path    = require('path');

var server = express();
server.use('/public', express.static(__dirname + '/public'));

server.get('/*', function(req, res){
  console.log('[SERVER.GET] Catch all hit');
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

var port = process.env.PORT || 8080;
server.listen(port || 8080, function() {
  console.log('server listening on port ' + port);
});
