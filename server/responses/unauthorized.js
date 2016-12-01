module.exports = (req, res, next) => {
	res.badRequest = function (data) {
		res.status(401);
		if (/application\/json/.test(req.get('accept'))) {
			res.json(data);
		}
		else {
			res.redirect('/login');
		}
		return null;
	};
	next();
};