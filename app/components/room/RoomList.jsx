import React from 'react';
import {Link} from 'react-router';

export default class RoomList extends React.Component {

	createRoom() {
	}

	render() {

		let rooms = this.props.rooms.map(room => {
			return (
				<li key={room._id}>
					<Link to={`/channel/${room.channel}/room/${room._id}`}>
						{room.name}
					</Link>
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