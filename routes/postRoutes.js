const express = require("express");
const { getAllPosts, createPost, updatePost, getMyPosts, getPostById, deletePost } = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get("/", getAllPosts);
router.get("/get/:id", getPostById);

// Protected
router.get("/my-posts", authMiddleware, getMyPosts);
router.post("/create", authMiddleware, createPost);
router.put("/update/:id", authMiddleware, updatePost);
router.delete("/delete/:id", authMiddleware, deletePost);

module.exports = router;
