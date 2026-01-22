const express = require("express");
const { getAllPosts, createPost } = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Public
router.get("/", getAllPosts);
// router.get("/:id", getPostById);

// Protected
router.post("/create", authMiddleware, createPost);
// router.put("/:id", authMiddleware, updatePost);
// router.delete("/:id", authMiddleware, deletePost);

module.exports = router;
