const express = require('express');
const router = express.Router(); // Creating a router object.
const db = require('../database/index');
const bcrypt = require('bcrypt'); // A library that is used to hash passwords.
const {
    isEmail,
    checkUsername
} = require('../module/check_userOrEmail')
    /* The number of rounds to use when generating a salt. */
const saltRounds = 10;


// test func
router.get('/', (req, res) => {
    console.log(req);
    console.log('/');
});

/* This is a post request that is used to register a user. */
router.post('/Register', (req, res) => {
    /* This is getting the data from the request body. */
    const username = req.body.username.toLowerCase();
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    console.log(username, email, password);

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
    if (password.length < 8) return res.send({
        msg: 'Password must be at least 8 characters long.'
    });

    /* This is checking if the username is already registered. */
    db.query('SELECT * FROM users WHERE username = ?', [username], function(err, result) {
        if (err) throw err;
        if (result.length == 0) {
            /* This is checking if the Email is already registered. */
            db.query('SELECT * FROM users WHERE email = ?', [email], function(err, result) {
                if (err) throw err;
                if (result.length == 0) {
                    bcrypt.hash(password, saltRounds, (err, hash) => {
                        /* This is inserting the data into the database. */
                        db.query(
                            'INSERT INTO users (username, email, password) VALUE (?,?,?)', [username, email, hash],
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
                    });
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
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
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
                    console.log(response);
                    res.send(response);
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



/* This is exporting the router object. */
module.exports = router;