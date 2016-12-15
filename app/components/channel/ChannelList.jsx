import React from 'react';
import {Link} from 'react-router';
import RoomList from '../room/RoomList.jsx';

export default class ChannelList extends React.Component {

	render() {
		const channels = this.props.channels.map(channel => {
			return (
				<Link to={`/channel/${channel._id}`} className="list-group-item" key={channel._id}>
					{channel.name}
				</Link>
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