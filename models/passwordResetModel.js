const mongoose = require("mongoose");
const User = require("../models/userModel");

const passwordResetSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId,ref: User, required: true},
  resetMethod: {type: String,enum: ["otp", "link"],default: "link",required: true},
  resetToken: {type: String,required: true},
  resetTokenExpires: {type: Date},
  resetCode: { type: String }, 
  otp: { type: String },
  otpExpires: { type: Date },  
  createdAt: { type: Date, default: Date.now, expires: 600},
});

const PasswordReset = mongoose.model("PasswordReset", passwordResetSchema);

module.exports = PasswordReset;
