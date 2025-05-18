const User = require("../models/userModel");
const { generateToken } = require("../utils/auth");

// User Registration
exports.handleUserRegister = async function (req, res) {
  const { userName, email, password, confirmPassword } = req.body;
  // Form Validation
  if (!userName) {
    return res.render("pages/register", {
      alert: "Please Enter Your Full Name",
      showSuccess: false,
      error: "Something Went Wrong, Please Try Again",
      success: null,
    });
  }
  if (!email) {
    return res.render("pages/register", {
      alert: "Please Enter Valid E-Mail Address",
      showSuccess: false,
      error: "Something Went Wrong, Please Try Again",
      success: null,
    });
  }
  if (!password) {
    return res.render("pages/register", {
      alert: "Please Create Password",
      showSuccess: false,
      error: "Something Went Wrong, Please Try Again",
      success: null,
    });
  }
  if (!confirmPassword) {
    return res.render("pages/register", {
      alert: "Please Confirm Your Password",
      showSuccess: false,
      error: "Something Went Wrong, Please Try Again",
      success: null,
    });
  }
  if (password !== confirmPassword) {
    return res.render("pages/register", {
      alert: "Passwords Do Not Match, Please Try Again",
      showSuccess: false,
      error: "Something Went Wrong, Please Try Again",
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
    // New User Create
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
      error: "Something Went Wrong, Please Try Again",
      showSuccess: false,
      success: null,
      alert: error.message,
    });
  }
};

// User Login
exports.handleUserLogin = async function (req, res) {
  const { email, password } = req.body;

  //Form Validation
  if (!email) {
    return res.render("pages/login", {
      alert: "Please Enter Valid E-Mail Address",
      error: "Something Went Wrong, Please Try Again",
      success: null,
    });
  }
  if (!password) {
    return res.render("pages/login", {
      alert: "Please Enter Password",
      error: "Something Went Wrong, Please Try Again",
      success: null,
    });
  }

  // User Login Logic
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("pages/login", {
        alert: "User Not Registered, Kindly Register Before Login",
        error: "User Not Found",
        success: null,
      });
    }
    if (user.password !== password) {
      return res.render("pages/login", {
        alert: "Incorrect Password",
        error: "Invalid Credentials, Please Try Again",
        success: null,
      });
    }
    generateToken(user, (error, token) => {
      if (error) {
        console.error("Token generation error:", error);
        return res.render("pages/login", {
          alert: "Login Succeeded but Token Creation Failed",
          error: "Token Error",
          success: null,
        });
      } else {
        console.log(token);
        return res.cookie("userAuthToken", token).redirect("/user/dashboard");
      }
    });
  } catch (error) {
    console.log(error.message);
    return res.render("pages/login", {
      error: "Something Went Wrong, Please Try Again",
      success: null,
      alert: error.message,
    });
  }
};
