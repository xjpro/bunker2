var userService = module.exports;

var request = require('request-promise');
var moment = require('moment');

var config = require('../config');
var User = require('../models/User');

userService.getUserByToken = token => {
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
				return null;
			}

			return User.findOne({email: auth.email})
				.then(user => {
					if (user) return user;
					return User.create({nick: auth.name, email: auth.email})
						.then(() => {
							// create membership of General room
						});
				});
		});
};



