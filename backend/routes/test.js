const express = require('express');
const router = express.Router();
const db = require('../database/index');
const bcrypt = require('bcrypt');
/* This is a post request that is used to register a user. */
console.log('start');
router.get('/Register', (req, res, next) => {
	res.json('hello world!');
});
router.post('/Register', (req, res) => {
	/* This is getting the data from the request body. */
	const username = req.body.username.toLowerCase();
	const email = req.body.email.toLowerCase();
	const password = req.body.password;

	console.log(username, email, password);

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
									res.send({ msg: 'User successfully registered', code: 201 });
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
module.exports = router;
