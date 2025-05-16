const express = require("express");
const router = express.Router();

const { handleUserRegister } = require("../controllers/userController");

router.post("/register", handleUserRegister);

module.exports = router;
