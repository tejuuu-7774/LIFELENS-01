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

    let query;

    if (search) {
      query = Journal.find(
        { ...filters, $text: { $search: search } },
        { score: { $meta: "textScore" } }
      );
    } else {
      query = Journal.find(filters);
    }

    if (!search) {
      if (sort === "newest") query = query.sort({ entryDate: -1, createdAt: -1 });
      if (sort === "oldest") query = query.sort({ entryDate: 1, createdAt: 1 });
      if (sort === "emotion") query = query.sort({ emotionalScore: -1, entryDate: -1 });
    } else {
      if (!req.query.sort) query = query.sort({ score: { $meta: "textScore" } });
      else if (sort === "emotion") query = query.sort({ emotionalScore: -1 });
    }

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const perPage = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);
    const skip = (pageNum - 1) * perPage;

    const total = await Journal.countDocuments(query.getQuery());
    const journals = await query
      .skip(skip)
      .limit(perPage)
      .populate("category") // NEW
      .lean();

    res.json({
      total,
      page: pageNum,
      limit: perPage,
      totalPages: Math.ceil(total / perPage),
      journals,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}
