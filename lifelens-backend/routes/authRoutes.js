const express = require("express");
const { signup, login, getDashboard } = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/dashboard", verifyToken, getDashboard);

module.exports = router;
