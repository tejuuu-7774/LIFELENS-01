const express = require("express");
const { createTag, getTags, deleteTag } = require("../controllers/tagController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.use(verifyToken);

router.post("/", createTag);
router.get("/", getTags);
router.delete("/:id", deleteTag);

module.exports = router;
