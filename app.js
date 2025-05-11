const express = require("express");
const app = express();

const staticRoutes = require("./routes/staticRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/", staticRoutes);
app.use("/users", userRoutes);

module.exports = app;
