module.exports = server => {
	var io = require('socket.io')(server);
	require('./routes').socket(io);
	return io;
};

