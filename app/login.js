window.onSignIn = googleUser => {
	localStorage.token = googleUser.getAuthResponse().id_token;
};