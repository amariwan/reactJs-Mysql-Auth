const mysql = require('mysql');
require('dotenv').config();

/* This is creating a connection to the database. */

var config_db = {
	// Host name for database connection:
	host: process.env.host,
	// Port number for database connection:
	port: process.env.port,
	// Database user:
	user: process.env.user,
	// Password for the above database user:
	password: process.env.password,
	// Database name:
	database: process.env.database,
	// Whether or not to automatically check for and clear expired sessions:
	clearExpired: true,
	// How frequently expired sessions will be cleared; milliseconds:
	checkExpirationInterval: 900000,
	// The maximum age of a valid session; milliseconds:
	expiration: 86400000,
	// Whether or not to create the sessions database table, if one does not already exist:
	createDatabaseTable: true,
	// Number of connections when creating a connection pool:
	connectionLimit: 1,
		// Whether or not to end the database connection when the store is closed.
	// The default value of this option depends on whether or not a connection was passed to the constructor.
	// If a connection object is passed to the constructor, the default value for this option is false.
	endConnectionOnClose: true,
	charset: 'utf8mb4_bin',
}

var db = mysql.createPool(config_db); // or mysql.createConnection(config_db);

/* This is creating a connection to the database. */
db.getConnection((err, connection) => {
	if (err) throw err;
	console.log('🗃  DB connected successful: ' + connection.threadId);
	connection.release();
});

module.exports = db;