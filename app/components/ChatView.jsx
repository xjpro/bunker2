import React from 'react';
import {observer} from 'mobx-react';
import Login from './Login.jsx';
import Header from './Header.jsx';
import ChannelList from './channel/ChannelList.jsx';

import chatStore from '../stores/ChatStore';

@observer
export default class ChatView extends React.Component {
	render() {
		const user = chatStore.user;
		const channels = chatStore.channels;
		const rooms = chatStore.currentChannel ? chatStore.currentChannel.rooms : [];
		return (
			<div>
				{!user._id ? <Login/> : null}
				<Header/>
				<div className="container-fluid">
					<div className="col-xs-3">
						<ChannelList channels={channels} rooms={rooms}/>
					</div>
					<div className="col-xs-9">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}
