window.bunkerData = () => {
	var socket = io('http://localhost');
	socket.on('connect', () => {
		console.log('socket connected');
		if (!localStorage.token) {
			// show login modal
		}
		else {
			socket.emit('login', {token: localStorage.token});
		}
	});
	socket.on('disconnect', () => {
		console.log('socket disconnected');
	});
	socket.on('loggedIn', () => {
		// Close login modal
		socket.emit('init', () => {

		});
	});

	socket.on('init', data => {
		console.log(data);
	});
};