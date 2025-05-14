const express = require("express");
const router = express.Router();

const {
  indexPage,
  userLogin,
  userRegister,
} = require("../controllers/staticController");

router.get("/", indexPage);
router.get("/login", userLogin);
router.get("/register", userRegister);

module.exports = router;
