var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	nick: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 20
	},
	email: {
		type: String
	},
	sockets: Array,
	currentChannel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Channel'
	}
});

module.exports = mongoose.model('User', userSchema);
