const clearAllcookie = (req, res) => {
	if (req == null || req.cookies == null || req.cookies.length == 0) return false;
	const cookies = req.cookies;
	console.log(cookies);
	cookies.forEach((prop) => {

		res.clearCookie(prop); //Or res.cookie(prop, '', {expires: new Date(0)});
	});
	return true;
};

module.exports = clearAllcookie;
