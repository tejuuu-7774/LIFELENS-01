import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";

export default function ViewJournal() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [journal, setJournal] = useState(null);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const [renamingTag, setRenamingTag] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  const [form, setForm] = useState({
    title: "",
    content: "",
    mood: "",
    category: "",
    entryDate: "",
  });

  // Load journal + tags
  const loadJournalAndTags = async () => {
    try {
      const [journalRes, tagsRes] = await Promise.all([
        api.get(`/api/journal/${id}`),
        api.get("/api/tags"),
      ]);
      const j = journalRes.data.journal;
      setJournal(j);
      setTags(tagsRes.data.tags || []);
      setForm({
        title: j.title || "",
        content: j.content || "",
        mood: j.mood || "neutral",
        category: j.category?._id || "",
        entryDate: j.entryDate ? j.entryDate.slice(0, 10) : "",
      });
    } catch (err) {
      // If something is wrong, go back to list
      console.log(err);
      navigate("/journals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJournalAndTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Save journal edits
  const saveChanges = async () => {
    try {
      await api.put(`/api/journal/${id}`, form);
      // Refresh journal from server so populated category name is current
      const res = await api.get(`/api/journal/${id}`);
      setJournal(res.data.journal);
      setEditMode(false);
      setRenamingTag(false);
      setRenameValue("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save changes");
    }
  };

  // Cancel edits and revert form to last-saved journal
  const cancelEdit = () => {
    if (!journal) {
      setForm({
        title: "",
        content: "",
        mood: "neutral",
        category: "",
        entryDate: "",
      });
    } else {
      setForm({
        title: journal.title || "",
        content: journal.content || "",
        mood: journal.mood || "neutral",
        category: journal.category?._id || "",
        entryDate: journal.entryDate ? journal.entryDate.slice(0, 10) : "",
      });
    }
    setEditMode(false);
    setRenamingTag(false);
    setRenameValue("");
  };

  // Delete entry
  const deleteEntry = async () => {
    try {
      if (!window.confirm("Delete this journal entry?")) return;
      await api.delete(`/api/journal/${id}`);
      navigate("/journals");
    } catch (err) {
      console.error(err);
      alert("Failed to delete entry");
    }
  };

  // Rename tag (inline)
  const renameTag = async () => {
    if (!form.category) return alert("Select a tag first");
    if (!renameValue.trim()) return alert("Enter a name for the tag");

    try {
      await api.put(`/api/tags/${form.category}`, { name: renameValue.trim() });

      // Refresh tags and journal (so populated category name updates)
      const [tagsRes, journalRes] = await Promise.all([
        api.get("/api/tags"),
        api.get(`/api/journal/${id}`),
      ]);
      setTags(tagsRes.data.tags || []);
      setJournal(journalRes.data.journal);
      // if the renamed tag is currently selected in form, keep the selection
      setForm((p) => ({ ...p, category: p.category }));
      setRenamingTag(false);
      setRenameValue("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to rename tag");
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F6FBF7] to-[#F0FAF6] pt-20">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#2f513f]">
            {editMode ? "Edit Entry" : "View Entry"}
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/journals")}
              className="px-4 py-2 bg-white border border-[#D9EAE0] rounded-lg shadow-sm text-sm text-[#3E5A44] hover:bg-[#f8fbf9]"
            >
              Back
            </button>
            {!editMode && (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-[#A8DADC] text-[#21403a] rounded-lg shadow-sm text-sm hover:bg-[#91c7c8]"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#E6F0EA] p-8">
          {/* EDIT MODE */}
          {editMode ? (
            <>
              <div className="space-y-4">
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="w-full text-xl md:text-2xl font-semibold p-4 rounded-lg border border-[#E8F0EA] focus:ring-2 focus:ring-[#cfe8e0]"
                />

                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  rows={8}
                  placeholder="Write your thoughts..."
                  className="w-full p-4 rounded-lg border border-[#E8F0EA] focus:ring-2 focus:ring-[#cfe8e0] text-gray-800 leading-relaxed"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    name="mood"
                    value={form.mood}
                    onChange={handleChange}
                    className="p-3 rounded-lg border border-[#E8F0EA]"
                  >
                    <option value="happy">happy</option>
                    <option value="sad">sad</option>
                    <option value="angry">angry</option>
                    <option value="anxious">anxious</option>
                    <option value="neutral">neutral</option>
                    <option value="excited">excited</option>
                    <option value="other">other</option>
                  </select>

                  {/* Tag select + rename */}
                  <div>
                    <div className="flex gap-2">
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="flex-1 p-3 rounded-lg border border-[#E8F0EA]"
                      >
                        <option value="">No Tag</option>
                        {tags.map((t) => (
                          <option key={t._id} value={t._id}>
                            {t.name}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => {
                          if (!form.category) return alert("Select a tag to rename");
                          setRenamingTag(true);
                          const current = tags.find((tt) => tt._id === form.category);
                          setRenameValue(current?.name || "");
                        }}
                        className="px-3 py-2 bg-[#f0f7f6] border border-[#dbeee5] rounded-lg text-sm"
                      >
                        ✏
                      </button>
                    </div>

                    {renamingTag && (
                      <div className="flex gap-2 mt-2">
                        <input
                          type="text"
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          className="flex-1 p-2 rounded-lg border border-[#E8F0EA]"
                          placeholder="New tag name"
                        />
                        <button
                          type="button"
                          onClick={renameTag}
                          className="px-4 py-2 bg-[#5B8A72] text-white rounded-lg"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setRenamingTag(false);
                            setRenameValue("");
                          }}
                          className="px-4 py-2 bg-gray-200 rounded-lg text-sm text-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  <input
                    name="entryDate"
                    type="date"
                    value={form.entryDate}
                    onChange={handleChange}
                    className="p-3 rounded-lg border border-[#E8F0EA]"
                  />
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 mt-4">
                  <button
                    type="button"
                    onClick={saveChanges}
                    className="px-5 py-2 bg-[#2f6f56] text-white rounded-lg shadow-sm"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-5 py-2 bg-white border border-[#E6F0EA] rounded-lg text-[#3E5A44]"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={deleteEntry}
                    className="ml-auto px-4 py-2 bg-red-400 text-white rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* VIEW MODE */
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2f513f] mb-3">{journal.title}</h2>

              <div className="flex items-center gap-3 mb-6">
                {journal.category?.name && (
                  <span className="px-3 py-1 bg-[#E8F7EF] text-[#2f6549] rounded-full text-sm font-medium">
                    #{journal.category.name}
                  </span>
                )}

                <span className="px-3 py-1 bg-[#DDF4F7] text-[#21565f] rounded-full text-sm font-medium">
                  {journal.mood}
                </span>

                <span className="text-sm text-gray-500 ml-auto">
                  {new Date(journal.entryDate).toDateString()}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">{journal.content}</p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-[#A8DADC] text-[#21403a] rounded-lg"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={deleteEntry}
                  className="px-4 py-2 bg-red-400 text-white rounded-lg"
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
