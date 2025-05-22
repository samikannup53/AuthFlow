const express = require("express");
const router = express.Router();

const {
  handleUserRegister,
  handleUserLogin,
  handleUserLogout,
} = require("../controllers/userController");
const {
  handlePasswordReset,
} = require("../controllers/passwordResetController");

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
router.get("/logout", handleUserLogout);
router.post("/reset-password", handlePasswordReset);

module.exports = router;
