const db = require('../database/index');


const getSessionOnDB = (userId) => {
  db.query('select * from session_users (userId) VALUE (?)', [userId], (error, response) => {
    console.log(response);
  })
}

const creatSessionOnDB = (req) => {
  const userId = req.session.user.userID;
  const session_id = req.sessionID;
  const ip_address = String(req.connection.remoteAddress);
  const expires = 127001;
  var data = JSON.parse(JSON.stringify(req.sessionStore.sessions));
  data = JSON.stringify(data);
  console.log("userID: " + userId, "session_id: " + session_id, "ip_address: " + ip_address, "expires: " + expires, "data: " + data);
  db.query('INSERT INTO session_users (userId, session_id, ip_address, expires, data) VALUE (?,?,?,?,?)', [userId, session_id, ip_address, expires, data], (error, response) => {
    console.log(response);
    console.log(error);
  })

}


const setSessionOnDB = (req) => {
  if (getSessionOnDB(req.session.userID)) return;

  const userId = req.session.user.userID;
  const session_id = req.sessionID;
  const ip_address = String(req.connection.remoteAddress);
  const expires = 127001;
  var data = JSON.parse(JSON.stringify(req.sessionStore.sessions));
  data = JSON.stringify(data);
  console.log("userID: " + userId, "session_id: " + session_id, "ip_address: " + ip_address, "expires: " + expires, "data: " + data);
  db.query('INSERT INTO session_users (userId, session_id, ip_address, expires, data) VALUE (?,?,?,?,?)', [userId, session_id, ip_address, expires, data], (error, response) => {
    console.log(response);
    console.log(error);
  })

}

const compareSessionOnDB = (reqSession) => {
  db.query('select * from session_users (userId) VALUE (?)', [reqSession], (error, response) => {
    console.log(response);
  })
}

const destroySessionOnDB = (sessionId) => {
  db.query('DELETE FROM session_users WHERE session_id = ?', [sessionId], (error, response) => {
    console.log(response);
    console.log(error);

  })
}
module.exports = {
  getSessionOnDB,
  setSessionOnDB,
  creatSessionOnDB,
  compareSessionOnDB,
  destroySessionOnDB
};