const clearAllcookie = (req)=> {
  const cookies = req.cookies;

  for (let prop in cookies) {   
    res.clearCookie(prop); //Or res.cookie(prop, '', {expires: new Date(0)});
  }
}

module.exports = clearAllcookie;