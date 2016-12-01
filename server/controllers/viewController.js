var config = require('../config');

module.exports.login = (req, res) => {
	res.render('login', {
		googleAuthClientId: config.googleAuth.clientId
	});
};
module.exports.index = (req, res) => {
	res.render('index');
};