(function (socket) {
	let subscribers = [];

	window.bunkerData = {
		// Data
		user: {},
		rooms: [],

		// Pub/sub
		subscribe(event, callback) {
			if (!subscribers[event]) subscribers[event] = [];
			subscribers[event].push(callback);
		},
		unsubscribe(event) {
			// todo implement unsub
		},

		// Events
		init(initialData) {
			this.user = initialData.user;
			subscribers['userUpdated'].forEach(callback => callback());
		},
		createMessage(roomId, messageText) {
			socket.emit('message', {
				room: roomId,
				text: messageText
			});
		}
	};

})(window.io('localhost'));