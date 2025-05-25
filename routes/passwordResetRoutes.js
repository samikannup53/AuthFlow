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

router.post("/start", handleEmailSubmission);
router.get("/method/:userId", verifyPasswordResetRequest, renderPasswordResetMethodPage);
router.post("/method/:userId", verifyPasswordResetRequest, handlePasswordResetMethodSelection);
router.get("/otp/:userId", verifyPasswordResetRequest, renderOtpVerificationPage);
router.post("/verifyOtp/:userId", verifyPasswordResetRequest, handleOtpVerification);
router.get("/link/:userId", renderLinkSentSuccessPage);
router.post("/verifylink/:userId", renderLinkSentSuccessPage);
router.get("/resetform/:userId", verifyPasswordResetRequest, renderPasswordResetOtpForm);
router.post("/resetform/:userId", handleNewPasswordViaOtpForm);
router.get("/success", renderPasswordResetSuccessPage);

module.exports = router;
