const clearAllcookie = (req, res) => {
	if (req == null || req.cookies == null || req.cookies.length == 0) return false;
	cookie = req.cookies;
	for (var prop in cookie) {
			if (!cookie.hasOwnProperty(prop)) {
					continue;
			}    
			res.cookie(prop, '', {expires: new Date(0)});
	}
	return true;
};

module.exports = clearAllcookie;
