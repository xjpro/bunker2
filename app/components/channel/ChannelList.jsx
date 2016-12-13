import React from 'react';
import RoomList from '../room/RoomList.jsx';

export default class ChannelList extends React.Component {

	render() {
		const channels = this.props.channels.map(channel => {
			return (
				<a className="list-group-item" key={channel._id}>
					{channel.name}
				</a>
			);
		});

		const currentChannel = _.find(this.props.channels, {_id: this.props.user.currentChannel}) || _.first(this.props.channels);
		const rooms = currentChannel ? currentChannel.rooms : [];

		return (
			<div>
				<div id="channel-list" className="list-group">
					{channels}
					<a className="list-group-item">
						Create channel...
					</a>
				</div>
				<RoomList rooms={rooms}/>
			</div>
		);
	}
}