const mongoose = require("mongoose");

const HighlightSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    image: {
      type: String, 
      default: ""
    },

    journals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Journal"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Highlight", HighlightSchema);
