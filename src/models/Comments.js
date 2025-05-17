const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    image: {
      type: String, // URL to profile photo or avatar
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package", // Optional: comment belongs to a package
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Comment", commentSchema);