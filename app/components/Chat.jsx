function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

class Chat extends React.Component {
	constructor(props) {
		super();
		console.log('hi');
		var socket = io('http://localhost');
		socket.on('connect', () => {
			console.log('socket connected');
			socket.emit('init', {token: readCookie('token')});
		});
		socket.on('disconnect', () => {
			console.log('socket disconnected');
		});
		socket.on('init', data => {
			console.log(data);
		});
		this.state = {};
	}

	render() {
		return (
			<RoomList></RoomList>
		);
	}
}