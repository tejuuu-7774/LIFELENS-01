import { useState, useEffect } from "react";
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
    try {
      const res = await api.get("/api/ai/starter");
      setStarter(res.data.starter);
    } catch (err) {
      console.log(err);
    }
    setStarterLoading(false);
  };

  const createTag = async () => {
    if (!newTag.trim()) return;
    const res = await api.post("/api/tags", { name: newTag });
    setTags((prev) => [...prev, res.data.tag]);
    setForm((prev) => ({ ...prev, category: res.data.tag._id }));
    setNewTag("");
    setCreatingTag(false);
  };

  const deleteTag = async (tagId) => {
    if (!window.confirm("Delete this tag?")) return;
    await api.delete(`/api/tags/${tagId}`);
    setTags((prev) => prev.filter((t) => t._id !== tagId));
    setForm((prev) => ({ ...prev, category: "" }));
  };

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
        <h1 className="text-3xl font-bold text-[#4A6651] mb-6">Add New Journal Entry</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-lg border border-[#E3EFE7] space-y-6"
        >
          <button
            type="button"
            onClick={fetchStarter}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            {starterLoading ? "Thinking..." : "Give me a starter"}
          </button>

          {starter && (
            <div className="p-3 mt-2 bg-gray-100 rounded-xl text-sm italic">{starter}</div>
          )}

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

          <div>
            <label className="block text-[#4A6651] font-medium mb-1">What happened today?</label>
            <textarea
              name="content"
              rows={6}
              required
              value={form.content}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-[#A8DADC]"
              placeholder="Write your thoughts..."
            />
          </div>

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

          <div>
            <label className="block text-[#4A6651] font-medium mb-1">Tag</label>

            <div className="flex items-center gap-2 mb-3">
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="flex-1 p-3 border rounded-xl"
              >
                <option value="">Select a Tag</option>
                {tags.map((tag) => (
                  <option key={tag._id} value={tag._id}>
                    {tag.name}
                  </option>
                ))}
              </select>

              {form.category && (
                <button
                  type="button"
                  onClick={() => deleteTag(form.category)}
                  className="px-3 py-2 bg-red-400 text-white rounded-xl"
                >
                  Delete
                </button>
              )}
            </div>

            {!creatingTag ? (
              <button
                type="button"
                onClick={() => setCreatingTag(true)}
                className="text-[#5B8A72] text-sm font-medium hover:underline"
              >
                + Create new tag
              </button>
            ) : (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 p-2 border rounded-xl"
                />
                <button
                  type="button"
                  onClick={createTag}
                  className="px-4 py-2 bg-[#5B8A72] text-white rounded-xl"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setCreatingTag(false)}
                  className="px-4 py-2 bg-gray-300 rounded-xl"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-[#4A6651] font-medium mb-1">Entry Date</label>
            <input
              type="date"
              name="entryDate"
              value={form.entryDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#5B8A72] text-white rounded-xl"
          >
            {loading ? "Saving..." : "Save Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}
