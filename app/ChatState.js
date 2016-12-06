var socket = require('socket.io-client')('localhost'); // will connect the socket!!
import UserStore from './stores/UserStore';

global.onSignIn = googleUser => {
	localStorage.token = googleUser.getAuthResponse().id_token;
	socket.emit('login', {token: localStorage.token});
};

export default class ChatState {

	userStore = new UserStore();

	constructor() {
		let events = {
			connect: this.handleConnected,
			disconnect: this.handleDisconnected,
			'user.loggedIn': () => socket.emit('chat.init'),
			'chat.initialData': (socket, data) => this.handleInitialData(data),
			//'channel.updated': (socket, data) => bunkerData.channelUpdated(data),
			//'room.messageCreated': (socket, data) => bunkerData.messageReceived(data),
			//'room.messageEdited': (socket, data) => bunkerData.messageEdited(data)
		};

		// We can listen for events now!
		_.each(events, (handler, eventName) => {
			socket.on(eventName, data => {
				handler(socket, data);
			});
		});
	}

	handleConnected(socket) {
		console.log('socket connected');
		console.log(`oauth token is ${localStorage.token ? 'present' : 'not present'}`);
		if (localStorage.token) {
			socket.emit('user.login', {token: localStorage.token});
		}
	}

	handleDisconnected(socket) {
		console.log('socket disconnected');
	}

	handleInitialData(data) {
		console.log('received initial data payload');
		console.log(data);
		//_.assign(this.userStore.user, data.user);
		this.userStore.user = data.user;
	}

}