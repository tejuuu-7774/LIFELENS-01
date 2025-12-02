import { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import JournalHeatmap from "../components/JournalHeatmap"

export default function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
  });

  const loadProfile = async () => {
    try {
      const res = await api.get("/api/profile/me");
      const user = res.data.user;

      setForm({
        username: user.username || "",
        email: user.email || "",
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProfile();
  }, []);

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
      alert("Profile updated!");
    } catch (err) {
      console.log(err);
      alert("Failed to update profile");
    }
    setSaving(false);
  };

  const deleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    setDeleting(true);
    try {
      await api.delete("/api/profile/delete");
      alert("Account deleted");
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Error deleting account");
    }
    setDeleting(false);
  };

  if (loading) return null;

  const initial = form.username
    ? form.username.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F6FBF7] to-[#E6F3EC] pt-24">
      <Navbar />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 pb-14">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-[#DCEFE3] shadow-md p-8 sm:p-10">

          {/* HEADER */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#7BA893] to-[#5B8A72] flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {initial}
            </div>

            <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-[#2f513f]">
              {form.username || "Your Username"}
            </h2>

            <p className="text-[#527964] mt-2 text-sm">
              {form.email}
            </p>
          </div>

          {/* FORM */}
          <div className="space-y-7 border-t border-[#E1F0E6] pt-8">

            <div>
              <label className="block text-[#4A6651] font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full p-3 border border-[#DCEFE3] rounded-lg bg-[#F8FBF9]
                           focus:outline-none focus:ring-2 focus:ring-[#9DC8B4]"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label className="block text-[#4A6651] font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border border-[#DCEFE3] rounded-lg bg-[#F8FBF9]
                           focus:outline-none focus:ring-2 focus:ring-[#9DC8B4]"
                placeholder="Enter email"
              />
            </div>

            <button
              onClick={saveProfile}
              disabled={saving}
              className="w-full py-3 bg-[#5B8A72] text-white rounded-lg hover:bg-[#4B735E] transition font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              onClick={deleteAccount}
              disabled={deleting}
              className="w-full py-3 bg-[#CBE7D8] text-[#274137] rounded-lg hover:bg-[#B8DCCB] transition font-medium disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {deleting ? "Deleting..." : "Delete Account"}
            </button>

            <JournalHeatmap/>
          </div>
        </div>
      </div>
    </div>
  );
}
