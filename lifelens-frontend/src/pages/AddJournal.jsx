import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import { Plus, X, Trash2, Zap } from "lucide-react";

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
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [creatingTag, setCreatingTag] = useState(false);

  const [starter, setStarter] = useState("");
  const [starterLoading, setStarterLoading] = useState(false);

  useEffect(() => {
    api.get("/api/tags").then((res) => setTags(res.data.tags));
  }, []);

  const fetchStarter = async () => {
    setStarterLoading(true);
    setStarter("");

    try {
      const res = await api.get("/api/ai/starter");
      setStarter(res.data.starter);
    } catch {
      setStarter("Failed to load a starter prompt. Try again.");
    }

    setStarterLoading(false);
  };

  const createTag = async () => {
    if (!newTag.trim()) return;

    try {
      const res = await api.post("/api/tags", { name: newTag });
      setTags((prev) => [...prev, res.data.tag]);
      setForm((prev) => ({ ...prev, category: res.data.tag._id }));
      setNewTag("");
      setCreatingTag(false);
    } catch {
      console.log("Failed to create tag");
    }
  };

  const deleteTag = async (tagId) => {
    if (!window.confirm("Delete this tag?")) return;

    try {
      await api.delete(`/api/tags/${tagId}`);
      setTags((prev) => prev.filter((t) => t._id !== tagId));
      setForm((prev) => ({
        ...prev,
        category: prev.category === tagId ? "" : prev.category,
      }));
    } catch {
      console.log("Failed to delete tag");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/api/journal", form);
      navigate("/journals");
    } catch {
      console.log("Failed to create journal entry");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F6FBF7] pb-20">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28">
        <h1 className="text-4xl font-extrabold text-[#2F4A3E] mb-6">
          Create a New Entry
        </h1>
        <p className="text-gray-500 mb-8">
          Capture your thoughts and moments with clarity.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-10 rounded-[2.5rem] shadow-2xl border border-green-100 space-y-8"
        >
          {/* AI Starter Button */}
          <div>
            <button
              type="button"
              onClick={fetchStarter}
              disabled={starterLoading}
              className={`px-6 py-3 font-semibold text-sm rounded-full shadow flex items-center gap-2 ${
                starterLoading
                  ? "bg-green-200 text-[#2F4A3E]"
                  : "bg-[#2F4A3E] text-white hover:bg-[#1a2f26]"
              }`}
            >
              <Zap size={18} className={starterLoading ? "animate-pulse" : ""} />
              {starterLoading ? "AI is thinking..." : "Get Writing Prompt"}
            </button>
          </div>

          {starter && (
            <div className="p-4 bg-purple-50 border-l-4 border-purple-300 rounded-lg text-sm italic text-gray-700">
              <span className="font-bold text-purple-600">Prompt:</span> {starter}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-[#2F4A3E] font-bold text-sm mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full p-4 border border-green-100 rounded-xl"
              placeholder="A gentle moment..."
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-[#2F4A3E] font-bold text-sm mb-2">
              What happened today?
            </label>
            <textarea
              name="content"
              rows={8}
              required
              value={form.content}
              onChange={handleChange}
              className="w-full p-4 border border-green-100 rounded-xl resize-none"
              placeholder="Write your thoughts..."
            />
          </div>

          {/* Mood & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[#2F4A3E] font-bold text-sm mb-2">
                Mood
              </label>
              <select
                name="mood"
                value={form.mood}
                onChange={handleChange}
                className="w-full p-4 border border-green-100 rounded-xl bg-white"
              >
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
            </div>

            <div>
              <label className="block text-[#2F4A3E] font-bold text-sm mb-2">
                Entry Date
              </label>
              <input
                type="date"
                name="entryDate"
                value={form.entryDate}
                onChange={handleChange}
                className="w-full p-4 border border-green-100 rounded-xl bg-white"
              />
            </div>
          </div>

          {/* TAG SECTION */}
          <div>
            <label className="block text-[#2F4A3E] font-bold text-sm mb-2">
              Tag / Category
            </label>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full sm:flex-1 p-4 border border-green-100 rounded-xl bg-white"
              >
                <option value="">Select or Create a Tag</option>
                {tags.map((tag) => (
                  <option key={tag._id} value={tag._id}>
                    {tag.name}
                  </option>
                ))}
              </select>

              <div className="flex gap-2">
                {form.category && (
                  <button
                    type="button"
                    onClick={() => deleteTag(form.category)}
                    className="p-3 bg-red-500 text-white rounded-xl"
                  >
                    <Trash2 size={16} />
                  </button>
                )}

                {!creatingTag && (
                  <button
                    type="button"
                    onClick={() => setCreatingTag(true)}
                    className="p-3 bg-[#5B8A72] text-white rounded-xl"
                  >
                    <Plus size={16} /> New
                  </button>
                )}
              </div>
            </div>

            {creatingTag && (
              <div className="mt-4 flex gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 p-3 border border-green-200 rounded-lg"
                  placeholder="e.g., Reflection"
                />

                <button
                  type="button"
                  onClick={createTag}
                  disabled={!newTag.trim()}
                  className={`px-4 py-2 font-semibold rounded-lg ${
                    !newTag.trim()
                      ? "bg-gray-300 text-gray-600"
                      : "bg-[#2F4A3E] text-white"
                  }`}
                >
                  Add
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCreatingTag(false);
                    setNewTag("");
                  }}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#2F4A3E] text-white font-bold text-lg rounded-xl shadow hover:bg-[#1a2f26] transition"
          >
            {loading ? "Saving Entry..." : "Save Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}
