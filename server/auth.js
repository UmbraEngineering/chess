
var conf     = require('./conf');
var moment   = require('moment');
var jwt      = require('jwt-simple');
var Promise  = require('promise-es6').Promise;

// 
// Create a JWT for the given user data
// 
// @param {user} the user object
// @return string
// 
exports.createToken = function(user) {
	var ttl = conf.auth.tokenTTL;
	var now = moment().valueOf();
	var then = moment().add(ttl[0], ttl[1]).valueOf();

	var data = {
		iss: conf.auth.issuer,
		aud: conf.auth.issuer,
		iat: now,
		nbf: now,
		exp: then,
		sub: user.id,
		jti: user.id + '.' + now
	};

	return jwt.encode(data, process.env.JWT_SECRET);
};

// 
// Decode a JWT
// 
// @param {token} the jwt string
// @return object
// 
exports.validateToken = function(token) {
	return new Promise(function(resolve, reject) {
		// Decode the token
		try {
			var data = jwt.decode(token, process.env.JWT_SECRET);
		} catch (err) {
			return reject(new Error('Authentication token invalid'));
		}

		// Check that we issued it
		if (data.iss !== conf.auth.issuer) {
			return reject(new Error('Authentication token invalid'));
		}

		var now = moment().valueOf();

		// Make sure the token is not expired
		if (data.nbf > now || data.iat > now) {
			return reject(new Error('Authentication token not active'));
		}

		// Make sure the token is not expired
		if (data.exp <= now) {
			return reject(new Error('Authentication token expired'));
		}

		// Find the user in the database
		User.findById(data.sub, function(err, user) {
			if (err) {
				return reject(new HttpError(err));
			}

			// Make sure the user exists
			if (! user) {
				return reject(new Error('Authentication token invalid'));
			}

			resolve(user);
		});
	});
};

// 
// Handle a login attempt
// 
// @param {username} the username to auth with
// @param {password} the password to auth with
// @return promise
// 
exports.login = function(username, password) {
	return User.lookup(username)
		.then(function(_user) { user = _user; })
		.then(function() {
			if (! user) {
				throw new Error('Could not find user');
			}
		})
		.then(function() {
			return user.testPassword(password);
		})
		.then(function(passwordValid) {
			if (passwordValid) {
				session.user = user;
			} else {
				throw new Error('Invalid password');
			}
		});
};
