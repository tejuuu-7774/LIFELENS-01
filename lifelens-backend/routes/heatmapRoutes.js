const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getHeatmap } = require("../controllers/heatmapController");

router.get("/", auth, getHeatmap);

module.exports = router;
