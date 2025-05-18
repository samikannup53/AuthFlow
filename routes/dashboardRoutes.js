const express = require("express");
const router = express.Router();

const { renderUserDashboard } = require("../controllers/dashboardController");
const { validateUser } = require("../middlewares/userAuth");

router.get("/", validateUser, renderUserDashboard);

module.exports = router;
