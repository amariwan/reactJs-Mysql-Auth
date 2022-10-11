const db = require('../database/index');

const updateUser = (userInfo) => {
	db.query(`UPDATE user SET user_id = ? WHERE user_id = ?`, [ userInfo ], (err, result) => {
		if (err) return err;
	});
};

const islogger = (session_id) => {
	db.query('SELECT * FROM sessions_users WHERE session_id = ? ', [ session_id ], (err, result) => {
		if (err) return err;
		if (result.length > 0) return true;
	});
	return false;
};

module.exports = islogger;
