const express = require("express");
const { getStarterLine, analyzeJournal } = require("../controllers/aiController");

const router = express.Router();

router.get("/starter", getStarterLine);
router.post("/analyze", analyzeJournal);

module.exports = router;
