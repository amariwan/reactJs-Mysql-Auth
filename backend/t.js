const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const http = require('http');

const app = express();
const PORT = 4000;

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(cookieParser());

app.get('/set',function(req, res){
    req.session.user = { name:'Aland' };
    res.send('Session set');
});

app.get('/get',function(req, res){
    res.send(req.session.user);
});

http.createServer(app).listen(3000, function(){
    console.log('Express server listening on port 3000');
});