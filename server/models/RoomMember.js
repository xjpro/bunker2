var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room',
		index: true
	}
});

module.exports = mongoose.model('RoomMember', schema);
