class Chat extends React.Component {
	constructor() {
		super();
		this.state = {
			user: bunkerData.user
		};
	}

	componentWillMount() {
		bunkerData.subscribe('userUpdated', () => {
			this.setState({
				user: bunkerData.user
			});
		});
	}

	render() {
		return (
			<div>
				{!this.state.user._id ? <Login/> : null}

				<Header/>
				<div className="container-fluid">
					<div className="col-xs-2">
						<RoomList/>
					</div>
					<div className="col-xs-8">
						<MessageList/>
					</div>
					<div className="col-xs-2">
					</div>
				</div>
			</div>
		);
	}
}