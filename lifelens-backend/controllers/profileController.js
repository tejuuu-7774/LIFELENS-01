const User = require("../models/User");
const Journal = require("../models/Journal");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const totalJournals = await Journal.countDocuments({ user: req.user.id });

    const firstEntry = await Journal.findOne({ user: req.user.id }).sort({ entryDate: 1 });
    const accountAgeMonths = firstEntry
      ? Math.floor((Date.now() - new Date(firstEntry.entryDate)) / (1000 * 60 * 60 * 24 * 30))
      : 0;

    const entries = await Journal.find({ user: req.user.id }).sort({ entryDate: -1 });

    let streak = 0;
    let previous = null;

    for (let j of entries) {
      const day = new Date(j.entryDate).setHours(0, 0, 0, 0);

      if (!previous) {
        previous = day;
        streak = 1;
      } else {
        const diff = (previous - day) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          streak++;
          previous = day;
        } else break;
      }
    }

    return res.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        totalJournals,
        longestStreak: streak,
        accountAgeMonths,
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true }
    ).select("-password");

    return res.json({ success: true, user: updated });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update profile" });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    await Journal.deleteMany({ user: userId });
    await User.findByIdAndDelete(userId);

    return res.json({ success: true, message: "Account deleted" });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete account" });
  }
};
