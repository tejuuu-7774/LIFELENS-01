const Tag = require("../models/Tag");
const Journal = require("../models/Journal");

// CREATE TAG
async function createTag(req, res) {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Tag name is required" });
    }

    const tag = await Tag.create({
      user: req.user.id,
      name: name.trim()
    });

    res.status(201).json({ tag });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// GET ALL TAGS
async function getTags(req, res) {
  try {
    const tags = await Tag.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ tags });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// DELETE TAG
async function deleteTag(req, res) {
  try {
    const { id } = req.params;

    // Remove tag reference from journals
    await Journal.updateMany(
      { category: id },
      { $set: { category: null } }
    );

    // Delete tag
    await Tag.findByIdAndDelete(id);

    res.json({ message: "Tag deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { createTag, getTags, deleteTag };
