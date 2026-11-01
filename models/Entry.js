const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    entryBody: {
      type: String,
      maxLength: 350,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;
