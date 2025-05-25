const User = require("../models/userModel");
const PasswordReset = require("../models/passwordResetModel");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Handle Email Submission
exports.handleEmailSubmission = async function (req, res) {
  const { email } = req.body;
  // Input Validation
  if (!email) {
    return res.render("pages/passwordReset", {
      alert: "Please Enter Valid E-Mail Address",
      error: "Enter Valid Email & Try Again",
      success: null,
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.render("pages/passwordReset", {
        alert: "User not Registered, Try with Registered Email",
        error: "User Not Found",
        success: null,
      });
    } else {
      const secret = process.env.JWT_SECRET_KEY + user.password;
      const resetToken = JWT.sign({ userId: user._id }, secret, {
        expiresIn: "10m",
      });
      await PasswordReset.deleteMany({ userId: user._id });
      await PasswordReset.create({ userId: user._id, resetToken });
      res
        .cookie("resetToken", resetToken, {
          httpOnly: true,
          maxAge: 10 * 60 * 1000,
          sameSite: "strict",
          secure: false,
        })
        .redirect(`/user/reset-password/method/${user._id}`);
    }
  } catch (error) {
    console.log(error.message);
    return res.render("pages/passwordReset", {
      error: "Something Went Wrong, Please Try Again",
      success: null,
      alert: error.message,
    });
  }
};

// Render Password Reset Method Page
exports.renderPasswordResetMethodPage = async function (req, res) {
  return res.render("pages/resetMethod", {
    error: null,
    success: "Authorization Success",
    alert: null,
    userId: req.user._id,
  });
};

// Handle Password Reset Method Selection
exports.handlePasswordResetMethodSelection = async function (req, res) {
  const { resetMethod } = req.body;
  const user = req.user;
  const resetRecord = req.resetRecord;
  const resetToken = req.resetToken;
  const userId = req.userId;

  // Input Validation
  if (!resetMethod || (resetMethod !== "otp" && resetMethod !== "link")) {
    return res.render("pages/resetMethod", {
      alert: "Please select your preferred Reset Method",
      error: "Method is Missing",
      success: null,
      userId: user._id,
    });
  }
  try {
    resetRecord.resetMethod = resetMethod;

    if (resetMethod === "otp") {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      resetRecord.otp = otp;
      resetRecord.otpExpires = Date.now() + 10 * 60 * 1000;
      await resetRecord.save();

      console.log("Your OTP is :", otp);

      return res.redirect(`/user/reset-password/otp/${userId}`);
    } else if (resetMethod === "link") {
      await resetRecord.save();
      resetLink = `http://localhost:8000/user/reset-password/verifylink/${userId}/${resetToken}`;
      console.log("Link Sent", resetLink);

      return res.redirect(`/user/reset-password/link/success`);
    }
  } catch (error) {
    console.log("Error:", error.message);
    return res
      .cookie("error", "Something Went Wrong. Please Try Again", {
        maxAge: 5000,
        sameSite: "Strict",
        httpOnly: false,
      })
      .redirect("/user/reset-password");
  }
};

// Render OTP Verification Page
exports.renderOtpVerificationPage = async function (req, res) {
  return res.render("pages/resetOtp", {
    error: null,
    success: "Authorization Success",
    alert: null,
    userId: req.user._id,
  });
};

// Handele OTP Verfication
exports.handleOtpVerification = async function (req, res) {
  const { otp, resendOtp, submitOtp } = req.body;
  const user = req.user;
  const userId = req.userId;
  const resetRecord = req.resetRecord;

  try {
    if (resendOtp) {
      // Generate new OTP
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      resetRecord.otp = newOtp;
      resetRecord.otpExpires = Date.now() + 10 * 60 * 1000;
      await resetRecord.save();

      console.log("New OTP generated (resend):", newOtp);

      return res.render("pages/resetOtp", {
        alert: null,
        error: null,
        success: "Resent OTP Successfully",
        userId: user._id,
      });
    }

    if (submitOtp) {
      // Input Validation
      if (!otp || otp.trim() === "") {
        return res.render("pages/resetOtp", {
          alert: "Please enter the OTP",
          error: "OTP Required",
          success: null,
          userId: user._id,
        });
      }
      // OTP Expiry Validation
      if (
        !resetRecord.otp ||
        !resetRecord.otpExpires ||
        Date.now() > resetRecord.otpExpires
      ) {
        return res.render("pages/resetOtp", {
          alert: "Your OTP has expired. Please request a new one.",
          error: "OTP Expired",
          success: null,
          userId,
        });
      }
      // Check OTP Match with DB
      if (otp !== resetRecord.otp) {
        return res.render("pages/resetOtp", {
          alert: "OTP Verification Failed, Please enter valid OTP",
          error: "OTP Mismatch",
          success: null,
          userId: user._id,
        });
      }
      // Clearing OTP Records
      resetRecord.otp = null;
      resetRecord.otpExpires = null;
      await resetRecord.save();
      return res.redirect(`/user/reset-password/resetform/${userId}`);
    }
  } catch (error) {
    console.log("Error:", error.message);
    return res
      .cookie("error", "Something Went Wrong. Please Try Again", {
        maxAge: 5000,
        sameSite: "Strict",
        httpOnly: false,
      })
      .redirect("/user/reset-password");
  }
};

// Render Link sent Success Page
exports.renderLinkSentSuccessPage = function (req, res) {
  res.clearCookie("resetToken");
  res.clearCookie("error");
  res.clearCookie("success");
  res.render("pages/resetLink");
};

// Handle Reset Link Sent Success
exports.handleResetLinkSentSuccess = async function (req, res) {};

// Render OTP Based Password Reset Form
exports.renderPasswordResetOtpForm = async function (req, res) {
  res.render("pages/resetOtpForm", {
    error: null,
    success: "Authorization Success",
    alert: null,
    userId: req.user._id,
  });
};

// Handle New Password Submission Via OTP Form
exports.handleNewPasswordViaOtpForm = async function (req, res) {
  const { newPassword, confirmNewPassword } = req.body;
  const user = req.user;
  const resetRecord = req.resetRecord;

  // Input Validation
  if (!newPassword || newPassword.length < 8) {
    return res.render("pages/resetOtpForm", {
      alert: "Please Create New Password with Minimum 8 Characters",
      showSuccess: false,
      error: "Weak Password",
      success: null,
      userId: user._id,
    });
  }
  if (!confirmNewPassword) {
    return res.render("pages/resetOtpForm", {
      alert: "Please Confirm Your New Password",
      showSuccess: false,
      error: "Missing Password Confirmation",
      success: null,
      userId: user._id,
    });
  }
  if (newPassword !== confirmNewPassword) {
    return res.render("pages/resetOtpForm", {
      alert: "Passwords Do Not Match, Please Try Again",
      showSuccess: false,
      error: "Password Mismatch",
      success: null,
      userId: user._id,
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await PasswordReset.deleteOne({ _id: resetRecord._id });

    res.clearCookie("resetToken");
    return res.redirect("/user/reset-password/success");
  } catch (error) {
    console.log("Error:", error.message);
    return res
      .cookie("error", "Something Went Wrong. Please Try Again", {
        maxAge: 5000,
        sameSite: "Strict",
        httpOnly: false,
      })
      .redirect("/user/reset-password");
  }
};

// Render OTP Based Reset Success Page
exports.renderResetSuccessViaOtpPage = async function (req, res) {
  res.clearCookie("resetToken");
  res.clearCookie("error");
  res.clearCookie("success");
  res.render("pages/resetSuccess");
};

// Render Link Based Password Reset Form
exports.renderPasswordResetLinkFormPage = async function (req, res) {
  res.render('pages/resetLinkForm')
};

// Handle New Password Submission via Link Form
exports.handleNewPasswordViaLinkForm = async function (req, res) {
  res.send("Link Submission Ok"); // For Testing
};

// Render Link Based Reset Success Page
exports.renderResetSuccessViaLinkPage = async function (req, res) {
  res.send("Link Based Reset Success");
};
