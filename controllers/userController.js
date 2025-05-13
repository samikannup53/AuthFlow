function userLogin(req, res) {
  res.render("pages/login");
}

function userRegister(req, res) {
  res.render("pages/register");
}

module.exports = { userLogin, userRegister };
