const getSessionIDCookie = (req, res) => {
	const { headers: { cookie } } = req;
	if (cookie) {
		const item = cookie.split(';').reduce((res, item) => {
			const data = item.trim().split('=');
			return {
				...res,
				[data[0]]: data[1],
			};
		}, {});
		const keys = Object.keys(item);
		const values = Object.values(item);
		res.locals.cookie = item;
		req[keys] = values;
	} else res.locals.cookie = {};
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

module.exports = { clearAllcookie, getSessionIDCookie };
