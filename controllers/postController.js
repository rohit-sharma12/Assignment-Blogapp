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
