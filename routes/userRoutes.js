const express = require("express");
const router = express.Router();

const {
  handleUserRegister,
  handleUserLogin,
  handleUserLogout,
  handleForgotPassword,
} = require("../controllers/userController");

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
router.get("/logout", handleUserLogout);
router.get("/forgotPassword", handleForgotPassword);

module.exports = router;
