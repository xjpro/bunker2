import React from 'react';
import {UISref} from 'ui-router-react';

export default class RoomList extends React.Component {

	createRoom() {
	}

	render() {

		let rooms = this.props.rooms.map(room => {
			return (
				<li key={room._id}>
					<UISref to="chat.room" params={{channelId: room.channel, roomId: room._id}}>
						<a>{room.name}</a>
					</UISref>
				</li>
			);
		});

		return (
			<div id="room-list">
				<ol className="list-unstyled">
					{rooms}
					<li>
						<a onClick={this.createRoom}>
							Create room...
						</a>
					</li>
				</ol>
			</div>
		);
	}
}