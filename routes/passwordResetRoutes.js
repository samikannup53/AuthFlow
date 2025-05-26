const express = require("express");
const router = express.Router();
const { 
  verifyPasswordResetRequest, 
  verifyPasswordResetLinkRequest 
} = require("../middlewares/requestAuth");

const {
  handleEmailSubmission,
  renderPasswordResetMethodPage,
  handlePasswordResetMethodSelection,
  renderOtpVerificationPage,
  renderLinkSentSuccessPage,
  handleOtpVerification,
  renderPasswordResetOtpForm,
  handleNewPasswordViaOtpForm,
  renderResetSuccessViaOtpPage,
  renderPasswordResetLinkFormPage,
  handleNewPasswordViaLinkForm,  
} = require("../controllers/passwordResetController");

router.post("/start", handleEmailSubmission);

// Choose Reset Method
router.get("/method/:userId", verifyPasswordResetRequest, renderPasswordResetMethodPage);
router.post("/method/:userId", verifyPasswordResetRequest, handlePasswordResetMethodSelection);

// OTP Flow
router.get("/otp/:userId", verifyPasswordResetRequest, renderOtpVerificationPage);
router.post("/verifyOtp/:userId", verifyPasswordResetRequest, handleOtpVerification);

// Link Flow
router.get("/link/:userId", renderLinkSentSuccessPage);

// Password Reset Form via Link Method
router.get("/verifylink/:userId/:resetToken", verifyPasswordResetLinkRequest, renderPasswordResetLinkFormPage);
router.post("/verifylink/:userId/:resetToken", verifyPasswordResetLinkRequest, handleNewPasswordViaLinkForm);

// Password Reset Form via OTP Method
router.get("/resetform/:userId", verifyPasswordResetRequest, renderPasswordResetOtpForm);
router.post("/resetform/:userId", verifyPasswordResetRequest, handleNewPasswordViaOtpForm);

// FInal Success Screen
router.get("/success", renderResetSuccessViaOtpPage);

module.exports = router;
