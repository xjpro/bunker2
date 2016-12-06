import React from 'react';
//import {observable} from 'mobx';
import {observer} from 'mobx-react';
import ChatState from '../ChatState';
import Login from './Login.jsx';
import Header from './Header.jsx';
import ChannelList from './ChannelList.jsx';
import MessageList from './MessageList.jsx';

// Begin the chat!
const chatState = new ChatState();

@observer
export default class Chat extends React.Component {
	userStore = chatState.userStore;
	channelStore = chatState.channelStore;

	render() {
		const user = this.userStore.user || {};
		const channels = this.channelStore.channels;
		return (
			<div>
				{!user._id ? <Login/> : null}
				<Header/>
				<div className="container-fluid">
					<div className="col-xs-2">
						<ChannelList channels={channels} user={user}/>
					</div>
					<div className="col-xs-8">
						<MessageList/>
					</div>
					<div className="col-xs-2">
					</div>
				</div>
			</div>
		);
	}
}
