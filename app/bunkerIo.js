window.onSignIn = function (googleUser) {
	localStorage.token = googleUser.getAuthResponse().id_token;
};

window.bunkerIo = {
	_socket: null,
	init() {
		this._socket = io('http://localhost');
		this._socket.on('connect', () => {
			console.log('socket connected');
			console.log(`oauth token is ${localStorage.token ? 'present' : 'not present'}`);
			if (!localStorage.token) {
				// show login modal
			}
			else {
				this._socket.emit('login', {token: localStorage.token});
			}
		});
		this._socket.on('disconnect', () => {
			console.log('socket disconnected');
		});
		this._socket.on('loggedIn', () => {
			this._socket.emit('init'); // Get initial data
		});
		this._socket.on('initialData', data => {
			bunkerData.updateUser(data.user);
		});
	}
};

(function () {
	bunkerIo.init();
})();