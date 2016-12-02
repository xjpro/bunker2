var viewController = require('../controllers/viewController');
var loginController = require('../controllers/loginController');
var chatController = require('../controllers/chatController');

var isLoggedIn = require('../policies/isLoggedIn');

module.exports.http = app => {
	app.get('/', viewController.index);

};

module.exports.socket = io => {
	io.on('connection', socket => {
		socket.emit('news', {hello: 'world'});
		socket.on('login', data => {
			loginController.login(socket, data);
		});
		socket.on('init', data => {
			chatController.init(socket, data);
		});
	});
};