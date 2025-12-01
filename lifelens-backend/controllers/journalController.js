const Journal = require("../models/Journal");
const mongoose = require("mongoose");

// CREATE
async function createJournal(req, res) {
  try {
    const { title, content, mood, category, emotionalScore, entryDate } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const journal = await Journal.create({
      user: req.user.id,
      title,
      content,
      mood,
      category: category || null,
      emotionalScore,
      entryDate
    });

    res.status(201).json({ journal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getJournals(req, res) {
  try {
    const { search, mood, category, tag, from, to, sort = "newest", page = 1, limit = 10 } = req.query;

    const filters = { user: req.user.id };

    if (mood) filters.mood = mood;
    if (category) filters.category = category;
    if (tag) filters.category = tag;

    if (from || to) {
      filters.entryDate = {};
      if (from) filters.entryDate.$gte = new Date(from);
      if (to) filters.entryDate.$lte = new Date(to);
    }

    let query =
      search
        ? Journal.find(
            { ...filters, $text: { $search: search } },
            { score: { $meta: "textScore" } }
          )
        : Journal.find(filters);

    if (!search) {
      if (sort === "newest") query = query.sort({ entryDate: -1 });
      if (sort === "oldest") query = query.sort({ entryDate: 1 });
      if (sort === "emotion") query = query.sort({ emotionalScore: -1 });
    } else {
      if (!req.query.sort) query = query.sort({ score: { $meta: "textScore" } });
    }

    const pageNum = parseInt(page) || 1;
    const perPage = parseInt(limit) || 10;
    const skip = (pageNum - 1) * perPage;

    const total = await Journal.countDocuments(query.getQuery());
    const journals = await query
      .skip(skip)
      .limit(perPage)
      .populate("category", "name")
      .lean();

    res.json({
      total,
      page: pageNum,
      limit: perPage,
      totalPages: Math.ceil(total / perPage),
      journals
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// GET SINGLE
async function getJournalById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const journal = await Journal.findOne({ _id: id, user: req.user.id })
      .populate("category", "name");

    if (!journal) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ journal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// UPDATE
async function updateJournal(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const journal = await Journal.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { $set: req.body,
         category: req.body.category || null,
       },
      { new: true, runValidators: true }
    ).populate("category", "name");

    if (!journal) {
      return res.status(404).json({ message: "Not found or not authorized" });
    }

    res.json({ journal });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// DELETE
async function deleteJournal(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const journal = await Journal.findOneAndDelete({
      _id: id,
      user: req.user.id
    });

    if (!journal) {
      return res.status(404).json({ message: "Not found or not authorized" });
    }

    res.json({ message: "Deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createJournal,
  getJournals,
  getJournalById,
  updateJournal,
  deleteJournal
};
