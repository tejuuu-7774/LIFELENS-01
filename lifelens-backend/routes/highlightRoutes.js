const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createHighlight,
  getHighlights,
  updateHighlight,
  deleteHighlight
} = require("../controllers/highlightController");

router.post("/", auth, createHighlight);
router.get("/", auth, getHighlights);
router.put("/:id", auth, updateHighlight);
router.delete("/:id", auth, deleteHighlight);

module.exports = router;
