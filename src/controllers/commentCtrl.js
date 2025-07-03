const Comment = require("../models/Comments");

const commentCtrl = {
  // Add a new comment
  addComment: async (req, res) => {
    try {
      const { fullName, comment, package: packageId } = req.body;

      const newComment = new Comment({
        fullName,
        comment,
        package: packageId || null,
      });

      await newComment.save();
      res.status(201).json({ message: "Comment added successfully", comment: newComment });
    } catch (err) {
      res.status(500).json({ message: "Failed to add comment", error: err.message });
    }
  },

  // Get all comments
  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.find().populate("package", "name");
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json({ message: "Failed to get comments", error: err.message });
    }
  },

  // Get comments by package ID
  getCommentsByPackage: async (req, res) => {
    try {
      const { packageId } = req.params;
      const comments = await Comment.find({ package: packageId });
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json({ message: "Failed to get comments for this package", error: err.message });
    }
  },

  // Delete comment
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      await Comment.findByIdAndDelete(id);
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Failed to delete comment", error: err.message });
    }
  },

  // (Optional) Update comment
  updateComment: async (req, res) => {
    try {
      const { id } = req.params;
      const updated = await Comment.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ message: "Comment updated", comment: updated });
    } catch (err) {
      res.status(500).json({ message: "Failed to update comment", error: err.message });
    }
  },
};

module.exports = commentCtrl;