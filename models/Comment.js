const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    },    
    contentowner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;



