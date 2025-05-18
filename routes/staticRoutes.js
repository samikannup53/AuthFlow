const express = require("express");
const router = express.Router();

const {
  renderHomePage,
  renderLoginPage,
  renderRegisterPage,
} = require("../controllers/staticController");

router.get("/", renderHomePage);
router.get("/user/login", renderLoginPage);
router.get("/user/register", renderRegisterPage);

module.exports = router;
