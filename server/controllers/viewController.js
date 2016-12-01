var viewController = module.exports;
var config = require('../config');

viewController.login = (req, res) => {
	res.render('login', {
		googleAuthClientId: config.googleAuth.clientId
	});
};

viewController.logout = (req, res) => {
	req.session.destroy();
	res.redirect('/login');
};

viewController.index = (req, res) => {
	res.render('index');
};