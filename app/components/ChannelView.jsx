import React from 'react';
import {UISref} from 'ui-router-react';
import chatStore from '../stores/ChatStore';

export default class ChannelView extends React.Component {
	render() {
		const channels = chatStore.channels.map(channel => {
			return (
				<UISref to="chat.channel" params={{channelId: channel._id}} key={channel._id}>
					<a className="list-group-item">
						{channel.name}
					</a>
				</UISref>
			);
		});

		return (
			<div>
				<h1>Channels</h1>
				<div className="list-group">
					{channels}
					<a className="list-group-item">
						Create channel...
					</a>
				</div>
			</div>
		);
	}
}