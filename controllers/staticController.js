// Render Home Page
exports.renderHomePage = function (req, res) {
  res.render("pages/index");
};

// Render Login Page
exports.renderLoginPage = function (req, res) {
  res.render("pages/login");
};

// Render Register Page
exports.renderRegisterPage = function (req, res) {
  res.render("pages/register");
};
