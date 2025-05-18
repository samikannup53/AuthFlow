const User = require("../models/userModel");

exports.renderUserDashboard = async function (req, res) {
  try {
    const userID = req.user.userID;
    const user = await User.findById(userID);
    if (!user) {
      return res.redirect("/login");
    } else {
      return res.render("pages/userDashboard", {
        userName: user.userName,
        email: user.email,
      });
    }
  } catch (error) {
    console.error(error);
    return res.redirect("/login");
  }
};
