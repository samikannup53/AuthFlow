const express = require("express");
const router = express.Router();

const {
  handleEmailSubmission,
  renderPasswordResetMethodPage,
} = require("../controllers/passwordResetController");

router.post("/", handleEmailSubmission);
router.get("/method/:id/:token", renderPasswordResetMethodPage);

module.exports = router;
