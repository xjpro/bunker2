(function (socket) {
	let subscribers = {
		userUpdated: [],
		messageReceived: []
	};

	window.bunkerData = {
		// Data
		user: {},
		rooms: [],

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
			this.user = initialData.user;
			subscribers.userUpdated.forEach(callback => callback());
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