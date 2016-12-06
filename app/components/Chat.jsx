var React =require('react');
var Login = require('./Login.jsx');

module.exports = React.createClass({
	// constructor() {
	// 	super();
	// 	// this.state = {
	// 	// 	user: bunkerData.user
	// 	// };
	// }

	getInitialState() {
		return {
			user: {}
		};
	},

	componentWillMount() {
		// bunkerData.subscribe('userUpdated', () => {
		// 	this.setState({
		// 		user: bunkerData.user
		// 	});
		// });
	},

	render() {
		return (
			<div>
				{!this.state.user._id ? <Login/> : null}

			</div>
		);
	}
});