import React from 'react';
import {UISref} from 'ui-router-react';
import RoomList from '../room/RoomList.jsx';

export default class ChannelList extends React.Component {

	render() {
		const channels = this.props.channels.map(channel => {
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
				<div id="channel-list" className="list-group">
					{channels}
					<a className="list-group-item">
						Create channel...
					</a>
				</div>
				<RoomList rooms={this.props.rooms}/>
			</div>
		);
	}
}