/* This is importing the modules that we need to use in our application. */
const express = require('express');
require('./module/checkVersion');

const helmet = require('helmet');
const cors = require('cors'); //  A middleware that is used to parse the body of the request.
const https = require('https');
const fs = require('fs');
const errorHandlers = require('./handlers/errorHandlers');

// Sessions can be stored server-side (ex: user auth) or client-side
// (ex: shopping cart). express-session saves sessions in a store, and
// NOT in a cookie. To store sessions in a cookie, use cookie-session.
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
const crypto = require('crypto');
const nonce = crypto.randomBytes(16).toString('hex'); //#endregion

// create our Express app
const app = express();

//setting CSP
const csp = {
	defaultSrc: [ `'none'` ],
	styleSrc: [ `'self'`, `'unsafe-inline'` ],
	scriptSrc: [ `'self'` ],
	imgSrc: [ `'self'` ],
	connectSrc: [ `'self'` ],
	frameSrc: [ `'self'` ],
	fontSrc: [ `'self'`, 'data:' ],
	objectSrc: [ `'self'` ],
	mediaSrc: [ `'self'` ],
};

//  app.use(helmet.noCache()); // noCache disabled by default
const SERVERPORT = process.env.SERVERPORT || 4000;
const SESSION_SECRET = process.env.SESSION_SECRET;
const sixtyDaysInSeconds = 5184000; // 60 * 24 * 60 * 60

// ======== *** SECURITY MIDDLEWARE ***

//setup helmet js
app.use(helmet());
app.use(helmet.contentSecurityPolicy(csp));
app.use(helmet.hidePoweredBy());
app.use(
	helmet.hsts({
		maxAge: sixtyDaysInSeconds,
	}),
);

app.use(
	cors({
		credentials: true,
		origin: true,
	}),
);

app.set('trust proxy', true); // trust first proxy
app.disable('x-powered-by');

// Sessions allow us to Contact data on visitors from request to request
// This keeps admins logged in and allows us to send flash messages
app.use(
	session({
		/* This is a secret key that is used to encrypt the session. */

		// Name for the session ID cookie. Defaults to 'connect.sid'.
		name: 'session_id',

		// Whether to force-save unitialized (new, but not modified) sessions
		// to the store. Defaults to true (deprecated). For login sessions, it
		// makes no sense to save empty sessions for unauthenticated requests,
		// because they are not associated with any valuable data yet, and would
		// waste storage. We'll only save the new session once the user logs in.
		saveUninitialized: true,

		// Whether to force-save the session back to the store, even if it wasn't
		// modified during the request. Default is true (deprecated). We don't
		// need to write to the store if the session didn't change.
		resave: false,

		// Whether to force-set a session ID cookie on every response. Default is
		// false. Enable this if you want to extend session lifetime while the user
		// is still browsing the site. Beware that the module doesn't have an absolute
		// timeout option (see https://github.com/expressjs/session/issues/557), so
		// you'd need to handle indefinite sessions manually.
		// rolling: false,

		// Secret key to sign the session ID. The signature is used
		// to validate the cookie against any tampering client-side.
		secret: SESSION_SECRET, // Secret key,
		// Settings object for the session ID cookie. The cookie holds a
		// session ID ref in the form of 's:{SESSION_ID}.{SIGNATURE}' for example:
		// s%3A9vKnWqiZvuvVsIV1zmzJQeYUgINqXYeS.nK3p01vyu3Zw52x857ljClBrSBpQcc7OoDrpateKp%2Bc

		// It is signed and URL encoded, but NOT encrypted, because session ID is
		// merely a random string that serves as a reference to the session. Even
		// if encrypted, it still maintains a 1:1 relationship with the session.
		// OWASP: cookies only need to be encrypted if they contain valuable data.
		// See https://github.com/expressjs/session/issues/468
		cookie: {
			// Path attribute in Set-Cookie header. Defaults to the root path '/'.
			path: '/',

			// Domain attribute in Set-Cookie header. There's no default, and
			// most browsers will only apply the cookie to the current domain.
			// domain: null,

			// HttpOnly flag in Set-Cookie header. Specifies whether the cookie can
			// only be read server-side, and not by JavaScript. Defaults to true.
			httpOnly: true,

			// Expires attribute in Set-Cookie header. Set with a Date object, though
			// usually maxAge is used instead. There's no default, and the browsers will
			// treat it as a session cookie (and delete it when the window is closed).
			// expires: new Date(...)

			// Preferred way to set Expires attribute. Time in milliseconds until
			// the expiry. There's no default, so the cookie is non-persistent.
			// maxAge: 1000 * 60 * 60 * 24, // Setting the cookie to expire in 24 hours.
			maxAge: 1 * 60 * 1000,

			// SameSite attribute in Set-Cookie header. Controls how cookies are sent
			// with cross-site requests. Used to mitigate CSRF. Possible values are
			// 'strict' (or true), 'lax', and false (to NOT set SameSite attribute).
			// It only works in newer browsers, so CSRF prevention is still a concern.
			sameSite: 'none',

			// Secure attribute in Set-Cookie header. Whether the cookie can ONLY be
			// sent over HTTPS. Can be set to true, false, or 'auto'. Default is false.
			secure: true,
			// HostOnly: true,
		},
	}),
);

// app middleware
app.use(
	express.urlencoded({
		extended: true,
	}),
);

app.use(express.json());
/* This is a middleware that is used to parse the body of the request. */
const corsOptions = {
	origin: [ process.env.ORIGIN_FRONTEND_SERVER ], //frontend server localhost:8080
	methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
	credentials: true, // enable set cookie
	optionsSuccessStatus: 200,
	credentials: true,
};

app.use(cors(corsOptions));

/*
 Use cookieParser and session middlewares together.
 By default Express/Connect app creates a cookie by name 'connect.sid'.But to scale Socket.io app,
 make sure to use cookie name 'jsessionid' (instead of connect.sid) use Cloud Foundry's 'Sticky Session' feature.
 W/o this, Socket.io won't work if you have more than 1 instance.
 If you are NOT running on Cloud Foundry, having cookie name 'jsessionid' doesn't hurt - it's just a cookie name.
 */
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
app.use(cookieParser(SESSION_SECRET)); // any string ex: 'keyboard cat'

// Routers
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);



app.get('/', (req, res, next) => {
	if (req.session.user) {
		res.status(200).send({
			loggedIn: true,
			user: req.session.user,
		});
	} else {
		res.status(200).send({
			loggedIn: false,
		});
	}
});
// pass variables to our templates + all requests

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
	/* Development Error Handler - Prints stack trace */
	app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

/* This is telling the server to listen to port 3001. */
https
	.createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
		{
			key: fs.readFileSync(process.env.privateKey),
			cert: fs.readFileSync(process.env.certificate),
		},
		app,
	)
	.listen(SERVERPORT, '0.0.0.0', (err) => {
		if (err) {
			throw err;
		} else {
			console.log('🚀 Server running in the', SERVERPORT);
		}
	});
