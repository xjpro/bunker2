class ChannelList extends React.Component {
	constructor() {
		super();
		this.state = {
			channels: [],
			channelRooms: []
		};
	}

	componentWillMount() {
		bunkerData.subscribe('channelsUpdated', () => {
			this.setState({
				channels: bunkerData.channels,
				channelRooms: bunkerData.currentChannel.rooms
			});
		});
		bunkerData.subscribe('currentChannelChanged', () => {
			this.setState({
				channelRooms: bunkerData.currentChannel.rooms
			});
		});

	}

	render() {
		let channels = this.state.channels.map(channel => {
			return (
				<a className="list-group-item" key={channel._id}>
					{channel.name}
				</a>
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
				<RoomList rooms={this.state.channelRooms}/>
			</div>
		);
	}
}