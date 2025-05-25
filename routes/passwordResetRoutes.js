const express = require("express");
const router = express.Router();
const { verifyPasswordResetRequest } = require("../middlewares/requestAuth");

const {
  handleEmailSubmission,
  renderPasswordResetMethodPage,
  handlePasswordResetMethodSelection,
  renderOtpVerificationPage,
  renderLinkSentSuccessPage,
  handleOtpVerification,
  renderPasswordResetOtpForm,
  handleNewPasswordViaOtpForm,
  renderPasswordResetSuccessPage,
} = require("../controllers/passwordResetController");

router.post("/", handleEmailSubmission);
router.get(
  "/method/:userId",
  verifyPasswordResetRequest,
  renderPasswordResetMethodPage
);
router.post("/method/:userId", handlePasswordResetMethodSelection);
router.get(
  "/method/otp/:userId",
  verifyPasswordResetRequest,
  renderOtpVerificationPage
);
router.post("/verifyOtp/:userId", handleOtpVerification);
router.get("/method/link/:userId", renderLinkSentSuccessPage);
router.get(
  "/form/:userId",
  verifyPasswordResetRequest,
  renderPasswordResetOtpForm
);
router.post("/form/:userId", handleNewPasswordViaOtpForm);
router.get("/success", renderPasswordResetSuccessPage);

module.exports = router;
