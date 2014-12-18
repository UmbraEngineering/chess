
var static   = require('node-static');
var conf     = require('./conf');
var app      = require('http').createServer(handler);
var io       = require('socket.io')(app);
var Session  = require('./session');

var server = new static.Server('./site', {
	indexFile: 'index.html'
});

function handler(req, res) {
	req.addListener('end', function() {
		server.serve(req, res);
	}).resume();
}

app.listen(conf.http.port, '0.0.0.0', function() {
	console.log('Server listening at 0.0.0.0:' + conf.http.port);
});

io.on('connection', function(connection) {
	// 
});
