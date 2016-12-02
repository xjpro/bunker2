var loginController = module.exports;

var User = require('../models/User');
var userService = require('../services/userService');

loginController.login = (socket, data) => {
	var token = data.token;
	if (!token) {
		// todo reject login!
	}
	return userService.getUserByToken(token)
		.then(user => {
			req.session.authenticated = true;
			req.session.user = user;
			return User.findByIdAndUpdate(user._id, {sockets: [socket.id]});
		})
		.then(() => {
			socket.emit('loggedIn', {});
		});
};