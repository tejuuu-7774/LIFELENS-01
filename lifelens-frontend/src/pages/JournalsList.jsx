import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";

export default function JournalsList() {
  const [journals, setJournals] = useState([]);
  const [tags, setTags] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  // filters
  const [search, setSearch] = useState("");
  const [mood, setMood] = useState("");
  const [tag, setTag] = useState("");
  const [sort, setSort] = useState("newest");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Load tags
  useEffect(() => {
    api.get("/api/tags").then((res) => setTags(res.data.tags));
  }, []);

  const fetchJournals = useCallback(() => {
    api
      .get("/api/journal", {
        params: {
          page,
          limit: 6,
          search,
          mood,
          tag,
          sort,
          from,
          to,
        },
      })
      .then((res) => {
        setJournals(res.data.journals);
        setTotalPages(res.data.totalPages);
      });
  }, [page, search, mood, tag, sort, from, to]);

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  const applyFilters = () => {
    setPage(1);
    fetchJournals();
  };

  return (
    <div className="min-h-screen bg-[#F6FBF7] pt-18">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#4A6651]">Your Journals</h1>
          <Link
            to="/journals/add"
            className="px-5 py-2 bg-[#5B8A72] text-white rounded-xl shadow hover:bg-[#4B735E]"
          >
            + Add Entry
          </Link>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-6 rounded-2xl shadow border border-[#E3EFE7] mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Search..."
              className="p-3 border rounded-xl focus:ring-2 focus:ring-[#A8DADC]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="p-3 border rounded-xl"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="">Mood (All)</option>
              <option>happy</option>
              <option>sad</option>
              <option>angry</option>
              <option>anxious</option>
              <option>neutral</option>
              <option>excited</option>
              <option>other</option>
            </select>

            <select
              className="p-3 border rounded-xl"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            >
              <option value="">Tag (All)</option>
              {tags.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>

          </div>

          {/* date + sort */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <input
              type="date"
              className="p-3 border rounded-xl"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />

            <input
              type="date"
              className="p-3 border rounded-xl"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />

            <select
              className="p-3 border rounded-xl"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="emotion">Emotion Depth</option>
            </select>

            <button
              onClick={applyFilters}
              className="px-5 py-2 bg-[#5B8A72] text-white rounded-xl shadow hover:bg-[#4B735E]"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* JOURNAL CARDS */}
        {journals.length === 0 ? (
          <p className="text-center text-gray-500">No journals found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {journals.map((j) => (
              <Link
                key={j._id}
                to={`/journals/${j._id}`}
                className="block bg-white p-6 rounded-2xl shadow border border-[#E3EFE7] hover:bg-[#F3FAF6] transition"
              >
                <h2 className="text-xl font-semibold text-[#4A6651]">{j.title}</h2>
                <p className="text-gray-600 text-sm line-clamp-2 mt-2">{j.content}</p>

                <div className="text-xs text-gray-400 mt-3 flex justify-between">
                  <span className="capitalize">{j.mood}</span>
                  <span>{new Date(j.entryDate).toDateString()}</span>
                </div>

                {j.category && (
                  <p className="text-xs mt-1 text-[#5B8A72] font-semibold">
                    #{j.category.name}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded-xl bg-white border shadow hover:bg-[#F1F8F4] disabled:opacity-40"
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-xl bg-white border shadow hover:bg-[#F1F8F4] disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
