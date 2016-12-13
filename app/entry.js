// Include SASS styling
require('./style/base.scss');

import React from 'react';
import ReactDOM  from 'react-dom';
import UIRouterReact, {UIView} from 'ui-router-react';

import ChatView from './components/ChatView.jsx';
import ChannelView from './components/ChannelView.jsx';
import ChannelRoomView from './components/ChannelRoomView.jsx';
import RoomView from './components/RoomView.jsx';

import chatStore from './stores/ChatStore';

const router = new UIRouterReact();
const states = [
	{
		name: 'chat',
		url: '',
		component: ChatView,
		resolve: {
			initiated: () => chatStore.initiated()
		}
	},
	{
		// List channels
		name: 'chat.channelList',
		url: '/channel',
		component: ChannelView
	},
	{
		// Redirect to rooms in channel
		name: 'chat.channel',
		url: '/channel/:channelId',
		redirectTo: 'chat.roomList'
	},
	{
		// List rooms in channel
		name: 'chat.roomList',
		url: '/channel/:channelId/room',
		component: ChannelRoomView,
		resolve: {
			rooms: ($transition$) => {
				let channel = _.find(chatStore.channels, {_id: $transition$.params().channelId});
				if (!channel) {
					// todo throw an error?
					channel = {};
				}
				return channel.rooms || [];
			}
		}
	},
	{
		name: 'chat.room',
		url: '/channel/:channelId/room/:roomId',
		component: RoomView
	}
];

states.forEach(state => router.stateRegistry.register(state));
router.start();

ReactDOM.render(
	React.createElement(UIView, null),
	document.getElementById('bunker')
);