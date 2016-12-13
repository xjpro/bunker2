import React from 'react';
import {UISref} from 'ui-router-react';

export default class ChannelRoomView extends React.Component {
	render() {

		const rooms = this.props.resolves.rooms.map(room => {
			return (
				<UISref to="chat.room" params={{channelId: room.channel, roomId: room._id}} key={room._id}>
					<a className="list-group-item">{room.name}</a>
				</UISref>
			);
		});

		return (
			<div>
				<h1>Rooms</h1>
				<div className="list-group">
					{rooms}
					<a className="list-group-item">
						Create room...
					</a>
				</div>
			</div>
		);
	}
}