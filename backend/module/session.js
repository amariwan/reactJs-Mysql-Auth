const getSession = (userId) =>{
  db.query('select * from sessions_users (userId) VALUE (?)',[userId],(error, response) => {
  console.log(response);
    })
}

const setSession = () =>{
  db.query('INSERT INTO sessions_users (name, lastname, username, email, password ) VALUE (?,?,?,?,?)',[name, lastname, username, email, password],(error, response) => {
  
    })  
  
}

const compareSession = () =>{
  db.query('select * from sessions_users (userId) VALUE (?)',[userId],(error, response) => {
    console.log(response);
      })
}

const destroySession = (session_id) =>{
  db.query('select * from sessions_users (userId) VALUE (?)',[userId],(error, response) => {
    console.log(response);
      })
}
module.exports = {getSession, setSession, compareSession, destroySession};