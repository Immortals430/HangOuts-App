const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }, 
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'comments'
    }],
    contentowner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

const Post = mongoose.model('posts', postSchema);
module.exports = Post;