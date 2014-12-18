
var User      = require('./user');
var mongoose  = require('../mongoose');

var ObjectId = mongoose.types.ObjectId;

// Regex for matching chess grid locations (eg. "e4")
var coord = /^[a-h][1-8]$/;

// 
// Game Schema
// 
var GameSchema = mongoose.Schema({
	playerA: { type: ObjectId, ref: 'User' },
	playerB: { type: ObjectId, ref: 'User' },
	started: { type: Date, default: Date.now },
	moves: [{
		from: { type: String, match: coord },
		to: { type: String, match: coord }
		when: { type: Date, default: Date.now }
	}],
	pieces: [{
		piece: { type: String, enum: ['P', 'R', 'N', 'B', 'K', 'Q'] },
		position: { type: String, match: coord }
	}],
	turn: { type: String, enum: ['A', 'B'] }
});

// --------------------------------------------------------

var Game = module.exports = mongoose.model('Game', GameSchema);
