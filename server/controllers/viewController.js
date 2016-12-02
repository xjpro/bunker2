var viewController = module.exports;
var config = require('../config');

viewController.index = (req, res) => {
	res.render('index', {
		googleAuthClientId: config.googleAuth.clientId
	});
};