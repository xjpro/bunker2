var viewController = require('../controllers/viewController');
var loginController = require('../controllers/loginController');
var chatController = require('../controllers/chatController');

var isLoggedIn = require('../policies/isLoggedIn');

module.exports.http = app => {
	app.get('/login', viewController.login);
	app.get('/logout', viewController.logout);
	app.get('/', isLoggedIn, viewController.index);

	app.post('/api/v1/login', loginController.login);
};

module.exports.socket = io => {
	io.on('connection', socket => {
		socket.emit('news', {hello: 'world'});
		socket.on('init', data => {
			chatController.init(socket, data);
		});
	});
};