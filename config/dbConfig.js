// Importing mongoose ODM
const mongoose = require("mongoose");

// Database Connection Function
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully...");
  } catch (error) {
    console.log("Error in MongoDB Connection :", error.message);
  }
}

// Exporting Database Connection Function
module.exports = connectDB;
