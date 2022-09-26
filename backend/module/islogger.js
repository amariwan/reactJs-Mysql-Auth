const db = require('../database/index');

const islogger = () => {
	db.query('SELECT * FROM sessions_users WHERE session_id = ?', [session_id], function (err, result) {
    
  })
  return false;
}

module.exports = islogger;