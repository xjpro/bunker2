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
	}
});

module.exports = mongoose.model('User', userSchema);
