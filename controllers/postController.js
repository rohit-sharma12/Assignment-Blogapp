const postModel = require('../model/post');

exports.getAllPosts = async (req, res) => {
    try {
        const { search = "", page = 1, limit = 10 } = req.query;

        const query = {
            $or: [
                { title: { $regex: search, $options: "i" } },
                { username: { $regex: search, $options: "i" } },
            ],
        };

        const posts = await postModel.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await postModel.countDocuments(query);

        res.json({
            posts,
            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


exports.createPost = async (req, res) => {
    try {
        const { title, imageURL, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        if (content.length < 50) {
            return res
                .status(400)
                .json({ message: "Content must be at least 50 characters" });
        }

        const post = await postModel.create({
            title,
            imageURL,
            content,
            username: req.user.username,
            userId: req.user.userId,
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


exports.updatePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        console.log('Fetched post:', post);
        if (!post.userId) {
            console.error('userId is missing in post:', post);
            return res.status(500).json({ message: "Post is missing userId" });
        }
        if (post.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const updatedPost = await postModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedPost);
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: "Server error" });
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await post.deleteOne();

        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.getMyPosts = async (req, res) => {
    try {
        const posts = await postModel.find({ userId: req.user.userId })
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};