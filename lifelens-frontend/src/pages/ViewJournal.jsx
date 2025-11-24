import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";

export default function ViewJournal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    title: "",
    content: "",
    mood: "",
    category: "",
    entryDate: "",
  });

  useEffect(() => {
    api
      .get(`/api/journal/${id}`)
      .then((res) => {
        const j = res.data.journal;
        setJournal(j);
        setForm({
          title: j.title,
          content: j.content,
          mood: j.mood,
          category: j.category,
          entryDate: j.entryDate?.slice(0, 10),
        });
      })
      .catch(() => navigate("/journals"))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleEditChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveChanges = async () => {
    await api.put(`/api/journal/${id}`, form);
    setEditMode(false);
    navigate(0); // reload page
  };

  const deleteEntry = async () => {
    if (!window.confirm("Delete this journal entry?")) return;
    await api.delete(`/api/journal/${id}`);
    navigate("/journals");
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#F6FBF7] pt-18">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#4A6651]">
            {editMode ? "Edit Entry" : "View Entry"}
          </h1>

          <button
            onClick={() => navigate("/journals")}
            className="px-4 py-2 bg-[#A8DADC] text-[#2C4A3E] rounded-xl shadow hover:bg-[#91c7c8]"
          >
            Back
          </button>
        </div>

        {/* CONTENT WRAPPER */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border border-[#E3EFE7]">
          {editMode ? (
            <>
              {/* TITLE */}
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleEditChange}
                className="w-full p-3 border rounded-xl font-semibold text-lg mb-4"
              />

              {/* CONTENT */}
              <textarea
                name="content"
                rows={8}
                value={form.content}
                onChange={handleEditChange}
                className="w-full p-3 border rounded-xl mb-4"
              />

              {/* MOOD + CATEGORY + DATE */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <select
                  name="mood"
                  value={form.mood}
                  onChange={handleEditChange}
                  className="p-3 border rounded-xl"
                >
                  <option value="happy">Happy</option>
                  <option value="sad">Sad</option>
                  <option value="angry">Angry</option>
                  <option value="anxious">Anxious</option>
                  <option value="neutral">Neutral</option>
                  <option value="excited">Excited</option>
                  <option value="other">Other</option>
                </select>

                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleEditChange}
                  className="p-3 border rounded-xl"
                  placeholder="Category"
                />

                <input
                  type="date"
                  name="entryDate"
                  value={form.entryDate}
                  onChange={handleEditChange}
                  className="p-3 border rounded-xl"
                />
              </div>

              {/* SAVE */}
              <div className="flex gap-4">
                <button
                  onClick={saveChanges}
                  className="px-6 py-3 bg-[#5B8A72] text-white rounded-xl shadow hover:bg-[#4B735E]"
                >
                  Save Changes
                </button>

                <button
                  onClick={() => setEditMode(false)}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl shadow hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-[#4A6651] mb-3">
                {journal.title}
              </h2>

              <p className="text-gray-700 whitespace-pre-line leading-relaxed mb-6">
                {journal.content}
              </p>

              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600 mb-10">
                <p><span className="font-semibold">Mood:</span> {journal.mood}</p>
                <p><span className="font-semibold">Category:</span> {journal.category || "—"}</p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(journal.entryDate).toDateString()}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-4">
                <button
                  onClick={() => setEditMode(true)}
                  className="px-6 py-3 bg-[#A8DADC] text-[#2C4A3E] rounded-xl shadow hover:bg-[#91c7c8]"
                >
                  Edit
                </button>

                <button
                  onClick={deleteEntry}
                  className="px-6 py-3 bg-red-400 text-white rounded-xl shadow hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
