const db = require('../database/index');

const creatSessionOnDB = (req) => {
  const userId = req.session.user.userID;
  const session_id = req.session_id;
  const ip_address = String(req.connection.remoteAddress);
  const expires = 127001;
  var data = JSON.parse(JSON.stringify(req.sessionStore.sessions));
  data = JSON.stringify(data);
  // console.log("userID: " + userId, "session_id: " + session_id, "ip_address: " + ip_address, "expires: " + expires, "data: " + data);
  db.query('INSERT INTO session_users (userId, session_id, ip_address, expires, data) VALUE (?,?,?,?,?)', [userId, session_id, ip_address, expires, data], (error, response) => {
    if (error) return error;
    if (response.length > 0) return response;
  })
  return false;
}

const getSessionOnDB = (userId) => {
  db.query('SELECT * FROM session_users (userId) VALUE (?)', [userId], (error, response) => {
    if (error) return error;
    if (response.length > 0) return response;
  })
  return false;
}

const setSessionOnDB = (req) => {
  if (getSessionOnDB(req.session.userID)) return;
  const userId = req.session.user.userID;
  const session_id = req.sessionID;
  const ip_address = String(req.connection.remoteAddress);
  const expires = 127001;
  var data = JSON.parse(JSON.stringify(req.sessionStore.sessions));
  data = JSON.stringify(data);
  // console.log("userID: " + userId, "session_id: " + session_id, "ip_address: " + ip_address, "expires: " + expires, "data: " + data);
  if (getSessionOnDB(userId) < 0) return;
  db.query('UPDATE session_users (userId, session_id, ip_address, expires, data) VALUE (?,?,?,?,?)', [userId, session_id, ip_address, expires, data], (error, response) => {
    if (error) return error;
    if (response.length > 0) return response;
  })
  return false;
}

const compareSessionOnDB = (reqSession) => {
  db.query('SELECT * FROM session_users (userId) VALUE (?)', [reqSession], (error, response) => {
    if (error) return error;
    if (response.length > 0) return response;
  })
  return false;
}

const destroySessionOnDB = (userId) => {
  db.query('DELETE FROM session_users WHERE userId = ?', [userId], (error, response) => {
    if (error) return error;
  })
  return false;
}

module.exports = {
  creatSessionOnDB,
  getSessionOnDB,
  setSessionOnDB,
  compareSessionOnDB,
  destroySessionOnDB
};