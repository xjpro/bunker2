var socket = require('socket.io-client')('localhost'); // will connect the socket!!
import UserStore from './UserStore';
import ChannelStore from './ChannelStore';

// TODO find a better way to attach this
// Has to be available for Google Sign-in button
global.onSignIn = googleUser => {
	localStorage.token = googleUser.getAuthResponse().id_token;
	socket.emit('login', {token: localStorage.token});
};

class ChatStore {

	userStore = new UserStore();
	channelStore = new ChannelStore();

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
		this.userStore.user = data.user;
		this.channelStore.channels = data.channels;
	}

}

export default new ChatStore();