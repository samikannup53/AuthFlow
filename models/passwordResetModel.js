const mongoose = require("mongoose");
const User = require("../models/userModel");

const passwordResetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  resetToken: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    enum: ["OTP", "LINK"],
    default: "LINK",
    required: true,
  },
  OTP: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

const PasswordReset = mongoose.model("PasswordReset", passwordResetSchema);

module.exports = PasswordReset;
