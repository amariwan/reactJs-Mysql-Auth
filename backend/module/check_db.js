/* This is . */
const checkDBTable = (table) => {
	db.query('SELECT * FROM ' + table, null, function(err, result) {
		if (err) throw err.sqlMessage;
	});
};
