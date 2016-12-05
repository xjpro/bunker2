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
				<div>
					<ChannelList/>
					<div id="message-list">
						<MessageList/>
					</div>
					<div id="member-list">
					</div>
				</div>
			</div>
		);
	}
}