var loginController = module.exports;

var User = require('../models/User');
var userService = require('../services/userService');
var socketService = require('../services/socketService');

loginController.login = (socket, data) => {
	var token = data.token;
	if (!token) {
		// todo reject login!
	}
	return userService.getUserByToken(token)
		.then(user => {
			socket.user = user;
			socket.emit('loggedIn');
		});
};