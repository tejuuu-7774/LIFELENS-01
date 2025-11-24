import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";

export default function AddJournal() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    mood: "neutral",
    category: "",
    entryDate: new Date().toISOString().slice(0, 10), 
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/journal", form);
      navigate("/journals");
    } catch (err) {
      console.error(err);
      alert("Failed to create journal entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6FBF7] pt-18">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-[#4A6651] mb-6">
          Add New Journal Entry
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-lg border border-[#E3EFE7] space-y-6"
        >
          {/* TITLE */}
          <div>
            <label className="block text-[#4A6651] font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#A8DADC]"
              placeholder="A gentle moment..."
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="block text-[#4A6651] font-medium mb-1">
              What happened today?
            </label>
            <textarea
              name="content"
              rows={6}
              required
              value={form.content}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#A8DADC]"
              placeholder="Write your thoughts, feelings, moments..."
            />
          </div>

          {/* MOOD */}
          <div>
            <label className="block text-[#4A6651] font-medium mb-1">Mood</label>
            <select
              name="mood"
              value={form.mood}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            >
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="angry">Angry</option>
              <option value="anxious">Anxious</option>
              <option value="neutral">Neutral</option>
              <option value="excited">Excited</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-[#4A6651] font-medium mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              placeholder="ex: personal, work, health..."
            />
          </div>

          {/* DATE */}
          <div>
            <label className="block text-[#4A6651] font-medium mb-1">
              Entry Date
            </label>
            <input
              type="date"
              name="entryDate"
              value={form.entryDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#5B8A72] text-white rounded-xl shadow hover:bg-[#4B735E] transition"
          >
            {loading ? "Saving..." : "Save Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}
