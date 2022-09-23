const mysql = require('mysql');
require('dotenv').config();

/* This is creating a connection to the database. */

var config_db = {
	connectionLimit: 10,
	host: process.env.host,
	user: process.env.user,
	password: process.env.password,
	port: process.env.port,
	database: process.env.database,
	createDatabaseTable: true,
	checkExpirationInterval: 900000, // How frequently expired sessions will be cleared; milliseconds.
	expiration: 1512671400000, // The maximum age of a valid session; milliseconds.
}

var db = mysql.createPool(config_db); // or mysql.createConnection(config_db);

/* This is creating a connection to the database. */
db.getConnection((err, connection) => {
	if (err) throw err;
	console.log('🗃  DB connected successful: ' + connection.threadId);
	connection.release();
});

module.exports = db;