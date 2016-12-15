import React from 'react';
import chatStore from '../stores/ChatStore';

export default class Login extends React.Component {
	render() {
		return (
			<div className={`modal ${chatStore.user._id ? 'show' : ''}`}>
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
}