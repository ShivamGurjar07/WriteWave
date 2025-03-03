const express = require("express");
const Comment = require("../models/comment");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");

const router = express.Router();
const authenticateUser = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  jwt.verify(token, process.env.JWT_SECRET || "shivam", {}, (err, userInfo) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = userInfo;
    next();
  });
};

// 1. Add a Comment
router.post("/:postId", authenticateUser, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentComment } = req.body;
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ error: "Post not found" });
    }
    const newComment = await Comment.create({
      content,
      author: req.user.id,
      post: postId,
      parentComment: parentComment || null, // null for top-level comments
    });
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 2. Get Comments for a Post (including nested comments)
router.get("/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .populate("author", "username")
      .sort({ createdAt: 1 });

    const buildNestedComments = (parentId = null) => {
      return comments
        .filter((comment) => String(comment.parentComment) === String(parentId))
        .map((comment) => ({
          ...comment.toObject(),
          replies: buildNestedComments(comment._id),
        }));
    };

    res.json(buildNestedComments());
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 3. Edit a Comment
router.put("/:commentId", authenticateUser, async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (String(comment.author) !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    comment.content = content;
    await comment.save();
    res.json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 4. Delete a Comment (along with its replies)
router.delete("/:commentId", authenticateUser, async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (String(comment.author) !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await Comment.deleteMany({ $or: [{ _id: commentId }, { parentComment: commentId }] });
    res.json({ message: "Comment and its replies deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
