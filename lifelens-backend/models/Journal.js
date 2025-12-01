const mongoose = require("mongoose");

const JournalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },

    mood: {
      type: String,
      enum: ["happy", "sad", "angry", "anxious", "neutral", "excited", "other"],
      default: "neutral",
      index: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
      index: true
    },

    emotionalScore: { type: Number, min: 0, max: 100, default: 50 },
    entryDate: { type: Date, default: Date.now, index: true }
  },
  { timestamps: true }
);

JournalSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Journal", JournalSchema);
