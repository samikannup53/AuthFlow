const express = require("express");
const app = express();
const path = require("path");

// Importing Routes
const staticRoutes = require("./routes/staticRoutes");
const userRoutes = require("./routes/userRoutes");

// View Engine Configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// JSON Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files Configuration
app.use(express.static(path.join(__dirname, "public")));

// Register Routes
app.use("/", staticRoutes);
app.use("/user", userRoutes);

module.exports = app;
