const express = require('express');
const router = express.Router(); // Creating a router object.
const db = require('../database/index');
const bcrypt = require('bcrypt'); // A library that is used to hash passwords.
const {
	encrypt,
	decrypt
} = require('../module/crpyto');
const {
	isEmail,
	checkUsername
} = require('../module/check_userOrEmail');
const {
	getSessionOnDB,
	setSessionOnDB,
	compareSessionOnDB,
	destroySessionOnDB
} = require('../module/session');

const saltRounds = 10; // The number of rounds to use when generating a salt


router.get('/set', (req, res) => {
	req.session.user = {
		name: 'Aland',
		lastname: "Mariwan"
	};
	res.send(req.sessionID);
	console.log(req);
});

router.get('/get', (req, res) => {
	res.send(req.sessionID);
	// console.log(req.sessionStore.sessions);
	// console.log(req);
});
router.get('/det', (req, res) => {
	req.session.destroy();
	res.send(req.session.user);
});

/* This is a post request that is used to register a user. */
router.post('/register', (req, res) => {
	/* This is getting the data from the request body. */
	const name = decrypt(req.body.name).toLowerCase();
	const lastname = decrypt(req.body.lastname).toLowerCase();
	const username = decrypt(req.body.username).toLowerCase();
	const email = decrypt(req.body.email).toLowerCase();
	const password = req.body.password;
	/* This is checking if the email is valid. */
	if (!isEmail(email)) {
		res.send({
			msg: 'Invalid email',
			code: 101
		});
		return;
	}

	/* This is checking if the username is valid. */
	if (!checkUsername(username)) {
		res.send({
			msg: 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.',
			code: 102
		});
		return;
	}

	/* This is checking if the password is at least 8 characters long. */
	if (password.length < 8)
		return res.send({
			msg: 'Password must be at least 8 characters long.'
		});

	/* This is checking if the username is already registered. */
	db.query('SELECT * FROM users WHERE username = ?', [username], function (err, result) {
		if (err) throw err;
		if (result.length == 0) {
			/* This is checking if the Email is already registered. */
			db.query('SELECT * FROM users WHERE email = ?', [email], function (err, result) {
				if (err) throw err;
				if (result.length == 0) {
					/* This is inserting the data into the database. */
					db.query(
						'INSERT INTO users (name, lastname, username, email, password ) VALUE (?,?,?,?,?)',
						[name, lastname, username, email, password],
						(error, response) => {
							if (error) {
								res.send({
									msg: error
								});
							} else if (err) {
								res.send({
									msg: err
								});
							} else {
								res.send({
									msg: 'User successfully registered',
									code: 201
								});
							}
						}
					);
				} else {
					res.send({
						msg: 'Email already registered',
						code: 100
					});
				}
			});
		} else {
			res.send({
				msg: 'username already registered',
				code: 100
			});
		}
	});
});

router.get('/login', (req, res) => {
	console.log(req.sessionID);
	if (req.session.user) {
		res.send({
			loggedIn: true,
			user: req.session.user
		});
	} else {
		res.send({
			loggedIn: false
		});
	}
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

	/* This is checking if the email or username. */
	if (isEmail(email)) {
		userOrEmail = 'email';
	} else {
		if (!checkUsername(email)) {
			res.send({
				msg: 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.',
				code: 102
			});
			return;
		}
	}
	/* This is checking if the user is registered. */
	db.query('SELECT * FROM users WHERE ' + userOrEmail + ' = ?', [email], (err, result) => {
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
					console.log(req.session);
					if (req.session.user) {
						res.send({
							loggedIn: true,
							user: req.session.user
						});
					} else {
						req.session.user = {
							name: result[0].name,
							lastname: result[0].lastname,
							userID: result[0].userID,
							username: email,
							role: result[0].role
						};
						// setSessionOnDB(req);
						res.send(
							req.session
						);
					}
				} else {
					res.send({
						msg: 'Email or password incorrect',
						code: 105
					});
				}
			});
		} else {
			res.send({
				msg: 'Not registered user!',
				code: 104
			});
		}
	});
});

router.get('/logout', (req, res) => {
	var x = destroySessionOnDB(3);
	console.log("logout completed", x);
	res.send(x);
})

router.post('/logout', (req, res) => {

	// Assuming the request was authenticated in /login above,
	/*
	  Session {
	    cookie: {
	      path: '/',
	      _expires: 2018-11-18T02:03:01.926Z,
	      originalMaxAge: 7200000,
	      httpOnly: true,
	      secure: false,
	      sameSite: true
	    },
	    userId: 1 <-- userId from /login
	  }
	*/
	// console.log(req.session)

	// console.log(req.session.id) // ex: 0kVkUn7KUX1UZGnjagDKd_NPerjXKJsA

	// Note that the portion between 's%3A' and '.' is the session ID above.
	// 's%3A' is URL encoded and decodes to 's:'. The last part is the signature.
	// sid=s%3A0kVkUn7KUX1UZGnjagDKd_NPerjXKJsA.senfzYOeNHCtGUNP4bv1%2BSdgSdZWFtoAaM73odYtLDo
	// console.log(req.get('cookie'))

	// Upon logout, we can destroy the session and unset req.session.
	// req.session.destroy(err => {
	// We can also clear out the cookie here. But even if we don't, the
	// session is already destroyed at this point, so either way, the
	// user won't be able to authenticate with that same cookie again.
	// res.clearCookie('session_id')

	// })
	console.log(req.session.user.userID)
	var x = destroySessionOnDB(req.session.user.userID);
	console.log("logout completed", x);
	res.send(x);
})

/* This is exporting the router object. */
module.exports = router;