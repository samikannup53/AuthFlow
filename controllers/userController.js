const User = require("../models/userModel");

exports.handleUserRegister = async function (req, res) {
  // Destructuring Body
  const { userName, email, password, confirmPassword } = req.body;

  // Form Validation
  if (!userName) {
    return res.render("pages/register", {
      alert: "Please Enter Your Full Name",
      showSuccess: false,
      error: null,
      success: null,
    });
  }
  if (!email) {
    return res.render("pages/register", {
      alert: "Please Enter Valid E-Mail Address",
      showSuccess: false,
      error: null,
      success: null,
    });
  }
  if (!password) {
    return res.render("pages/register", {
      alert: "Please Create Password",
      showSuccess: false,
      error: null,
      success: null,
    });
  }
  if (!confirmPassword) {
    return res.render("pages/register", {
      alert: "Please Confirm Your Password",
      showSuccess: false,
      error: null,
      success: null,
    });
  }
  if (password !== confirmPassword) {
    return res.render("pages/register", {
      alert: "Password Do Not Match, Please Try Again",
      showSuccess: false,
      error: null,
      success: null,
    });
  }

  // User Creation
  try {
    // Existing User Check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("pages/register", {
        alert: "An Account with this Email already Exists",
        error: "User Already Exist",
        showSuccess: false,
        success: null,
      });
    }

    const newUser = new User({ userName, email, password });
    await newUser.save();
    return res.render("pages/register", {
      success: "User Created Successfully !!!",
      userName,
      showSuccess: true,
      error: null,
      alert: null,
    });
  } catch (error) {
    console.log(error.message);
    return res.render("pages/register", {
      error: "Something Went Wrong",
      showSuccess: false,
      success: null,
      alert: error.message,
    });
  }
};
