var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Thanks for being awesome!');
});
server.listen(process.env.PORT || 8080);
