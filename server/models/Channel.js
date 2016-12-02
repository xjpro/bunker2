var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	rooms: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room'
	}],
	name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 50
	}
});

module.exports = mongoose.model('Channel', schema);
