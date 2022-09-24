/* This is importing the modules that we need to use in our application. */
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors'); //  A middleware that is used to parse the body of the request.
const app = express();
require('dotenv').config();
const SERVERPORT = process.env.SERVERPORT;
const SESSION_SECRET = process.env.SESSION_SECRET;



const requestTime = function (req, res, next) {
	req.requestTime = Date.now()
	next()
}

app.use(requestTime)
//session middleware
app.use(
	session({
		/* This is a secret key that is used to encrypt the session. */
		name: "session-id",
		secret: SESSION_SECRET, // Secret key,
		resave: false,
		saveUninitialized: true,
		cookie: {
			//secure: true,
			//httpOnly: false, // This is a security feature that prevents the cookie from being accessed by JavaScript.
			maxAge: 1000 * 60 * 60 * 24 // Setting the cookie to expire in 24 hours.
		}
	})
);



// app middleware
app.use(express.json());
/* This is a middleware that is used to parse the body of the request. */
app.use(
	cors(
		//   {
		//   origin: ['http://localhost:3001'],
		//   methods: ['GET', 'POST'],
		//   credentials: true
		// }
	)
);

/*
 Use cookieParser and session middlewares together.
 By default Express/Connect app creates a cookie by name 'connect.sid'.But to scale Socket.io app,
 make sure to use cookie name 'jsessionid' (instead of connect.sid) use Cloud Foundry's 'Sticky Session' feature.
 W/o this, Socket.io won't work if you have more than 1 instance.
 If you are NOT running on Cloud Foundry, having cookie name 'jsessionid' doesn't hurt - it's just a cookie name.
 */
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json())
app.use(cookieParser());

// app.all('*', (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   // res.write(req.sessionID);
//   // let responseText = 'Hello World!<br>'
//   // responseText += `<small>Requested at: ${req.requestTime}</small>`
//   // res.send(responseText)
//   res.send(JSON.stringify(req.sessionID));
//   res.end()
// });

// Routers
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

app.get('/set', function (req, res) {
	req.session.user = {
		name: 'Aland'
	};
	res.send('Session set');
});

app.get('/get', function (req, res) {
	res.send(req.session.user);
});

// error handler
app.use((err, req, res, next) => {
	res.status(400).send(err.message)
})

/* This is telling the server to listen to port 3001. */
app.listen(SERVERPORT, (err) => {
	if (err) {
		throw err;
	} else {
		console.log('🚀 Server running in the', SERVERPORT);
	}
});