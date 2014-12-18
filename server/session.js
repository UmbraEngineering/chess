
var auth     = require('./auth');
var Promise  = require('promise-es6');
var User     = require('./models/user');

// 
// Session class
// 
// @param {connection} a socket.io connection object
// 
var Session = module.exports = function(connection) {
	var self = this;

	this.io = connection;
	this.user = null;

	// When the session is created, start listening for a login request
	this.io.on('auth', this.auth.bind(this));
};

// 
// Handle authentication requests
// 
// @param {credentials} an object containing either a username+password or an auth token
// @param {callback} a socket.io event callback
// @return void
// 
Session.prototype.auth = function(credentials, callback) {
	var authenticate = credentials.token
		? auth.validateToken(credentials.token)
		: auth.login(credentials.name, credentials.password);

	authenticate
		.then(function(user) {
			self.user = user;

			callback({
				error: null,
				user: user.serialize(),
				token: auth.createToken(user)
			});
		})
		.catch(function(err) {
			callback({
				error: err && (err.message || err)
			});
		});
};
