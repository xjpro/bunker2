var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room'
	},
	role: {
		type: String,
		enum: ['member', 'moderator', 'administrator'],
		default: 'member'
	},
});

module.exports = mongoose.model('RoomMember', schema);
