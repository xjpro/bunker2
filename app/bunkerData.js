window.bunkerData = {
	// Data
	user: {},
	rooms: [],

	// Internal
	_subscribers: [],

	// Pub/sub
	subscribe(event, callback) {
		if (!this._subscribers[event]) this._subscribers[event] = [];
		this._subscribers[event].push(callback);
	},
	unsubscribe(event) {
		// todo implement unsub
	},

	// Events
	updateUser(userData) {
		this.user = userData;
		this._subscribers['userUpdated'].forEach(callback => callback());
	}
};