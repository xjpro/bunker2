(function bunkerListener(socket) {

	function handleConnected(socket) {
		console.log('socket connected');
		console.log(`oauth token is ${localStorage.token ? 'present' : 'not present'}`);
		if (localStorage.token) {
			socket.emit('user.login', {token: localStorage.token});
		}
	}

	function handleDisconnected(socket) {
	}

	let events = {
		connect: handleConnected,
		disconnect: handleDisconnected,
		'user.loggedIn': () => socket.emit('chat.init'),
		'chat.initialData': (socket, data) => bunkerData.init(data),
		'channel.updated': (socket, data) => bunkerData.channelUpdated(data),
		'room.messageCreated': (socket, data) => bunkerData.messageReceived(data),
		'room.messageEdited': (socket, data) => bunkerData.messageEdited(data)
	};

	// We can listen for events now!
	_.each(events, (handler, eventName) => {
		socket.on(eventName, data => {
			handler(socket, data);
		});
	});

})(window.socket);
