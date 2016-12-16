import React from 'react';
import {observer} from 'mobx-react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import Login from './Login.jsx';
import ChatView from './ChatView.jsx';
import RoomView from './RoomView.jsx';
import InboxView from './InboxView.jsx';

import chatStore from '../stores/ChatStore';

@observer
export default class App extends React.Component {

	redirectToInbox(nextState, replace) {
		replace({pathname: `/inbox`});
	}

	redirectToFirstChannelRoom(nextState, replace) {
		let room = chatStore.channels[0] ? chatStore.channels[0].rooms[0] : null;
		if (room) {
			return replace({pathname: `/channel/${room.channel}/room/${room._id}`});
		}
		replace({pathname: `/inbox`});
	}

	redirectToChannelRoom(nextState, replace) {
		let channel = _.find(chatStore.channels, {_id: nextState.params.channelId});
		if (channel) {
			let room = _.first(channel.rooms);
			if (room) {
				return replace({pathname: `/channel/${room.channel}/room/${room._id}`});
			}
		}
		replace({pathname: `/inbox`});
	}

	render() {

		var routes = (
			<Router history={hashHistory}>
				<Route path="/" component={ChatView}>
					<IndexRoute onEnter={this.redirectToInbox}/>
					<Route path="/channel" onEnter={this.redirectToFirstChannelRoom}/>
					<Route path="/channel/:channelId" onEnter={this.redirectToChannelRoom}/>
					<Route path="/channel/:channelId/room" onEnter={this.redirectToChannelRoom}/>
					<Route path="/channel/:channelId/room/:roomId" component={RoomView}/>
					<Route path="/inbox" component={InboxView}/>
				</Route>
			</Router>
		);

		return (
			<div>
				<Login/>
				{chatStore.initiated ? routes : null}
			</div>
		);
	}
}