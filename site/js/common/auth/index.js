
var store    = require('store');
var socket   = require('socket');
var Promise  = require('promise-es6').Promise;

var TOKEN_KEY = 'authtoken';

exports.user = null;

// 
// Attempt to log in
// 
// @param {username} the username to use
// @param {password} the password to use
// @return promise
// 
exports.login = function(username, password) {
	return new Promise(function(resolve, reject) {
		var credentials = {
			name: username,
			password: password
		};
		socket.emit('auth', credentials, function(err, user) {
			if (err) {
				return reject(err);
			}

			resolve(exports.user = user);
		});
	});
};

// 
// Check if there is a token in localstorage and attempt to authenticate it
// if one is found
// 
// @return promise
// 
exports.checkForToken = function() {
	return new Promise(function(resolve, reject) {
		var token = store.get(TOKEN_KEY);

		if (! token) {
			return resolve();
		}

		socket.emit('auth', {token: token}, function(err, user) {
			if (err) {
				store.remove(TOKEN_KEY);
				return resolve();
			}

			exports.user = user;
			resolve();
		});
	});
};
