const express = require("express");
const router = express.Router();

const {
  handleEmailSubmission,
  renderPasswordResetMethodPage,
  handlePasswordResetMethodSelection,
  renderOtpVerificationPage,
  renderLinkSentSuccessPage,
  handleOtpVerification,
} = require("../controllers/passwordResetController");

router.post("/", handleEmailSubmission);
router.get("/method/:userId", renderPasswordResetMethodPage);
router.post("/method/:userId", handlePasswordResetMethodSelection);
router.get("/method/otp/:userId", renderOtpVerificationPage);
router.post("/verifyOtp/:userId", handleOtpVerification);
router.get("/method/link/:userId", renderLinkSentSuccessPage);

module.exports = router;
