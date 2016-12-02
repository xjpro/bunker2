var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	channel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Channel'
	}
});

module.exports = mongoose.model('ChannelMember', schema);
