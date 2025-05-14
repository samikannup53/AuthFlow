function indexPage(req, res) {
  res.render("pages/index");
}

function userLogin(req, res) {
  res.render("pages/login");
}

function userRegister(req, res) {
  res.render("pages/register");
}

module.exports = { indexPage, userLogin, userRegister };
