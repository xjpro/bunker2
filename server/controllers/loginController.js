var loginController = module.exports;
var userService = require('../services/userService');

loginController.login = (socket, data) => {
	var token = data.token;
	if (!token) {
		// todo reject login!
	}
	return userService.getUserByToken(token)
		.then(user => {
			socket.user = user;
			socket.emit(user ? 'user.loggedIn' : 'user.loggedOut');
		});
};