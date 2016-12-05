(function (socket) {
	let subscribers = {
		userUpdated: [],
		channelsUpdated: [],
		messageReceived: [],
		currentChannelChanged: []
	};

	window.bunkerData = {
		// Data
		user: {},
		channels: [],
		currentChannel: null,

		// Pub/sub
		subscribe(event, callback) {
			subscribers[event].push(callback);
		},
		unsubscribe(event) {
			// todo implement unsub
		},

		// Incoming events
		init(initialData) {
			console.log(initialData);
			_.assign(this, initialData);
			this.currentChannel = _.find(this.channels, {_id: this.user.currentChannel});
			subscribers.userUpdated.forEach(callback => callback());
			subscribers.channelsUpdated.forEach(callback => callback());
			subscribers.currentChannelChanged.forEach(callback => callback());
		},
		channelUpdated(data) {
			var existing = _.find(this.channels, {_id: data._id});
			_.assign(existing, data);
			subscribers.channelsUpdated.forEach(callback => callback());
		},
		messageReceived(data) {
			_.find(this.rooms, {_id: data.room}).messages.push(data.text);
			subscribers.messageReceived.forEach(callback => callback());
		},
		messageEdited(data) {

		},

		// Outgoing events
		// createMessage(roomId, messageText) {
		// 	socket.emit('room.message', {
		// 		room: roomId,
		// 		text: messageText
		// 	});
		// },
		createRoom() {
			if (!this.user.currentChannel) throw new Error('No current channel');
			socket.emit('channel.createRoom', {
				channel: this.user.currentChannel
			});
		}
	};

})(window.socket);