const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required']
    },
    imageURL: {
        type: String,
        required: [true, 'image is required']
    },
    content: {
        type: String,
        required: [true, 'content required']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;