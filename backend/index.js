/* This is importing the modules that we need to use in our application. */
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors'); //  A middleware that is used to parse the body of the request.
const app = express();
require('dotenv').config();
const SERVERPORT = process.env.SERVERPORT;

// app middleware
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);

const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(
	session({
		/* This is a secret key that is used to encrypt the session. */
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: true,
			httpOnly: false, // This is a security feature that prevents the cookie from being accessed by JavaScript.
			maxAge: 24 * 60 * 60 * 1000 // Setting the cookie to expire in 24 hours.
		}
	})
);

/* This is a middleware that is used to parse the body of the request. */
app.use(
	cors({
		origin: [ 'http://localhost:3000' ],
		methods: [ 'GET', 'POST' ],
		credentials: true
	})
);
app.use(cookieParser());

app.use(express.static('static'));

// Routers
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

/* This is telling the server to listen to port 3001. */
app.listen(SERVERPORT, () => {
	console.log('running in the', SERVERPORT);
});
