const User = require("../models/userModel");
const JWT = require("jsonwebtoken");

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
      const token = JWT.sign({ id: user._id }, secret, {
        expiresIn: "10m",
      });
      console.log(token);
      res.redirect(`/user/reset-password/method/${user._id}/${token}`);
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
  const { id, token } = req.params;
  res.render("pages/resetMethod", {
    id,
    token,
    error: null,
    alert: null,
    success: null,
  });
};
