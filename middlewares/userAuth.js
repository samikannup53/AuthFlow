const { verifyToken } = require("../utils/auth");

exports.validateUser = async function (req, res, next) {
  const token = req.cookies["userAuthToken"];
  if (!token) {
    return res.render("pages/login", {
      alert: null,
      error: "Access Denied, Please Login to Continue",
      success: null,
    });
  }

  const { valid, payload, error } = verifyToken(token);

  if (!valid) {
    console.log("JWT Verification Failed:", error.message);
    return res.render("pages/login", {
      alert: null,
      error: "Session Expired or Invalid. Please Login Again",
      success: null,
    });
  } else {
    req.user = payload;
    console.log(req.user);
    next();
  }
};
