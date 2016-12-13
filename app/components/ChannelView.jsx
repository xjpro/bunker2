import React from 'react';
import chatStore from '../stores/ChatStore';

export default class ChannelView extends React.Component {
	render() {
		const channels = chatStore.channelStore.channels.map(channel => {
			return (
				<a className="list-group-item" key={channel._id}>
					{channel.name}
				</a>
			);
		});

		return (
			<div className="list-group">
				{channels}
			</div>
		);
	}
}