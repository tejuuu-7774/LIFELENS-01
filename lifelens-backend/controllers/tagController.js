const Tag = require("../models/Tag");
const mongoose = require("mongoose");

// CREATE TAG
async function createTag(req, res) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Tag name is required" });

    const tag = await Tag.create({ user: req.user.id, name });
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

// UPDATE TAG
async function updateTag(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const tag = await Tag.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { $set: { name } },
      { new: true, runValidators: true }
    );

    if (!tag) return res.status(404).json({ message: "Tag not found or not authorized" });

    res.json({ tag });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// DELETE TAG
async function deleteTag(req, res) {
  try {
    const { id } = req.params;

    // Remove tag from all journals that used it
    await Journal.updateMany(
      { category: id },
      { $set: { category: null } }
    );

    // Delete the tag
    await Tag.findByIdAndDelete(id);

    res.json({ message: "Tag deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { createTag, getTags, updateTag, deleteTag };
