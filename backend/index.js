/* This is importing the modules that we need to use in our application. */
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
var address = require('address');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	})
);

/* This is a middleware that is used to parse the body of the request. */
app.use(
	cors({
		origin: [ 'http://localhost:3001' ],
		methods: [ 'GET', 'POST' ],
		credentials: true
	})
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));

// Routers
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

address(function(err, addrs) {
	console.log(addrs.ip, addrs.ipv6, addrs.mac);
	// '192.168.0.2', 'fe80::7aca:39ff:feb0:e67d', '78:ca:39:b0:e6:7d'
});

/* This is telling the server to listen to port 3001. */
app.listen(3001, () => {
	console.log('running in the 3001');
});
