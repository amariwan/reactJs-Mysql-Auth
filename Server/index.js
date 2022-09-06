const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
require('dotenv').config();
const saltRounds = 10;


var db = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  port: process.env.port,
  database: process.env.database,
});

db.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});

app.use(express.json());
app.use(cors());

app.post("/Register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  console.log(username, email, password);
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          "INSERT INTO users (username, email, password) VALUE (?,?,?)",
          [username, email, hash],
          (error, response) => {
            if (error) {
              console.log("error :" + error);
              res.send(error);
            }else if(err) {
              console.log("err :" + err);
              res.send(err);
            } else {
              res.send({ msg: "User successfully registered" });
            }
          }
        );
      });
    } else {
      res.send({ msg: "Email already registered" });
    }
  });
});


app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  var userOrEmail = "username";
  if (isEmail(email)) {
    userOrEmail = "email";
  } 
  db.query("SELECT * FROM users WHERE " + userOrEmail + " = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          console.log("error :" + error);
          res.send(error);
        }else if(err) {
          console.log("err :" + err);
          res.send(err);
        }
        if (response == true) {
          res.send(response)
        } else {
          res.send({ msg: "Email or password incorrect" });
        }
      });
    } else {
      res.send({ msg: "Not registered user!" });
    }
  });
});

let isEmail = ( email ) => {

  // don't remember from where i copied this code, but this works.
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if ( re.test(email) ) {
      // this is a valid email address
      // call setState({email: email}) to update the email
      // or update the data in redux store.
      return true; 
  }
  else {
      // invalid email, maybe show an error to the user.
      return false;
  }

}

app.listen(3001, () => {
  console.log("running in the 3001");
});
