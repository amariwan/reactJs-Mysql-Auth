const db = require('../database/index');

const checkDBTable = (table) => {
	if (table == null || table.length === 0) return null;
	db.query('SELECT * FROM ' + table, null, function(err, result) {
		if (err) throw err.sqlMessage;
		return result;
	});
};

module.exports = checkDBTable;