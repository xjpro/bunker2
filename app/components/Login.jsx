window.onSignIn = googleUser => {
	localStorage.token = googleUser.getAuthResponse().id_token;
	window.socket.emit('login', {token: localStorage.token});
};

function Login() {
	return (
		<div className="modal show">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-body">
						<h1>Welcome to Bunker</h1>
						<p>Where all your dreams will come true...</p>
						<div className="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>
					</div>
				</div>
			</div>
		</div>
	);
}