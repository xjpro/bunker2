var viewController = require('../controllers/viewController');
var loginController = require('../controllers/loginController');
var chatController = require('../controllers/chatController');

module.exports.http = app => {
	app.get('/', viewController.index);
};

module.exports.socket = io => {
	io.on('connection', socket => {
		socket.on('login', data => {
			loginController.login(socket, data);
		});
		socket.on('init', data => {
			chatController.init(socket, data);
		});
	});
};