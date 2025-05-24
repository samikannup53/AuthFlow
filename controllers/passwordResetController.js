const User = require("../models/userModel");
const PasswordReset = require("../models/passwordResetModel");
const JWT = require("jsonwebtoken");

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
  const resetToken = req.cookies["resetToken"];
  if (!resetToken) {
    return res
      .cookie("error", "Unauthorized Access", {
        maxAge: 5000,
        sameSite: "Strict",
        httpOnly: false,
      })
      .redirect("/user/reset-password");
  }

  try {
    const userId = req.params.userId;
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

    const secret = process.env.JWT_SECRET_KEY + user.password;
    let payload = null;
    try {
      payload = JWT.verify(resetToken, secret);
    } catch (error) {
      console.log("JWT Error:", error.message);
      return res
        .cookie("error", "Invalid or Expired Token", {
          maxAge: 5000,
          sameSite: "Strict",
          httpOnly: false,
        })
        .redirect("/user/reset-password");
    }

    const resetRecord = await PasswordReset.findOne({
      userId: payload.userId,
      resetToken,
    });

    if (!resetRecord) {
      return res
        .cookie("error", "Session expired or Unauthorized Access", {
          maxAge: 5000,
          sameSite: "Strict",
          httpOnly: false,
        })
        .redirect("/user/reset-password");
    }

    res.render("pages/resetMethod", {
      error: null,
      success: null,
      alert: null,
    });
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


