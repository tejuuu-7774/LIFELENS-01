const express = require("express");
const { createTag, getTags, updateTag, deleteTag } = require("../controllers/tagController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.use(verifyToken);

router.post("/", createTag);       
router.get("/", getTags);        
router.put("/:id", updateTag);   
router.delete("/:id", deleteTag);

module.exports = router;
