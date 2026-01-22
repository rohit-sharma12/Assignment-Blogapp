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
    // username: {
    //     type: String,
    //     required: [true, 'passwords required']
    // }
}, { timestamps: true });

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;