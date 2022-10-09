const getCookie = (req, res) => {
	const { headers: { cookie } } = req;
	if (cookie) {
		const values = cookie.split(';').reduce((res, item) => {
			const data = item.trim().split('=');
			var item = {
				...res,
				[data[0]]: data[1],
			};
			console.log(item);
			return item;
		});
		res.locals.cookie = values;
		req.sessionID = values.session_id;
	} else {
		res.locals.cookie = {};
		return null;
	}
};

const clearAllcookie = (req, res) => {
	if (req == null || req.cookies == null || req.cookies.length == 0) return false;
	cookie = req.cookies;
	for (var prop in cookie) {
		if (!cookie.hasOwnProperty(prop)) {
			continue;
		}
		res.cookie(prop, '', { expires: new Date(0) });
	}
	return true;
};

module.exports = { clearAllcookie, getCookie };
