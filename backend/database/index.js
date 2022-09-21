const mysql = require('mysql');
require('dotenv').config();

/* This is creating a connection to the database. */
var db = mysql.createPool({
	connectionLimit: 10,
	host: process.env.host,
	user: process.env.user,
	password: process.env.password,
	port: process.env.port,
	database: process.env.database
});

/* This is creating a connection to the database. */
db.getConnection((err, connection) => {
	if (err) throw err;
	console.log('DB connected successful: ' + connection.threadId);
	connection.release();
});

module.exports = db;
