const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentCtrl");

router.post("/", commentCtrl.addComment);
router.get("/", commentCtrl.getAllComments);
router.get("/package/:packageId", commentCtrl.getCommentsByPackage);
router.delete("/:id", commentCtrl.deleteComment);
router.put("/:id", commentCtrl.updateComment); // optional

module.exports = router;