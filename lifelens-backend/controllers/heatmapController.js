const Journal = require("../models/Journal");

function toLocalYMD(d) {
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

exports.getHeatmap = async (req, res) => {
  try {
    const userId = req.user.id;
    const journals = await Journal.find({ user: userId }).select("entryDate");

    const map = {};
    journals.forEach((j) => {
      const dateObj = new Date(j.entryDate);
      if (isNaN(dateObj)) return;
      const day = toLocalYMD(dateObj);
      map[day] = (map[day] || 0) + 1;
    });

    let streak = 0;
    const cursor = new Date();
    while (true) {
      const key = toLocalYMD(cursor);
      if (map[key]) {
        streak++;
        cursor.setDate(cursor.getDate() - 1);
      } else break;
    }

    return res.json({ heatmap: map, streak });
  } catch (err) {
    console.log("heatmap error:", err);
    return res.status(500).json({ error: "Failed to load heatmap" });
  }
};
