var loginController = module.exports;

loginController.login = (req, res) => {
	var token = req.body.token;
	console.log('the token is', token);
	res.ok();
};