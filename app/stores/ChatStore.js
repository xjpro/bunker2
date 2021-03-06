var socket = require('socket.io-client')('localhost'); // will connect the socket!!
import {observable} from 'mobx';

// TODO find a better way to attach this
// Has to be available for Google Sign-in button
global.onSignIn = googleUser => {
	localStorage.token = googleUser.getAuthResponse().id_token;
	socket.emit('user.login', {token: localStorage.token});
};

class ChatStore {
	@observable user = {};
	@observable channels = [];
	@observable currentChannel;
	@observable connected = false;
	@observable initiated = false;

	constructor() {
		let events = {
			connect: (socket) => this.handleConnected(socket),
			disconnect: (socket) => this.handleDisconnected(socket),
			'user.loggedIn': (socket, data) => this.handleLoggedIn(socket),
			'user.loggedOut': (socket, data) => this.handleLoggedOut(socket),
			'chat.initialData': (socket, data) => this.handleInitialData(socket, data),
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
		this.connected = true;
		console.log(`oauth token is ${localStorage.token ? 'present' : 'not present'}`);
		if (localStorage.token) {
			socket.emit('user.login', {token: localStorage.token});
		}
	}

	handleDisconnected(socket) {
		console.log('socket disconnected');
		this.connected = false;
	}

	handleLoggedIn(socket) {
		console.log('logged in');
		socket.emit('chat.init')
	}

	handleLoggedOut() {
		console.log('logged out');
		this.user = {};
	}

	handleInitialData(socket, data) {
		console.log('received initial data payload');
		console.log(data);
		this.user = data.user;
		this.channels = data.channels;
		this.initiated = true;
	}

}

export default new ChatStore();