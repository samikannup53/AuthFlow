function indexPage(req, res) {
  res.render("pages/index", { title: "AuthFlow | Home" });
}

function userLogin(req, res) {
  res.render("pages/login", { title: "AuthFlow | Login" });
}

function userRegister(req, res) {
  res.render("pages/register", { title: "AuthFlow | Register" });
}

module.exports = { indexPage, userLogin, userRegister };
