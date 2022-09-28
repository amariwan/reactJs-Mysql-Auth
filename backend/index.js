/* This is importing the modules that we need to use in our application. */
const https = require("https");
const fs = require("fs");
const express = require('express');
// Sessions can be stored server-side (ex: user auth) or client-side
// (ex: shopping cart). express-session saves sessions in a store, and
// NOT in a cookie. To store sessions in a cookie, use cookie-session.
const session = require('express-session')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors'); //  A middleware that is used to parse the body of the request.
const app = express();
require('dotenv').config();
const SERVERPORT = process.env.SERVERPORT;
const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(cors({ credentials: true, origin: true }));

const requestTime = function (req, res, next) {
	req.requestTime = Date.now()
	next()
}

app.use(requestTime);
//session middleware
app.use(
	session({
		/* This is a secret key that is used to encrypt the session. */

		// Name for the session ID cookie. Defaults to 'connect.sid'.
		name: "session_id",

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
			// path: '/',

			// Domain attribute in Set-Cookie header. There's no default, and
			// most browsers will only apply the cookie to the current domain.
			// domain: null,

			// HttpOnly flag in Set-Cookie header. Specifies whether the cookie can
			// only be read server-side, and not by JavaScript. Defaults to true.
			// httpOnly: true,

			// Expires attribute in Set-Cookie header. Set with a Date object, though
			// usually maxAge is used instead. There's no default, and the browsers will
			// treat it as a session cookie (and delete it when the window is closed).
			// expires: new Date(...)

			// Preferred way to set Expires attribute. Time in milliseconds until
			// the expiry. There's no default, so the cookie is non-persistent.
			maxAge: 1000 * 60 * 60 * 24, // Setting the cookie to expire in 24 hours.
			// maxAge: 5 * 60 * 1000, // Setting the cookie to expire in 24 hours.

			// SameSite attribute in Set-Cookie header. Controls how cookies are sent
			// with cross-site requests. Used to mitigate CSRF. Possible values are
			// 'strict' (or true), 'lax', and false (to NOT set SameSite attribute).
			// It only works in newer browsers, so CSRF prevention is still a concern.
			// sameSite: true,

			// Secure attribute in Set-Cookie header. Whether the cookie can ONLY be
			// sent over HTTPS. Can be set to true, false, or 'auto'. Default is false.
			// secure: false,
			// HostOnly: true,
			// HttpOnly: true // This is a security feature that prevents the cookie from being accessed by JavaScript.
		}
	})
);



// app middleware
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
/* This is a middleware that is used to parse the body of the request. */
app.use(cors({
	// origin:[process.env.ORIGIN],//frontend server localhost:8080
	methods:['GET','POST','PUT','DELETE'],
	credentials: true // enable set cookie
 }));

app.use(function(req, res, next) {

	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	// res.header("Access-Control-Allow-Origin", process.env.ORIGIN);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-   Type, Accept, Authorization");
	next();
	});

/*
 Use cookieParser and session middlewares together.
 By default Express/Connect app creates a cookie by name 'connect.sid'.But to scale Socket.io app,
 make sure to use cookie name 'jsessionid' (instead of connect.sid) use Cloud Foundry's 'Sticky Session' feature.
 W/o this, Socket.io won't work if you have more than 1 instance.
 If you are NOT running on Cloud Foundry, having cookie name 'jsessionid' doesn't hurt - it's just a cookie name.
 */
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser(SESSION_SECRET)); // any string ex: 'keyboard cat'


// Routers
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.get('/', (req, res) => {
	// A new uninitialized session is created for each request (but not
	// persisted to the store if saveUninitialized is false). It's
	// automatically serialized to JSON and can look something like
	/*
	  Session {
	    cookie: {
	      path: '/',
	      _expires: 2018-11-18T01:33:01.043Z,
	      originalMaxAge: 7200000,
	      httpOnly: true,
	      sameSite: true,
	      secure: false
	    }
	  }
	*/
	console.log(req.session)

	// You can also access the cookie object above directly with
	console.log(req.session.cookie)

	// Beware that express-session only updates req.session on req.end(),
	// so the values below are stale and will change after you read them
	// (assuming that you roll sessions with resave and rolling).
	console.log(req.session.cookie.expires) // date of expiry
	console.log(req.session.cookie.maxAge) // milliseconds left until expiry

	// Unless a valid session ID cookie is sent with the request,
	// the session ID below will be different for each request.
	console.log(req.session.id) // ex: VdXZfzlLRNOU4AegYhNdJhSEquIdnvE-

	// Same as above. Alphanumeric ID that gets written to the cookie.
	// It's also the SESSION_ID portion in 's:{SESSION_ID}.{SIGNATURE}'.
	console.log(req.sessionID)

})


app.get('/', function(req,res){
	redis.get('sess:' + req.session.id, function(err, result){
			console.log("Get session: " + util.inspect(JSON.parse(result),{ showHidden: true, depth: null }));
	});
	if ((req.session.user_role == "user")) {
				console.log("Logged in");
	} else {
			console.log("Logged out");
	}
});

app.get('/set', (req, res) => {
	req.session.user = {
		name: 'Aland',
		lastname: "Mariwan"
	};
	res.send(req.sessionID);
});

app.get('/get', (req, res) => {
	res.send(req.sessionID);
	console.log(req.sessionStore.sessions);
});
app.get('/det', (req, res) => {
	req.session.destroy();
	res.send(req.session.user);
});
// error handler
app.use((err, req, res, next) => {
	res.status(400).send(err.message)
})


/* This is telling the server to listen to port 3001. */
https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("./https_key/key.pem"),
      cert: fs.readFileSync("./https_key/cert.pem"),
    },
    app
  ).listen(SERVERPORT, (err) => {
	if (err) {
		throw err;
	} else {
		console.log('🚀 Server running in the', SERVERPORT);
	}
});