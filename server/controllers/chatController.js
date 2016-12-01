var chatController = module.exports;

var User = require('../models/User');
var RoomMember = require('../models/RoomMember');
var userService = require('../services/userService');

chatController.init = (socket, data) => {
	return userService.getUserByToken(data.token)
		.then(user => {
			console.log(user);
			socket.emit('init', user);
		});

	// return Promise.join(
	// 	User.findById(req.session.user._id),
	// 	RoomMember.find({user: req.session.user._id}).populate('room')
	// )
	// 	.spread((user, memberships) => {
	// 		return {
	// 			user,
	// 			rooms: _.map(memberships, 'room')
	// 		};
	// 	})
	// 	.then(res.ok)
	// 	.catch(res.serverError);
};