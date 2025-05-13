const express = require("express");
const router = express.Router();

const { userLogin, userRegister } = require("../controllers/userController");

router.get("/login", userLogin);
router.get("/register", userRegister);

module.exports = router;
