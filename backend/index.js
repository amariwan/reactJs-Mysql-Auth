/* This is importing the modules that we need to use in our application. */
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const cors = require('cors'); //  A middleware that is used to parse the body of the request.
const app = express();
const SERVERPORT = process.env.SERVERPORT;


// app middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const SESSION_SECRET = process.env.SESSION_SECRET;

app.use(
    session({
        //store: "",
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: false,
            maxAge: 1000 * 60 * 10,
        },
    }));

/* This is a middleware that is used to parse the body of the request. */
app.use(
    cors({
        origin: ['http://localhost:3001'],
        methods: ['GET', 'POST'],
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
    console.log('running in the ${SERVERPORT}');
});