const express = require("express");
const router = express.Router();

const {
  handleEmailSubmission,
  renderPasswordResetMethodPage,
  handlePasswordResetMethodSelection,
  renderOtpVerificationPage,
  renderLinkSentSuccessPage,
} = require("../controllers/passwordResetController");

router.post("/", handleEmailSubmission);
router.get("/method/:userId", renderPasswordResetMethodPage);
router.post("/method/:userId", handlePasswordResetMethodSelection);
router.get("/method/otp/:userId", renderOtpVerificationPage);
router.get("/method/link/:userId", renderLinkSentSuccessPage);

module.exports = router;
