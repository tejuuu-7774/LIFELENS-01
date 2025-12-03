const Highlight = require("../models/Highlight");

exports.createHighlight = async (req, res) => {
  try {
    const { title, description, image, journals } = req.body;

    const highlight = await Highlight.create({
      user: req.user.id,
      title,
      description,
      image: image || "",
      journals: journals || []
    });

    return res.json({ highlight });
  } catch (err) {
    return res.status(500).json({ error: "Failed to create highlight" });
  }
};

exports.getHighlights = async (req, res) => {
  try {
    const highlights = await Highlight.find({ user: req.user.id })
      .populate("journals", "title content entryDate mood")
      .sort({ createdAt: -1 });

    return res.json({ highlights });
  } catch (err) {
    return res.status(500).json({ error: "Failed to load highlights" });
  }
};

exports.updateHighlight = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, journals } = req.body;

    const updated = await Highlight.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, description, image, journals },
      { new: true }
    );

    return res.json({ highlight: updated });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update highlight" });
  }
};

exports.deleteHighlight = async (req, res) => {
  try {
    const { id } = req.params;

    await Highlight.findOneAndDelete({ _id: id, user: req.user.id });

    return res.json({ message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Delete failed" });
  }
};
