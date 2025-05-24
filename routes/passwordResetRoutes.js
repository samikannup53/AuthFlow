const express = require("express");
const router = express.Router();

const {
  handleEmailSubmission,
  renderPasswordResetMethodPage,
} = require("../controllers/passwordResetController");

router.post("/", handleEmailSubmission);
router.get("/method/:userId", renderPasswordResetMethodPage);
router.post("/method/:userId", renderPasswordResetMethodPage);

module.exports = router;
