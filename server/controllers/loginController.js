var loginController = module.exports;

var request = require('request-promise');
var moment = require('moment');

var config = require('../config');
var User = require('../models/User');

loginController.login = (req, res) => {
	var token = req.body.token;
	if (!token) {
		return res.badRequest({
			errors: [{code: '400', title: 'Token was not present'}]
		});
	}

	// Verify token with Google
	return request({
		uri: `https://www.googleapis.com/oauth2/v3/tokeninfo`,
		qs: {id_token: token},
		json: true
	})
		.then(auth => {
			// check that: source is valid, the cert belogs to this app, and the token is not expired
			if (auth.iss !== 'accounts.google.com' ||
				auth.aud !== config.googleAuth.clientId ||
				moment.unix(auth.exp).isBefore()) {
				return res.unauthorized();
			}

			return User.findOne({email: auth.email})
				.then(user => {
					return user || User.create({nick: auth.name, email: auth.email});
				});
		})
		.then(user => {
			req.session.authenticated = true;
			req.session.user = user;
			res.ok({redirectTo: '/'})
		})
		.catch(res.serverError);
};