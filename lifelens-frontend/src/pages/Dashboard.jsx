import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
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

    api.get("/api/journal?limit=3&sort=newest").then((res) => {
      const journals = res.data.journals || [];
      const moodCounts = {};
      journals.forEach((j) => (moodCounts[j.mood] = (moodCounts[j.mood] || 0) + 1));

      setStats({
        total: res.data.total,
        recent: journals,
        mood: Object.keys(moodCounts)[0] || "—",
      });
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F6FBF7] pt-18">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Greeting */}
        <div className="bg-white p-10 rounded-3xl shadow-lg border border-[#E3EFE7] text-center mb-10" >
          <h2 className="text-3xl font-semibold text-[#4A6651]">
            {user ? `Welcome, ${user.name}` : "Loading..."}
          </h2>
          <p className="text-gray-600 mt-2">
            Here’s your calm corner to reflect and uncover your story.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/journals/add"
            className="bg-white p-6 rounded-2xl shadow border border-[#E3EFE7] hover:bg-[#F3FAF6] transition"
          >
            <h3 className="text-xl font-semibold text-[#4A6651] mb-2">✏️ Add New Entry</h3>
            <p className="text-gray-600 text-sm">Write about your day with clarity and ease.</p>
          </Link>

          <Link
            to="/journals"
            className="bg-white p-6 rounded-2xl shadow border border-[#E3EFE7] hover:bg-[#F3FAF6] transition"
          >
            <h3 className="text-xl font-semibold text-[#4A6651] mb-2">📘 View Journals</h3>
            <p className="text-gray-600 text-sm">Browse, search, filter and revisit memories.</p>
          </Link>

          <Link
            to="/journals/add"
            className="bg-white p-6 rounded-2xl shadow border border-[#E3EFE7] hover:bg-[#F3FAF6] transition"
          >
            <h3 className="text-xl font-semibold text-[#4A6651] mb-2">💡 Writing Inspiration</h3>
            <p className="text-gray-600 text-sm">Get an AI-generated prompt to spark your thoughts.</p>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl shadow border border-[#E3EFE7] text-center">
            <h4 className="text-sm text-gray-500">Total Entries</h4>
            <p className="text-3xl font-bold text-[#4A6651]">{stats.total}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border border-[#E3EFE7] text-center">
            <h4 className="text-sm text-gray-500">Common Mood</h4>
            <p className="text-2xl font-semibold text-[#4A6651] capitalize">{stats.mood}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border border-[#E3EFE7] text-center">
            <h4 className="text-sm text-gray-500">Recent Activity</h4>
            <p className="text-2xl font-semibold text-[#4A6651]">
              {stats.recent.length > 0 ? "Active" : "Quiet"}
            </p>
          </div>
        </div>

        {/* Recent Entries */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-[#E3EFE7]">
          <h3 className="text-2xl font-semibold text-[#4A6651] mb-4">Recent Entries</h3>

          {stats.recent.length === 0 ? (
            <p className="text-gray-500">No entries yet.</p>
          ) : (
            <div className="space-y-4">
              {stats.recent.map((j) => (
                <Link
                  key={j._id}
                  to={`/journals/${j._id}`}
                  className="block p-4 rounded-xl bg-[#F8FCFA] border border-[#E3EFE7] hover:bg-[#F1F8F4] transition"
                >
                  <h4 className="text-lg font-semibold text-[#4A6651]">{j.title}</h4>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{j.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
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
