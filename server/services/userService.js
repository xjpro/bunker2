var userService = module.exports;

var request = require('request-promise');
var moment = require('moment');

var config = require('../config');
var User = require('../models/User');
var Channel = require('../models/Channel');
var ChannelMember = require('../models/ChannelMember');

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

					// Create new user
					return Promise.join(
						User.create({nick: auth.name, email: auth.email}),
						Channel.findOne() // first channel always 'General'
					)
						.spread((user, channel) => {
							// Create membership in General channel
							return ChannelMember.create({user, channel})
								.then(() => {
									return user.save();
								});
						});
				});
		})
		.catch(err => {
			if (err.statusCode === 400) return null;
			throw err;
		});
};



