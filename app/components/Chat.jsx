class Chat extends React.Component {
	constructor() {
		super();
		this.state = {
			user: bunkerData.user
		};
	}

	componentWillMount() {
		bunkerData.subscribe('userUpdated', () => {
			console.log('bd told me user updated yaty');
			this.setState({
				user: bunkerData.user
			});
		});
	}

	render() {
		return (
			<div>
				{!this.state.user._id ? <Login/> : null}
			</div>
		);
	}
}