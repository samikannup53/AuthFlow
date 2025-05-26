const User = require("../models/userModel");
const PasswordReset = require("../models/passwordResetModel");
const JWT = require("jsonwebtoken");

exports.verifyPasswordResetRequest = async function (req, res, next) {
  const userId = req.params.userId;
  const resetToken = req.cookies["resetToken"];
  // Check Required Fields
  if (!resetToken || !userId) {
    return res
      .cookie("error", "Unauthorized Access", {
        maxAge: 5000,
        httpOnly: false,
        sameSite: "Strict",
      })
      .redirect("/user/reset-password");
  }
  try {
    // Validate User Existence
    const user = await User.findById(userId);
    if (!user) {
      return res
        .cookie("error", "User Not Found or Unauthorized Access", {
          maxAge: 5000,
          sameSite: "Strict",
          httpOnly: false,
        })
        .redirect("/user/reset-password");
    }
    // Construct Token Secret using User Password
    const secret = process.env.JWT_SECRET_KEY + user.password;
    // Verify Token
    let payload = null;
    try {
      payload = JWT.verify(resetToken, secret);
    } catch (error) {
      console.log("JWT Error:", error.message);

      const message =
        error.name === "TokenExpiredError"
          ? "Reset Token Expired"
          : "Invalid Reset Token";

      return res
        .cookie("error", message, {
          maxAge: 5000,
          sameSite: "Strict",
          httpOnly: false,
        })
        .redirect("/user/reset-password");
    }
    // Checking Reset Record in DB
    const resetRecord = await PasswordReset.findOne({
      userId,
      resetToken,
    });
    // Validate Reset Record
    if (!resetRecord) {
      return res
        .cookie("error", "Session expired or Unauthorized Access", {
          maxAge: 5000,
          sameSite: "Strict",
          httpOnly: false,
        })
        .redirect("/user/reset-password");
    }
    // Attach validated data to req for use in Controllers
    req.user = user;
    req.payload = payload;
    req.resetRecord = resetRecord;
    req.userId = userId;
    req.resetToken = resetToken;
    next();
  } catch (error) {
    // Error Handler
    return res
      .cookie("error", error.message, {
        maxAge: 5000,
        httpOnly: false,
        sameSite: "Strict",
      })
      .redirect("/user/reset-password/start");
  }
};

exports.verifyPasswordResetLinkRequest = async function (req, res, next) {
  const { userId, resetToken } = req.params;

  // Check Required Fields
  if (!resetToken || !userId) {
    return res.render("pages/resetLinkForm", {
      renderForm: false,
      renderAlert: true,
      renderSuccess: false,
      error: "Access Denied",
      success: null,
      alert: null,
    });
  }

  try {
    // Validate User Existence
    const user = await User.findById(userId);
    if (!user) {
      return res.render("pages/resetLinkForm", {
        renderForm: false,
        renderAlert: true,
        renderSuccess: false,
        error: "User Not Found",
        success: null,
        alert: null,
      });
    }
    // Construct Token Secret using User Password
    const secret = process.env.JWT_SECRET_KEY + user.password;
    // Verify Token
    let payload = null;
    try {
      payload = JWT.verify(resetToken, secret);
    } catch (error) {
      console.log("JWT Error:", error.message);

      const message =
        error.name === "TokenExpiredError"
          ? "Reset Link has Expired"
          : "Invalid or Tampered Reset Token";

      return res.render("pages/resetLinkForm", {
        renderForm: false,
        renderAlert: true,
        renderSuccess: false,
        error: message,
        success: null,
        alert: null,
      });
    }
    // Checking Reset Record in DB
    const resetRecord = await PasswordReset.findOne({
      userId,
      resetToken,
    });
    // Validate Reset Record
    if (!resetRecord) {
      return res.render("pages/resetLinkForm", {
        renderForm: false,
        renderAlert: true,
        renderSuccess: false,
        error: "Session Expired",
        success: null,
        alert: null,
      });
    }

    // Validate Reset Token
    if (
      resetToken !== resetRecord.resetToken ||
      Date.now() > resetRecord.resetTokenExpires
    ) {
      return res.render("pages/resetLinkForm", {
        renderForm: false,
        renderAlert: true,
        renderSuccess: false,
        error: "Session Expired or Unauthorized Access",
        success: null,
        alert: null,
      });
    }
    // Attach validated data to req for use in Controllers
    req.user = user;
    req.payload = payload;
    req.resetRecord = resetRecord;
    req.userId = userId;
    req.resetToken = resetToken;
    next();
  } catch (error) {
    console.error("Verification Error:", error);
    return res.render("pages/resetLinkForm", {
      renderForm: true,
      renderAlert: false,
      renderSuccess: false,
      error: "Something went wrong, Please try again later",
      alert: null,
      success: null,
    });
  }
};
