import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";

import {
  Search,
  Filter,
  SortAsc,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

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

  const [listLoading, setListLoading] = useState(false);

  // load tags
  useEffect(() => {
    api.get("/api/tags").then((res) => setTags(res.data.tags));
  }, []);

  const fetchJournals = useCallback(() => {
    setListLoading(true);

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
      })
      .catch(() => {
        setJournals([]);
        setTotalPages(1);
      })
      .finally(() => setListLoading(false));
  }, [page, search, mood, tag, sort, from, to]);

  useEffect(() => {
    fetchJournals();
  }, [fetchJournals]);

  const applyFilters = () => {
    setPage(1);
  };

  // Mood color palette
  const moodColors = {
    happy: { bg: "bg-yellow-100", text: "text-yellow-700" },
    sad: { bg: "bg-blue-100", text: "text-blue-700" },
    angry: { bg: "bg-red-100", text: "text-red-700" },
    anxious: { bg: "bg-purple-100", text: "text-purple-700" },
    neutral: { bg: "bg-gray-100", text: "text-gray-700" },
    excited: { bg: "bg-pink-100", text: "text-pink-700" },
    productive: { bg: "bg-green-100", text: "text-green-700" },
    calm: { bg: "bg-teal-100", text: "text-teal-700" },
    other: { bg: "bg-orange-100", text: "text-orange-700" },
  };

  const getMoodClasses = (moodKey) => {
    const key = moodKey?.toLowerCase() || "neutral";
    return moodColors[key] || moodColors["neutral"];
  };

  return (
    <div className="min-h-screen bg-[#F6FBF7] pb-20 font-['Inter',_sans-serif]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-28">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-green-100">
          <h1 className="text-4xl font-extrabold text-[#2F4A3E] mb-4 sm:mb-0">
            Your Private Collection
          </h1>

          <Link
            to="/journals/add"
            className="px-6 py-3 bg-[#5B8A72] text-white font-semibold rounded-full shadow-md hover:bg-[#4B735E] transition flex items-center gap-2"
          >
            <Plus size={18} /> Add New Entry
          </Link>
        </div>

        {/* FILTERS */}
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-green-100 mb-10">
          <h3 className="text-lg font-bold text-[#2F4A3E] mb-4 flex items-center gap-2">
            <Filter size={20} className="text-[#5B8A72]" /> Filter Your Journals
          </h3>

          {/* top filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search title or content..."
                className="w-full p-3 pl-10 border border-green-100 rounded-xl focus:ring-2 focus:ring-[#5B8A72]/50 transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* mood */}
            <select
              className="p-3 border border-green-100 rounded-xl bg-white focus:ring-2 focus:ring-[#5B8A72]/50 transition"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="">Mood (All)</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="angry">Angry</option>
              <option value="anxious">Anxious</option>
              <option value="neutral">Neutral</option>
              <option value="excited">Excited</option>
              <option value="productive">Productive</option>
              <option value="calm">Calm</option>
              <option value="other">Other</option>
            </select>

            {/* tag */}
            <select
              className="p-3 border border-green-100 rounded-xl bg-white focus:ring-2 focus:ring-[#5B8A72]/50 transition"
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

            {/* sort */}
            <div className="relative">
              <select
                className="p-3 pl-10 border border-green-100 rounded-xl bg-white focus:ring-2 focus:ring-[#5B8A72]/50 transition w-full"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="emotion">Emotion Depth</option>
              </select>

              <SortAsc
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          {/* date filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-[#2F4A3E] mb-1">
                From Date
              </label>
              <input
                type="date"
                className="w-full p-3 border border-green-100 rounded-xl bg-white focus:ring-2 focus:ring-[#5B8A72]/50 transition"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2F4A3E] mb-1">
                To Date
              </label>
              <input
                type="date"
                className="w-full p-3 border border-green-100 rounded-xl bg-white focus:ring-2 focus:ring-[#5B8A72]/50 transition"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div className="hidden lg:block"></div>

            <button
              onClick={applyFilters}
              className="w-full h-[46px] px-5 py-2 bg-[#2F4A3E] text-white font-semibold rounded-xl shadow-md hover:bg-[#1a2f26] transition transform hover:-translate-y-0.5"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* ENTRIES */}
        {listLoading ? (
          <div className="text-center py-20 text-gray-500">
            <div className="loader mx-auto mb-4"></div>
            <p className="text-lg font-medium">Loading entries...</p>

            <style>{`
              .loader {
                border: 4px solid #e2e8f0;
                border-top: 4px solid #5B8A72;
                border-radius: 50%;
                width: 42px;
                height: 42px;
                animation: spin 0.8s linear infinite;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : journals.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-white rounded-3xl shadow-lg border border-green-100">
            <h2 className="text-2xl font-bold text-[#2F4A3E] mb-2">
              No Entries Found
            </h2>
            <p className="mb-4">Try adjusting your filters or start a new entry.</p>

            <Link
              to="/journals/add"
              className="px-6 py-3 bg-[#5B8A72] text-white font-semibold rounded-full shadow-md hover:bg-[#4B735E] transition flex items-center gap-2 mx-auto w-fit"
            >
              <Plus size={18} /> Start Writing Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journals.map((j) => {
              const { bg, text } = getMoodClasses(j.mood);

              return (
                <Link
                  key={j._id}
                  to={`/journals/${j._id}`}
                  className="block bg-white p-6 rounded-2xl shadow border border-green-100 hover:shadow-xl hover:scale-[1.01] transition duration-300 group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-[#2F4A3E] group-hover:text-[#5B8A72] transition truncate">
                      {j.title}
                    </h2>

                    <span
                      className={`text-xs font-semibold capitalize px-3 py-1 rounded-full ${bg} ${text}`}
                    >
                      {j.mood}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-3 mt-2 mb-4 h-14">
                    {j.content}
                  </p>

                  <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t border-green-50">
                    {j.category ? (
                      <p className="text-[#5B8A72] font-semibold flex items-center gap-1">
                        <Filter size={14} /> #{j.category.name}
                      </p>
                    ) : (
                      <p className="text-gray-400">No Tag</p>
                    )}

                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-gray-400" />
                      {new Date(j.entryDate).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={page === 1 || listLoading}
              onClick={() => setPage((p) => p - 1)}
              className="p-3 rounded-full bg-white border shadow hover:bg-[#E3EFE7] disabled:opacity-50 transition"
            >
              <ChevronLeft size={20} className="text-[#2F4A3E]" />
            </button>

            <div className="text-sm font-semibold text-[#2F4A3E]">
              Page {page} of {totalPages}
            </div>

            <button
              disabled={page === totalPages || listLoading}
              onClick={() => setPage((p) => p + 1)}
              className="p-3 rounded-full bg-white border shadow hover:bg-[#E3EFE7] disabled:opacity-50 transition"
            >
              <ChevronRight size={20} className="text-[#2F4A3E]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
