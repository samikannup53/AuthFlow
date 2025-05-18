const { verifyToken } = require("../utils/auth");

exports.validateUser = async function (req, res, next) {
  const token = req.cookies["userAuthToken"];
  if (!token) {
    return res.render("pages/login", {
      alert: "Need Authorized Token to Login",
      error: "Access Denied",
      success: null,
    });
  }

  const { valid, payload, error } = verifyToken(token);

  if (!valid) {
    console.log("JWT Verification Failed:", error.message);
    return res.render("pages/login", {
      alert: "Invalid / Expired Token",
      error: "Access Denied",
      success: null,
    });
  } else {
    req.user = payload;
    console.log(req.user)
    next();
  }
};
