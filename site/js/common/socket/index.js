
var io = require('socket.io-client');

var socket = module.exports = io.connect(location.origin);

