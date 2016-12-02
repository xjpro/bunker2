var chatController = module.exports;

var User = require('../models/User');
var Channel = require('../models/Channel');
var ChannelMember = require('../models/ChannelMember');
var RoomMember = require('../models/RoomMember');

chatController.init = (socket) => {
	if (!socket.user) throw new Error('not logged in!');

	return Promise.join(
		User.findById(socket.user._id),
		ChannelMember.find({user: socket.user._id})
	)
		.spread((user, channelMemberships) => {
			return [user, Promise.map(channelMemberships, channelMembership => {
				return Channel.findById(channelMembership.channel).populate('rooms');
			})];
		})
		.spread((user, channels) => {
			return {user, channels};
		})
		.then(initialData => {
			socket.emit('initialData', initialData)
		});
};