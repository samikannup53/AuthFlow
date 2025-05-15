const express = require("express");
const router = express.Router();

const {
  renderHomePage,
  renderLoginPage,
  renderRegisterPage,
} = require("../controllers/staticController");

router.get("/", renderHomePage);
router.get("/login", renderLoginPage);
router.get("/register", renderRegisterPage);

module.exports = router;
