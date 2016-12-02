class Login extends React.Component {
	render() {
		return (
			<div id="login-modal">
				<div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
			</div>
		);
	}
}