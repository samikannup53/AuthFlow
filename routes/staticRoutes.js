const express = require("express");
const router = express.Router();

const {
  renderHomePage,
  renderLoginPage,
  renderRegisterPage,
  renderForgotPasswordPage,
} = require("../controllers/staticController");

router.get("/", renderHomePage);
router.get("/user/login", renderLoginPage);
router.get("/user/register", renderRegisterPage);
router.get("/user/forgotPassword", renderForgotPasswordPage);

module.exports = router;
