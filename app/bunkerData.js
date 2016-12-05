(function (socket) {
	let subscribers = {
		userUpdated: [],
		channelsUpdated: [],
		messageReceived: []
	};

	window.bunkerData = {
		// Data
		user: {},
		channels: [],

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
			subscribers.userUpdated.forEach(callback => callback());
			subscribers.channelsUpdated.forEach(callback => callback());
		},
		messageReceived(data) {
			_.find(this.rooms, {_id: data.room}).messages.push(data.text);
			subscribers.messageReceived.forEach(callback => callback());
		},
		messageEdited(data) {

		},

		// Outgoing events
		createMessage(roomId, messageText) {
			socket.emit('message', {
				room: roomId,
				text: messageText
			});
		}
	};

})(window.socket);