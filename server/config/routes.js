var viewController = require('../controllers/viewController');
var loginController = require('../controllers/loginController');
var chatController = require('../controllers/chatController');
var channelController = require('../controllers/channelController');

module.exports.http = app => {
	app.get('/', viewController.index);
};

module.exports.socket = io => {
	io.on('connection', socket => {
		socket.on('user.login', data => {
			loginController.login(socket, data);
		});
		socket.on('chat.init', data => {
			chatController.init(socket, data);
		});
		socket.on('channel.createRoom', data => {
			channelController.createRoom(socket, data);
		});
	});
};