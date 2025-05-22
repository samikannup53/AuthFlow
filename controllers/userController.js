const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { generateToken } = require("../utils/auth");

// User Registration
exports.handleUserRegister = async function (req, res) {
  const { userName, email, password, confirmPassword } = req.body;
  // Form Validation
  if (!userName) {
    return res.render("pages/register", {
      alert: "Full Name is Required. Please Enter Your Full Name",
      showSuccess: false,
      error: "Missing Full Name",
      success: null,
    });
  }
  if (!email) {
    return res.render("pages/register", {
      alert: "Email address is Required. Please Enter Valid E-Mail Address",
      showSuccess: false,
      error: "Missing Email",
      success: null,
    });
  }
  if (!password || password.length < 8) {
    return res.render("pages/register", {
      alert: "Please Create Password with Minimum 8 Characters",
      showSuccess: false,
      error: "Weak Password",
      success: null,
    });
  }
  if (!confirmPassword) {
    return res.render("pages/register", {
      alert: "Please Confirm Your Password",
      showSuccess: false,
      error: "Missing Password Confirmation",
      success: null,
    });
  }
  if (password !== confirmPassword) {
    return res.render("pages/register", {
      alert: "Passwords Do Not Match, Please Try Again",
      showSuccess: false,
      error: "Password Mismatch",
      success: null,
    });
  }
  // Normalize User Name
  const normalizedUserName = userName.trim();

  // Normalizing Email
  const normalizedEmail = email.trim().toLowerCase();

  // Hashing Password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

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
    const newUser = new User({
      userName: normalizedUserName,
      email: normalizedEmail,
      password: hashedPassword,
    });
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
      error: "Enter Valid Email & Try Again",
      success: null,
    });
  }
  if (!password) {
    return res.render("pages/login", {
      alert: "Please Enter Password",
      error: "Enter Valid Password Try Again",
      success: null,
    });
  }

  // User Login Logic
  try {
    // User Account Available Check
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("pages/login", {
        alert: "User Not Registered, Kindly Register Before Login",
        error: "User Not Found",
        success: null,
      });
    }
    // Password Check
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
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

// User Logout
exports.handleUserLogout = function (req, res) {
  res.clearCookie("userAuthToken").redirect("/user/login");
};

