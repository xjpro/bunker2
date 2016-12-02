window.onSignIn = function (googleUser) {
	localStorage.token = googleUser.getAuthResponse().id_token;
};

(function bunkerListener(socket) {

	function handleConnected(socket) {
		console.log('socket connected');
		console.log(`oauth token is ${localStorage.token ? 'present' : 'not present'}`);
		if (!localStorage.token) {
			// show login modal
		}
		else {
			socket.emit('login', {token: localStorage.token});
		}
	}

	function handleDisconnected(socket) {
	}

	function handleLoggedIn(socket) {
		socket.emit('init'); // Yay, now get initial data
	}

	function handleInitialData(socket, data) {
		bunkerData.init(data);
	}

	let events = {
		connect: handleConnected,
		disconnect: handleDisconnected,
		loggedIn: handleLoggedIn,
		initialData: handleInitialData
	};

	_.each(events, (handler, eventName) => {
		socket.on(eventName, data => {
			handler(socket, data);
		});
	});

})(window.io('localhost'));
