var duplexEmitter = require('duplex-emitter');
var shoe = require('shoe');

var sock = shoe(function(stream) {
  var client = duplexEmitter(stream);

  client.on('ping', function(ts) {
    console.log('got client ping', ts);
    client.emit('pong', ts);
  });
});

var ecstatic = require('ecstatic')(__dirname + '/browser');
var server = require('http').createServer(ecstatic);

server.listen(8080, function() {
  console.log('Server listening');
});

sock.install(server, '/websocket');

