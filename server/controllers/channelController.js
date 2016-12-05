var channelController = module.exports;

var User = require('../models/User');
var Channel = require('../models/Channel');
var ChannelMember = require('../models/ChannelMember');
var Room = require('../models/Room');
var RoomMember = require('../models/RoomMember');

channelController.createRoom = (socket, data) => {
	if (!socket.user) throw new Error('not logged in!');

	return Channel.findById(data.channel)
		.then(channel => {

			if (!channel) {
				throw new Error('Channel not found!');
			}

			return Promise.join(
				channel,
				User.findById(socket.user._id),
				Room.create({
					channel: channel,
					name: 'Untitled'
				})
			);
		})
		.spread((channel, user, room) => {
			channel.rooms.push(room);
			return Promise.join(
				channel.save(),
				RoomMember.create({user, room, role: 'administrator'})
			);
		})
		.then(() => {
			return Channel.findById(data.channel).populate('rooms');
		})
		.then(channel => {
			socket.emit('channel.updated', channel);
		});
};