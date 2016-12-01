var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 50
	}
});

module.exports = mongoose.model('Room', schema);
