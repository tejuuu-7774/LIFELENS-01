import { useEffect, useState, useCallback } from "react";
import api from "../utils/api";
import Cropper from "react-easy-crop";

export default function Highlights() {
  const [highlights, setHighlights] = useState([]);
  const [journals, setJournals] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  const [adding, setAdding] = useState(false);
  const [selected, setSelected] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    journals: []
  });

  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const load = async () => {
    const res = await api.get("/api/highlights");
    setHighlights(res.data.highlights);
  };

  const loadJournals = async () => {
    const res = await api.get("/api/journal");
    setJournals(res.data.journals || []);
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = async () => {
    await loadJournals();
    setAdding(true);
    setSelected(null);
    setForm({
      title: "",
      description: "",
      image: "",
      journals: []
    });
    setShowModal(true);
  };

  const openEdit = async (item) => {
    await loadJournals();
    setAdding(false);
    setSelected(item);
    setForm({
      title: item.title,
      description: item.description,
      image: item.image || "",
      journals: item.journals?.map(j => j._id) || []
    });
    setShowModal(true);
  };

  const toggleJournalSelect = (id) => {
    setForm((prev) => {
      const selected = prev.journals.includes(id)
        ? prev.journals.filter((x) => x !== id)
        : [...prev.journals, id];
      return { ...prev, journals: selected };
    });
  };

  const handleFileInput = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCropImageSrc(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const getCroppedImg = async (imageSrc, pixelCrop) => {
    const image = new Image();
    image.src = imageSrc;

    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return canvas.toDataURL("image/jpeg");
  };

  const saveCroppedImage = async () => {
    const cropped = await getCroppedImg(cropImageSrc, croppedAreaPixels);
    setForm((prev) => ({ ...prev, image: cropped }));
    setShowCropper(false);
  };

  const save = async () => {
    if (adding) {
      await api.post("/api/highlights", form);
    } else {
      await api.put(`/api/highlights/${selected._id}`, form);
    }
    setShowModal(false);
    load();
  };

  const remove = async () => {
    await api.delete(`/api/highlights/${selected._id}`);
    setShowModal(false);
    load();
  };

  return (
    <div className="mt-10">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-[#2f513f]">Highlights</h2>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-[#5B8A72] text-white rounded-lg hover:bg-[#4B735E]"
        >
          + Add
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {highlights.map((h) => (
          <div
            key={h._id}
            className="cursor-pointer"
            onClick={() => openEdit(h)}
          >
            <div className="h-32 rounded-xl border border-[#CDE7D6] overflow-hidden bg-[#E6F3EC] shadow-sm">
              {h.image ? (
                <img src={h.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#4A6651] font-semibold">
                  Upload Photo
                </div>
              )}
            </div>
            <p className="mt-1 text-center text-sm text-[#527964] truncate">
              {h.title}
            </p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-[#2f513f] mb-4">
              {adding ? "Add Highlight" : "Edit Highlight"}
            </h3>

            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              placeholder="Title"
              className="w-full p-3 border rounded-lg mb-4 bg-[#F8FBF9] border-[#DCEFE3]"
            />

            <textarea
              rows={4}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Description"
              className="w-full p-3 border rounded-lg bg-[#F8FBF9] border-[#DCEFE3]"
            />

            <div className="my-4">
              <label className="block mb-2 text-[#4A6651]">Photo</label>

              <button
                onClick={() => document.getElementById("imgUpload").click()}
                className="px-4 py-2 bg-[#5B8A72] text-white rounded-lg hover:bg-[#4B735E]"
              >
                Upload Photo
              </button>

              <input
                id="imgUpload"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />

              {form.image && (
                <img
                  src={form.image}
                  alt="preview"
                  className="mt-3 w-full h-48 object-cover rounded-lg border"
                />
              )}
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-[#2f513f] mb-2">
                Select Journals
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {journals.map((j) => (
                  <div
                    key={j._id}
                    className={`p-3 rounded-lg cursor-pointer transition border ${
                      form.journals.includes(j._id)
                        ? "border-[#5B8A72] bg-[#E6F3EC]"
                        : "border-gray-300"
                    }`}
                    onClick={() => toggleJournalSelect(j._id)}
                  >
                    <p className="font-semibold text-[#2f513f]">
                      {j.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(j.entryDate).toDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              {!adding && (
                <button
                  onClick={remove}
                  className="px-4 py-2 bg-[#D1E8D8] text-[#274137] rounded-lg hover:bg-[#C3DEC9]"
                >
                  Delete
                </button>
              )}
              <button
                onClick={() => {
                  setShowModal(false);
                  setAdding(false);
                }}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={save}
                className="px-4 py-2 bg-[#5B8A72] text-white rounded-lg hover:bg-[#4B735E]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showCropper && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl">
            <div className="relative w-full h-64">
              <Cropper
                image={cropImageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowCropper(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={saveCroppedImage}
                className="px-4 py-2 bg-[#5B8A72] text-white rounded-lg hover:bg-[#4B735E]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
