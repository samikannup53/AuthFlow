const express = require("express");
const router = express.Router();

const {
  handlePasswordReset,
} = require("../controllers/passwordResetController");

router.post("/", handlePasswordReset);

module.exports = router;
