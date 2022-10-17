const express = require('express');
const router = express.Router(); // Creating a router object.
const db = require('../database/index');
const bcrypt = require('bcrypt'); // A library that is used to hash passwords.
const { encrypt, decrypt } = require('../module/myCrypto');
const { isEmail, checkUsername } = require('../module/check_userOrEmail');
const { creatSessionOnDB, getSessionOnDB, setSessionOnDB, compareSessionOnDB, destroySessionOnDB } = require('../module/session');
const { clearAllcookie, getSessionIDCookie } = require('../module/cookie');

const saltRounds = 10; // The number of rounds to use when generating a salt
// bcrypt.hash(password, saltRounds, (err, hash) => {});

/* This is a post request that is used to register a user. */
router.post('/register', (req, res) => {
	/* This is getting the data from the request body. */
	const name = decrypt(req.body.name).toLowerCase();
	const lastname = decrypt(req.body.lastname).toLowerCase();
	const username = decrypt(req.body.username).toLowerCase();
	const email = decrypt(req.body.email).toLowerCase();
	const password = req.body.password;
	/* This is checking if the email is valid. */

	console.log('a', decrypt(req.body.password));
	console.log('b', req.body.password);
	if (!isEmail(email)) {
		res.status(203).send({
			msg: 'Invalid email',
			code: 101,
		});
		return;
	}

	/* This is checking if the username is valid. */
	if (!checkUsername(username)) {
		res.status(203).send({
			msg: 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.',
			code: 102,
		});
		return;
	}

	/* This is checking if the password is at least 8 characters long. */
	if (password.length < 8)
		return res.status(203).send({
			msg: 'Password must be at least 8 characters long.',
		});

	/* This is checking if the username is already registered. */
	db.query('SELECT * FROM users WHERE username = ?', [ username ], function(err, result) {
		if (err)
			throw res.status(500).send({
				msg: err,
			});
		if (result.length == 0) {
			/* This is checking if the Email is already registered. */
			db.query('SELECT * FROM users WHERE email = ?', [ email ], function(err, result) {
				if (err)
					throw res.status(500).send({
						msg: err,
					});
				if (result.length == 0) {
					/* This is inserting the data into the database. */
					db.query('INSERT INTO users (name, lastname, username, email, password ) VALUE (?,?,?,?,?)', [ name, lastname, username, email, password ], (error, response) => {
						if (error) {
							res.status(500).send({
								msg: error,
							});
						} else if (err) {
							res.status(500).send({
								msg: err,
							});
						} else {
							res.status(200).send({
								msg: 'User successfully registered',
								code: 201,
							});
						}
					});
				} else {
					res.status(203).send({
						msg: 'Email already registered',
						code: 100,
					});
				}
			});
		} else {
			res.status(203).send({
				msg: 'username already registered',
				code: 100,
			});
		}
	});
});

/* This is a post request that is used to login a user. */
router.post('/login', (req, res) => {
	// Unless we explicitly write to the session (and resave is false), the
	// store is never updated, even though a new session is generated on each
	// request. After we modify that session and during req.end(), it gets
	// persisted. On subsequent writes, it's updated and synced with the store.

	const email = decrypt(req.body.email).toLowerCase();
	const password = decrypt(req.body.password);
	var userOrEmail = 'username';
	console.log(password);

	/* This is checking if the email or username. */
	if (isEmail(email)) {
		userOrEmail = 'email';
	} else {
		if (!checkUsername(email)) {
			res.status(203).send({
				msg: 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.',
				code: 102,
			});
			return;
		}
	}
	/* This is checking if the user is registered. */
	db.query('SELECT * FROM users WHERE ' + userOrEmail + ' = ?', [ email ], (err, result) => {
		if (err) res.status(500).send(err);
		if (result.length > 0) {
			bcrypt.compare(password, result[0].password, (error, response) => {
				if (error) {
					// console.log('error :' + error);
					res.status(500).send(error);
				} else if (err) {
					// console.log('err :' + err);
					res.status(500).send(err);
				}
				if (response == true) {
					if (req.session.user) {
						res.status(200).send({
							user: req.session.user,
							code: 105,
						});
					} else {
						console.log('User not logged in');
						req.session.user = {
							name: result[0].name,
							lastname: result[0].lastname,
							userID: result[0].userID,
							username: email,
							role: result[0].role,
							loggedIn: true,
						};
						getSessionIDCookie(req, res);
						creatSessionOnDB(req);
						res.status(200).send({
							msg: 'successfully',
							user: req.session.user,
							code: 105,
						});
					}
				} else {
					res.status(203).send({
						msg: 'Email or password incorrect',
						code: 105,
					});
				}
			});
		} else {
			res.status(203).send({
				msg: 'Not registered user!',
				code: 104,
			});
		}
	});
});

router.get('/logout', (req, res, next) => {
	// Note that the portion between 's%3A' and '.' is the session ID above.
	// 's%3A' is URL encoded and decodes to 's:'. The last part is the signature.
	// sid=s%3A0kVkUn7KUX1UZGnjagDKd_NPerjXKJsA.senfzYOeNHCtGUNP4bv1%2BSdgSdZWFtoAaM73odYtLDo
	// console.log(req.get('cookie'))

	// Upon logout, we can destroy the session and unset req.session.
	console.log(req.session);
	var destroySession = destroySessionOnDB(req.session.user.userID);
	console.log('logout completed', destroySession);
	req.session.destroy();
	clearAllcookie(req, res);
	res.status(200).json({ req: req.session });
	next(); // this will give you the above exception
});

/* This is exporting the router object. */
module.exports = router;
