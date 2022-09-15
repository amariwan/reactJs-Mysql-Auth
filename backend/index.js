/* This is importing the modules that we need to use in our application. */
const express = require('express');
const cors = require('cors');
const db = require('./database/index');
const check = require('./check/check_userOrEmail');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();
const saltRounds = 10;

var d = new Date('year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond');
console.log(d);

/* This is a middleware that is used to parse the body of the request. */
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(
	cors({
		origin: [ 'http://localhost:3000' ],
		methods: [ 'GET', 'POST' ],
		credentials: true
	})
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		key: 'userId',
		secret: 'subscribe',
		resave: false,
		saveUninitialized: false,
		cookie: {
			expires: 60 * 60 * 24
		}
	})
);

/* This is a post request that is used to register a user. */
app.post('/Register', (req, res) => {
	/* This is getting the data from the request body. */
	const username = req.body.username.toLowerCase();
	const email = req.body.email.toLowerCase();
	const password = req.body.password;

	console.log(username, email, password);

	/* This is checking if the email is valid. */
	if (!check.isEmail(email)) {
		res.send({ msg: 'Invalid email', code: 101 });
		return;
	}

	/* This is checking if the username is valid. */
	if (!check.checkUsername(username)) {
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

app.get('/login', (req, res) => {
	if (req.session.user) {
		res.send({ loggedIn: true, user: req.session.user });
	} else {
		res.send({ loggedIn: false });
	}
});

/* This is a post request that is used to login a user. */
app.post('/login', (req, res) => {
	const email = req.body.email.toLowerCase();
	const password = req.body.password;
	var userOrEmail = 'username';

	/* This is checking if the email or username. */
	if (check.isEmail(email)) {
		userOrEmail = 'email';
	} else {
		if (!check.checkUsername(email)) {
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
					db.query('UPDATE listings SET job_checkout_timestamp = CURRENT_TIMESTAMP', (err, response) => {
						if (err) res.send(err);

						console.log(response);
						req.session.user = result;
						console.log(req.session.user);
						res.send(result);
					});
				} else {
					res.send({ msg: 'Email or password incorrect', code: 105 });
				}
			});
		} else {
			res.send({ msg: 'Not registered user!', code: 104 });
		}
	});
});

/* This is telling the server to listen to port 3001. */
app.listen(3001, () => {
	console.log('running in the 3001');
});
