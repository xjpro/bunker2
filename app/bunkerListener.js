window.onSignIn = function (googleUser) {
	localStorage.token = googleUser.getAuthResponse().id_token;
	window.socket.emit('login', {token: localStorage.token});
};

(function bunkerListener(socket) {

	function handleConnected(socket) {
		console.log('socket connected');
		console.log(`oauth token is ${localStorage.token ? 'present' : 'not present'}`);
		if (localStorage.token) {
			socket.emit('login', {token: localStorage.token});
		}
	}

	function handleDisconnected(socket) {
	}

	let events = {
		connect: handleConnected,
		disconnect: handleDisconnected,
		loggedIn: () => socket.emit('init'),
		initialData: (socket, data) => bunkerData.init(data),
		message: (socket, data) => bunkerData.messageReceived(data),
		edit: (socket, data) => bunkerData.messageEdited(data)
	};

	// We can listen for events now!
	_.each(events, (handler, eventName) => {
		socket.on(eventName, data => {
			handler(socket, data);
		});
	});

})(window.socket);
