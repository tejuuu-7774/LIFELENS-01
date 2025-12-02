const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, deleteAccount } = require("../controllers/profileController");
const auth = require("../middleware/authMiddleware");

router.get("/me", auth, getProfile);
router.put("/update", auth, updateProfile);
router.delete("/delete", auth, deleteAccount);

module.exports = router;
