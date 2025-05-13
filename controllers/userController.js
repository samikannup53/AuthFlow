function userLogin(req, res) {
  res.send("User Login Page");
}

function userRegister(req, res) {
  res.send("User Register Page");
}

module.exports = { userLogin, userRegister };
