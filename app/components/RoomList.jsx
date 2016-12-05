class RoomList extends React.Component {

	createRoom() {
		bunkerData.createRoom();
	}

	render() {

		let rooms = this.props.rooms.map(room => {
			return (
				<li key={room._id}>
					<a>
						{room.name}
					</a>
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