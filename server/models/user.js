
var crypto    = require('crypto');
var mongoose  = require('../mongoose');
var Promise   = require('promise-es6').Promise;

// 
// User Schema
// 
var UserSchema = mongoose.Schema({
	name: { type: String, index: {unique: true} },
	email: { type: String, index: {unique: true} },
	emailConfirmed: { type: Boolean, default: false },
	password: {
		salt: { type: Buffer },
		hash: { type: Buffer },
		iterations: { type: Number }
	},
	stats: {
		wins: { type: Number, default: 0 },
		losses: { type: Number, default: 0 },
		draws: { type: Number, default: 0 },
		longestStreak: { type: Number, default: 0 },
		currentStreak: { type: Number, default: 0 },
		rating: { type: Number, default: 1200 }
	}
});

// --------------------------------------------------------

// 
// Create a new user
// 
// @param {name} the new user's username
// @param {email} the new user's email
// @param {password} the new user's password
// @return promise
// 
UserSchema.statics.register = function(name, email, password) {
	return new Promise(function(resolve, reject) {
		var data = {
			name: name,
			email: email
		};
		User.create(data, function(err, user) {
			if (err) {
				return reject(err);
			}

			user.setPassword(password)
				.then(
					function() {
						// 
						// TODO
						//  - Send confirmation email
						// 
						resolve(user);
					},
					reject
				);
		});
	});
};

// 
// Vaidate a plaintext password as being "secure" enough. If invalid,
// returns a message string. Otherwise, returns undefined.
// 
// @param {password} the password
// @return string
// 
UserSchema.statics.validatePassword = function(password) {
	if (password.length < 8) {
		return 'Password must be at least 8 characters long';
	}
};

// 
// Hashes the given password. If no salt/iterations values are given, new ones
// will be generated
// 
// @param {password} the plaintext password to be hashed
// @param {salt} optional, the salt to use in hashing
// @param {iterations} optional, the number of hashing iterations
// @return object
// 
UserSchema.statics.hashPassword = function(password, salt, iterations) {
	iterations = iterations || 10000;

	var salt;

	return getSalt()
		.then(function(_salt) { salt = _salt })
		.then(function() {
			return doHash(password, salt, iterations);
		})
		.then(function(hash) {
			return {
				hash: hash,
				salt: salt,
				iterations: iterations
			};
		});

	// 
	// If a salt value was given, return it, otherwise generate a new,
	// random, 64-byte salt
	// 
	function getSalt() {
		if (salt) {
			return Promise.resolve(salt);
		}

		return new Promise(function(resolve, reject) {
			crypto.randomBytes(64, function(err, bytes) {
				if (err) {
					return reject(err);
				}

				resolve(bytes);
			});
		});
	}

	// 
	// Actually hashes the password string using the given/generated salt and
	// iterations values
	// 
	function doHash(password, salt, iterations) {
		return new Promise(function(resolve, reject) {
			crypto.pbkdf2(password, salt, iterations, 64, function(err, hash) {
				if (err) {
					return reject(err);
				}

				resolve(hash);
			});
		});
	}
};

// 
// Lookup a user by username
// 
// @param {username} the user's username
// @return promise
// 
UserSchema.statics.lookup = function(username) {
	return new Promise(function(resolve, reject) {
		User.findOne({ name: username }, function(err, user) {
			if (err) {
				return reject(err);
			}

			resolve(user);
		});
	});
};

// --------------------------------------------------------

// 
// Updates the user's password
// 
// @param {password} the new password
// @return promise
// 
UserSchema.methods.setPassword = function(password) {
	var user = this;

	return UserSchema.statics.hashPassword(password)
		.then(function(password) {
			user.password.hash = pass.hash;
			user.password.salt = pass.salt;
			user.password.iterations = pass.iterations;
		});
};

// 
// Test if the given password matches the one stored for this user
// 
// @param {password} the password to test
// @return promise
// 
UserSchema.methods.testPassword = function(password) {
	var user = this;

	return UserSchema.statics.hashPassword(password, user.password.salt, user.password.iterations)
		.then(function(hashed) {
			return (hashed.hash.toString('hex') === user.password.hash.toString('hex'));
		});
};

// 
// Serialize the user object for sending to the client
// 
// @return object
// 
UserSchema.methods.serialize = function() {
	var obj = this.toObject();

	delete obj.password;
	delete obj.emailConfirmed;

	return obj;
};

// --------------------------------------------------------

var User = module.exports = mongoose.model('User', UserSchema);
