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
    stars: {
      type: Number,
      default: 0,
     }, // Optional field for rating
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Comment", commentSchema);