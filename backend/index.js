/* This is importing the modules that we need to use in our application. */
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
require('dotenv').config();

/* This is a middleware that is used to parse the body of the request. */
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(
	cors({
		origin: [ 'http://localhost:3001' ],
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

// Routers
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

/* This is telling the server to listen to port 3001. */
app.listen(3001, () => {
	console.log('running in the 3001');
});
