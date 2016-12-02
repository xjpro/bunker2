var socketService = module.exports;

var connectedSockets = {};

socketService.addSocket = socket => {
	connectedSockets[socket.id] = socket;
	return socket;
};
socketService.getSocket = id => {
	return connectedSockets[id];
};