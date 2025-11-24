const Journal = require("../models/Journal");
const mongoose = require("mongoose");

// create
async function createJournal(req, res) {
  try {
    const { title, content, mood, category, emotionalScore, entryDate } = req.body;
    if (!title || !content) return res.status(400).json({ message: "Title and content required" });

    const journal = await Journal.create({
      user: req.user.id,
      title,
      content,
      mood,
      category,
      emotionalScore,
      entryDate,
    });

    res.status(201).json({ journal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// list with search/filter/sort/pagination
async function getJournals(req, res) {
  try {
    const { search, mood, category, from, to, sort = "newest", page = 1, limit = 10 } = req.query;
    const filters = { user: req.user.id };

    if (mood) filters.mood = mood;
    if (category) filters.category = category;
    if (from || to) {
      filters.entryDate = {};
      if (from) filters.entryDate.$gte = new Date(from);
      if (to) filters.entryDate.$lte = new Date(to);
    }

    let query;
    if (search) query = Journal.find({ ...filters, $text: { $search: search } }, { score: { $meta: "textScore" } });
    else query = Journal.find(filters);

    if (!search) {
      if (sort === "newest") query = query.sort({ entryDate: -1, createdAt: -1 });
      if (sort === "oldest") query = query.sort({ entryDate: 1, createdAt: 1 });
      if (sort === "emotion") query = query.sort({ emotionalScore: -1, entryDate: -1 });
    } else {
      // when searching, default to text score unless explicit sort set
      if (!req.query.sort) query = query.sort({ score: { $meta: "textScore" } });
      else if (sort === "emotion") query = query.sort({ emotionalScore: -1 });
    }

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const perPage = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
    const skip = (pageNum - 1) * perPage;

    const total = await Journal.countDocuments(query.getQuery ? query.getQuery() : filters);
    const journals = await query.skip(skip).limit(perPage).lean();

    res.json({ total, page: pageNum, limit: perPage, totalPages: Math.ceil(total / perPage), journals });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// get single
async function getJournalById(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });

    const journal = await Journal.findOne({ _id: id, user: req.user.id });
    if (!journal) return res.status(404).json({ message: "Not found" });

    res.json({ journal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// update
async function updateJournal(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });

    const journal = await Journal.findOneAndUpdate({ _id: id, user: req.user.id }, { $set: req.body }, { new: true, runValidators: true });
    if (!journal) return res.status(404).json({ message: "Not found or not authorized" });

    res.json({ journal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// delete
async function deleteJournal(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });

    const journal = await Journal.findOneAndDelete({ _id: id, user: req.user.id });
    if (!journal) return res.status(404).json({ message: "Not found or not authorized" });

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { createJournal, getJournals, getJournalById, updateJournal, deleteJournal };
