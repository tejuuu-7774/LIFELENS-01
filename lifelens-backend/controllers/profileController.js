const User = require("../models/User");
const Journal = require("../models/Journal");
// const Highlight = require("../models/Highlight");

// READING THE PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ error: "Failed to load profile" });
  }
};

// UPDATING PROFILE 
exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true }
    ).select("-password");

    return res.json({ user: updated });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update profile" });
  }
};

// DELETE THE ACCOUNT
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    await User.findByIdAndDelete(userId);
    await Journal.deleteMany({ userId });
    await Highlight.deleteMany({ userId });

    return res.json({ message: "Account deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete account" });
  }
};
