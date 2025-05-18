const express = require("express");
const router = express.Router();

const {
  handleUserRegister,
  handleUserLogin,
  handleUserLogout,
} = require("../controllers/userController");

router.post("/register", handleUserRegister);
router.post("/login", handleUserLogin);
router.get("/logout", handleUserLogout);

module.exports = router;
