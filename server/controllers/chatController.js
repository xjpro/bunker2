var chatController = module.exports;

var User = require('../models/User');
var RoomMember = require('../models/RoomMember');

chatController.init = (socket) => {
	if (!socket.user) throw new Error('not logged in!');

	return Promise.join(
		User.findById(socket.user._id),
		RoomMember.find({user: socket.user._id}).populate('room')
	)
		.spread((user, memberships) => {
			return {
				user,
				rooms: _.map(memberships, 'room')
			};
		})
		.then(initialData => {
			socket.emit('initialData', initialData)
		});
};