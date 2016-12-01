var loginController = module.exports;

var userService = require('../services/userService');

loginController.login = (req, res) => {
	var token = req.body.token;
	if (!token) {
		return res.badRequest({
			errors: [{code: '400', title: 'Token was not present'}]
		});
	}

	return userService.getUserByToken(token)
		.then(user => {
			req.session.authenticated = true;
			req.session.user = user;
			res.ok({redirectTo: '/'});
		})
		.catch(res.serverError);
};