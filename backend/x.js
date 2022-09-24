//import all dependencies required
const express = require('express');
const cors = require('cors');
const crypto = require('crypto')
//set variable users as expressRouter
var users = express.Router();
//import user model
var { User } = require('../models/User');
//protect route with cors
users.use(cors())
// Creating salt for all users
let salt = 'f844b09ff50c'
// Handling user signup 
users.post('/register', (req, res) => {
  const userData = {
    //values should be those in the user model important
    username : req.body.username, 
    password: req.body.password,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  }
  User.findOne({
    //ensure username is unique, i.e the username is not already in the database
    username: req.body.username
  })
    .then(user => {
      //if the username is unique 
      if (!user) {
        let hash = crypto.pbkdf2Sync(userData.password, salt,  
        1000, 64, `sha512`).toString(`hex`);
        userData.password = hash
        //if the username is unique go ahead and create userData after hashing password and salt
          User.create(userData)
            .then(user => {
              //after successfully creating userData display registered message
              res.redirect('/login')
            })
            .catch(err => {
              //if an error occured while trying to create userData, go ahead and display the error
              res.send('error:' + err)
            })
      } else {
        //if the username is not unique, display that username is already registered with an account
        res.json({ error: 'The username ' + req.body.username + ' is registered with an account' })
      }
    })
    .catch(err => {
      //display error if an error occured
      res.send('error:' + err)
    })
})