const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

// Importing Routes
const staticRoutes = require("./routes/staticRoutes");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const passwordResetRoutes = require("./routes/passwordResetRoutes");

// View Engine Configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static Files Configuration
app.use(express.static(path.join(__dirname, "public")));

// Register Routes
app.use("/", staticRoutes);
app.use("/user", userRoutes);
app.use("/user/dashboard", dashboardRoutes);
app.use("/user/reset-password", passwordResetRoutes);

module.exports = app;
