/* This is importing the modules that we need to use in our application. */
const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = 10;

/* This is creating a connection to the database. */
var db = mysql.createConnection({
	host: process.env.host,
	user: process.env.user,
	password: process.env.password,
	port: process.env.port,
	database: process.env.database
});

/* This is creating a connection to the database. */
db.connect(function(err) {
	if (err) return console.error('error: ' + err.message);
	console.log('Connected to the MySQL server.');
});

/* This is a middleware that is used to parse the body of the request. */
app.use(express.json());
app.use(cors());

/* This is a post request that is used to register a user. */
app.post('/Register', (req, res) => {
	/* This is getting the data from the request body. */
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	/* This is checking if the email is valid. */
	if (!isEmail(email)) {
		res.send({ msg: 'Invalid email', code: 101 });
		return;
	}

	/* This is checking if the username is valid. */
	if (!checkUsername(username)) {
		res.send({
			msg:
				'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.',
			code: 102
		});
		return;
	}

	/* This is checking if the password is at least 8 characters long. */
	if (password.length < 8) return res.send({ msg: 'Password must be at least 8 characters long.' });

	/* This is checking if the username is already registered. */
	db.query('SELECT * FROM users WHERE username = ?', [ username ], function(err, result) {
		if (err) throw err;
		if (result.length == 0) {
			/* This is checking if the Email is already registered. */
			db.query('SELECT * FROM users WHERE email = ?', [ email ], function(err, result) {
				if (err) throw err;
				if (result.length == 0) {
					bcrypt.hash(password, saltRounds, (err, hash) => {
						/* This is inserting the data into the database. */
						db.query(
							'INSERT INTO users (username, email, password) VALUE (?,?,?)',
							[ username, email, hash ],
							(error, response) => {
								if (error) {
									res.send({ msg: error });
								} else if (err) {
									res.send({ msg: err });
								} else {
									res.send({ msg: 'User successfully registered', code: 106 });
								}
							}
						);
					});
				} else {
					res.send({ msg: 'Email already registered', code: 100 });
				}
			});
		} else {
			res.send({ msg: 'username already registered', code: 100 });
		}
	});
});

/* This is a post request that is used to login a user. */
app.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	var userOrEmail = 'username';

	/* This is checking if the email or username. */
	if (isEmail(email)) {
		userOrEmail = 'email';
	} else {
		if (!checkUsername(email)) {
			res.send({
				msg:
					'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.',
				code: 102
			});
			return;
		}
	}

	/* This is checking if the user is registered. */
	db.query('SELECT * FROM users WHERE ' + userOrEmail + ' = ?', [ email ], (err, result) => {
		if (err) res.send(err);
		if (result.length > 0) {
			bcrypt.compare(password, result[0].password, (error, response) => {
				if (error) {
					console.log('error :' + error);
					res.send(error);
				} else if (err) {
					console.log('err :' + err);
					res.send(err);
				}
				if (response == true) {
					res.send(response);
				} else {
					res.send({ msg: 'Email or password incorrect', code: 105 });
				}
			});
		} else {
			res.send({ msg: 'Not registered user!', code: 104 });
		}
	});
});

/**
 * It checks if the email is valid or not
 * @param email - The email address to validate.
 * @returns A function that takes an email as an argument and returns true or false.
 */
let isEmail = (email) => {
	// don't remember from where i copied this code, but this works.
	let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email)) {
		// this is a valid email address
		// call setState({email: email}) to update the email
		// or update the data in redux store.
		return true;
	} else {
		// invalid email, maybe show an error to the user.
		return false;
	}
};

/**
 * It checks if the username is valid or not
 * @param username - The username to check.
 * @returns A function that takes in a username and returns a boolean.
 */
let checkUsername = (username) => {
	// don't remember from where i copied this code, but this works.
	let re = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
	if (re.test(username)) {
		// this is a valid username
		// call setState({username: username}) to update the username
		// or update the data in redux store.
		return true;
	} else {
		// invalid username, maybe show an error to the user.
		return false;
	}
};

/* This is telling the server to listen to port 3001. */
app.listen(3001, () => {
	console.log('running in the 3001');
});
