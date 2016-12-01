var viewController = require('../controllers/viewController');
var isLoggedIn = require('../policies/isLoggedIn');

module.exports.http = (app) => {
	app.get('/login', viewController.login);
	app.get('/', isLoggedIn, viewController.index);
};

module.exports.socket = (app) => {
};