import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";
import {
  Feather,
  BookOpen,
  Sparkles,
  TrendingUp,
  Calendar,
  Heart,
  ArrowRight
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total: 0, recent: [], mood: "—" });

  useEffect(() => {
    api
      .get("/api/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => navigate("/login", { replace: true }));

    api
      .get("/api/journal?limit=3&sort=newest")
      .then((res) => {
        const journals = res.data.journals || [];
        const moodCount = {};
        journals.forEach((j) => (moodCount[j.mood] = (moodCount[j.mood] || 0) + 1));

        let commonMood = "—";
        let max = 0;
        for (const m in moodCount) {
          if (moodCount[m] > max) {
            max = moodCount[m];
            commonMood = m;
          }
        }

        setStats({
          total: res.data.total,
          recent: journals,
          mood: commonMood,
        });
      })
      .catch(() => {});
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F6FBF7] pb-12 font-['Inter',_sans-serif]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 py-10">
        <div className="bg-white p-8 sm:p-10 rounded-t-[2.5rem] rounded-b-lg shadow-2xl border border-green-100 text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2F4A3E]">
            {user ? `Welcome, ${user.username}` : "Loading..."}
          </h2>
          <p className="text-gray-500 mt-2 text-base sm:text-lg">
            Here’s your calm corner to reflect and uncover your story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/journals/add"
            className="bg-white p-6 rounded-3xl shadow border border-green-100 hover:shadow-xl hover:bg-[#F3FAF6] transition transform hover:-translate-y-1 hover:rotate-1 focus:ring-4 focus:ring-[#5B8A72]/30 group"
          >
            <Feather size={28} className="text-[#5B8A72] mb-3 p-1 bg-green-50 rounded-xl group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold text-[#2F4A3E] mb-2 flex items-center gap-2">
              Add New Entry <ArrowRight size={18} className="text-gray-400 group-hover:text-[#5B8A72] transition" />
            </h3>
            <p className="text-gray-600 text-sm">Write about your day with clarity and ease.</p>
          </Link>

          <Link
            to="/journals"
            className="bg-white p-6 rounded-3xl shadow border border-green-100 hover:shadow-xl hover:bg-[#F3FAF6] transition transform hover:-translate-y-1 focus:ring-4 focus:ring-[#5B8A72]/30 group"
          >
            <BookOpen size={28} className="text-[#5B8A72] mb-3 p-1 bg-green-50 rounded-xl group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold text-[#2F4A3E] mb-2 flex items-center gap-2">
              View Journals <ArrowRight size={18} className="text-gray-400 group-hover:text-[#5B8A72] transition" />
            </h3>
            <p className="text-gray-600 text-sm">Browse, search, filter and revisit memories.</p>
          </Link>

          <Link
            to="/add-journal"
            className="bg-white p-6 rounded-3xl shadow border border-green-100 hover:shadow-xl hover:bg-[#F3FAF6] transition transform hover:-translate-y-1 hover:-rotate-1 focus:ring-4 focus:ring-[#5B8A72]/30 group"
          >
            <Sparkles size={28} className="text-[#5B8A72] mb-3 p-1 bg-green-50 rounded-xl group-hover:scale-110 transition" />
            <h3 className="text-xl font-semibold text-[#2F4A3E] mb-2 flex items-center gap-2">
              Writing Inspiration <ArrowRight size={18} className="text-gray-400 group-hover:text-[#5B8A72] transition" />
            </h3>
            <p className="text-gray-600 text-sm">Get an AI-generated prompt to spark your thoughts.</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow border border-green-100 text-center">
            <Calendar size={24} className="text-gray-400 mx-auto mb-2 p-1 bg-green-50 rounded-full" />
            <h4 className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-widest pt-2 border-t border-green-100 mt-2">
              Total Entries
            </h4>
            <p className="text-4xl font-extrabold text-[#2F4A3E] mt-3">{stats.total}</p>
          </div>

          <div className="bg-[#5B8A72] p-6 rounded-3xl shadow-xl text-center text-white transform -translate-y-2">
            <Heart size={24} className="text-white mx-auto mb-2 p-1 bg-white/20 rounded-full" />
            <h4 className="text-xs sm:text-sm font-medium uppercase tracking-widest pt-2 border-t border-white/30 mt-2">
              Common Mood
            </h4>
            <p className="text-3xl font-bold mt-3 capitalize text-yellow-300">{stats.mood}</p>
          </div>

          <div className="bg-white p-6 rounded-t-2xl rounded-b-none shadow border border-green-100 text-center border-b-4 border-[#2F4A3E]">
            <TrendingUp size={24} className="text-gray-400 mx-auto mb-2 p-1 bg-green-50 rounded-full" />
            <h4 className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-widest pt-2 border-t border-green-100 mt-2">
              Recent Activity
            </h4>
            <p className="text-3xl font-bold text-[#2F4A3E] mt-3">
              {stats.recent.length > 0 ? "Active" : "Quiet"}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-[1.5rem] shadow-xl border border-green-100 border-l-4 border-l-[#5B8A72]">
          <h3 className="text-xl sm:text-2xl font-bold text-[#2F4A3E] mb-6 border-b border-green-50 pb-3">
            Recent Entries
          </h3>

          {stats.recent.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p className="text-lg">Nothing here yet!</p>
              <p className="text-sm mt-2">Time to write your first entry.</p>
              <Link
                to="/add-journal"
                className="mt-4 inline-block px-6 py-2 bg-[#5B8A72] text-white rounded-full font-semibold hover:bg-[#4B735E] transition shadow-md hover:shadow-lg"
              >
                Start Writing
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recent.map((j) => (
                <Link
                  key={j._id}
                  to={`/journals/${j._id}`}
                  className="block p-4 rounded-lg bg-white border border-green-100 hover:border-[#5B8A72] hover:bg-[#F8FCFA] transition shadow-sm hover:shadow-md group"
                >
                  <h4 className="text-lg font-semibold text-[#2F4A3E] truncate group-hover:text-[#4B735E]">
                    {j.title}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {j.content}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    <span className="font-semibold text-[#5B8A72] capitalize px-2 py-0.5 rounded-full bg-green-50">
                      {j.mood || "Neutral"}
                    </span>
                    <span className="mx-2 text-gray-300">|</span>
                    {new Date(j.entryDate).toDateString()}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
