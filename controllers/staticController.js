// Render Home Page
exports.renderHomePage = function (req, res) {
  res.render("pages/index", {
    showSuccess: false,
    alert: null,
    error: null,
    success: null,
  });
};

// Render Login Page
exports.renderLoginPage = function (req, res) {
  res.render("pages/login", {
    showSuccess: false,
    alert: null,
    error: null,
    success: null,
  });
};

// Render Register Page
exports.renderRegisterPage = function (req, res) {
  res.render("pages/register", {
    showSuccess: false,
    alert: null,
    error: null,
    success: null,
  });
};
