const express = require("express");
const router = express.Router();

const {
  renderHomePage,
  renderLoginPage,
  renderRegisterPage,
  renderPasswordResetPage,
} = require("../controllers/staticController");

router.get("/", renderHomePage);
router.get("/user/login", renderLoginPage);
router.get("/user/register", renderRegisterPage);
router.get("/user/reset-password", renderPasswordResetPage);

module.exports = router;
