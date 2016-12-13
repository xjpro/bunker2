// Include SASS styling
require('./style/base.scss');

import React from 'react';
import ReactDOM  from 'react-dom';
import UIRouterReact, {UIView} from 'ui-router-react';

import ChatView from './components/ChatView.jsx';
import ChannelView from './components/ChannelView.jsx';

const router = new UIRouterReact();
const states = [
	{
		name: 'chat',
		url: '',
		component: ChatView
	},
	{
		// List channels
		name: 'chat.channel',
		url: '/channel',
		component: ChannelView
	},
	// {
	// 	// Redirect to rooms in channel
	// 	name: 'chat.channel.channelDetail',
	// 	url: '/:channelId',
	// 	redirectTo: 'chat.channel.channelDetail.room'
	// },
	// {
	// 	// List rooms in channel
	// 	name: 'chat.channel.channelDetail.room',
	// 	url: '/room'
	// },
	// {
	// 	name: 'chat.channel.channelDetail.room.roomDetail',
	// 	url: '/:roomId'
	// }
];

states.forEach(state => router.stateRegistry.register(state));
router.start();

ReactDOM.render(
	React.createElement(UIView, null),
	document.getElementById('bunker')
);