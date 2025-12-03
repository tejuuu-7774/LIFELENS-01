/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import JournalHeatmap from "../components/JournalHeatmap";
import Highlights from "../components/Highlights";
import {
  User,
  Mail,
  Save,
  Trash2,
  Calendar,
  TrendingUp,
  BookOpen,
  Clock,
  Zap,
  Settings,
  LayoutDashboard,
  XCircle,
  CheckCircle,
} from "lucide-react";

const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  const color =
    type === "success"
      ? "bg-green-100 text-green-700 border border-green-200"
      : "bg-red-100 text-red-700 border border-red-200";

  const Icon = type === "success" ? CheckCircle : XCircle;

  return (
    <div
      className={`fixed top-24 right-4 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 ${color}`}
    >
      <Icon size={22} />
      <span className="font-semibold">{message}</span>
      <button onClick={onClose} className="ml-4 text-gray-600 hover:text-gray-800">
        &times;
      </button>
    </div>
  );
};

export default function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notification, setNotification] = useState({ message: "", type: "" });

  const [form, setForm] = useState({
    username: "",
    email: "",
  });

  const [metrics, setMetrics] = useState({
    totalJournals: 0,
    longestStreak: 0,
    accountAgeMonths: 0,
  });

  const loadProfile = async () => {
    try {
      const res = await api.get("/api/profile/me");
      const user = res.data.user;

      setForm({
        username: user.username || "",
        email: user.email || "",
      });

      setMetrics({
        totalJournals: user.totalJournals || 0,
        longestStreak: user.longestStreak || 0,
        accountAgeMonths: user.accountAgeMonths || 0,
      });
    } catch {
      console.log("err");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  useEffect(() => {
    if (notification.message) {
      const t = setTimeout(() => setNotification({ message: "", type: "" }), 3000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveProfile = async () => {
    setSaving(true);
    try {
      const res = await api.put("/api/profile/update", form);
      setForm({
        username: res.data.user.username,
        email: res.data.user.email,
      });
      setNotification({ message: "Profile updated successfully!", type: "success" });
    } catch {
      setNotification({ message: "Failed to update profile.", type: "error" });
    }
    setSaving(false);
  };

  const deleteAccount = async () => {
  if (!window.confirm("Delete your account permanently?")) return;

      setDeleting(true);
      try {
        await api.delete("/api/profile/delete");
        localStorage.removeItem("token");
        window.location.href = "/";
      } catch {
        setNotification({ message: "Error deleting account.", type: "error" });
      }
      setDeleting(false);
    };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6FBF7]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#5B8A72] border-t-transparent"></div>
      </div>
    );

  const initial = form.username ? form.username.charAt(0).toUpperCase() : "U";

  const TabButton = ({ tab, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-6 py-2 rounded-t-lg font-semibold flex items-center gap-2 transition-all ${
        activeTab === tab
          ? "bg-white text-[#5B8A72] border-b-2 border-[#5B8A72]"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
      }`}
    >
      <Icon size={20} />
      {label}
    </button>
  );

  const renderContent = () => {
    if (activeTab === "dashboard")
      return (
        <div className="flex flex-col gap-10">
          <div className="bg-white p-6 rounded-2xl shadow border border-green-100 min-h-[340px]">
            <JournalHeatmap />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border border-green-100">
            <Highlights />
          </div>
        </div>
      );

    if (activeTab === "settings")
      return (
        <div className="bg-white rounded-xl border border-green-100 shadow-lg p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-[#2F4A3E] mb-6 flex items-center gap-2">
            <User size={20} className="text-[#5B8A72]" /> Edit Profile
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-[#4A6651] font-semibold mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full p-3 border border-green-200 rounded-lg bg-[#F8FBF9] focus:ring-2 focus:ring-[#8EC7B5] outline-none"
              />
            </div>

            <div>
              <label className="block text-[#4A6651] font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border border-green-200 rounded-lg bg-[#F8FBF9] focus:ring-2 focus:ring-[#8EC7B5] outline-none"
              />
            </div>
          </div>

          <div className="space-y-4 mt-8 pt-4 border-t border-green-100">
            <button
              onClick={saveProfile}
              disabled={saving}
              className="w-full py-3 bg-[#5B8A72] text-white rounded-lg shadow-md hover:bg-[#4B735E] transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {saving ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Save size={20} />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={deleteAccount}
              disabled={deleting}
              className="w-full py-3 bg-red-50 text-red-700 rounded-lg shadow border border-red-200 hover:bg-red-100 transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <Trash2 size={20} />
              {deleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F6FBF7] to-[#E6F3EC] pt-24 font-['Inter',_sans-serif]">
      <Navbar />
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />

      <div className="w-full max-w-4xl mx-auto px-4 pb-20">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-green-100 shadow-xl p-8 mb-10">
          <div className="flex flex-col items-center border-b border-green-100 pb-6 mb-6">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#6FAF92] to-[#5B8A72] flex items-center justify-center text-white text-4xl font-bold shadow-xl">
              {initial}
            </div>

            <h2 className="mt-6 text-3xl font-extrabold text-[#2F4A3E]">
              {form.username}
            </h2>

            <p className="text-[#527964] mt-1 flex items-center gap-1">
              <Mail size={16} className="opacity-80" /> {form.email}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-xl">
              <BookOpen size={26} className="text-[#5B8A72] mx-auto mb-1" />
              <p className="text-xl font-bold text-[#2F4A3E]">
                {metrics.totalJournals}
              </p>
              <p className="text-xs text-gray-500 font-medium">Journals</p>
            </div>

            <div className="p-4 bg-green-50 rounded-xl">
              <Zap size={26} className="text-[#5B8A72] mx-auto mb-1" />
              <p className="text-xl font-bold text-[#2F4A3E]">
                {metrics.longestStreak} days
              </p>
              <p className="text-xs text-gray-500 font-medium">
                Longest Streak
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-xl">
              <Clock size={26} className="text-[#5B8A72] mx-auto mb-1" />
              <p className="text-xl font-bold text-[#2F4A3E]">
                {metrics.accountAgeMonths}+
              </p>
              <p className="text-xs text-gray-500 font-medium">
                Months Active
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4 flex border-b border-gray-200">
          <TabButton tab="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <TabButton tab="settings" icon={Settings} label="Settings" />
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
