const Comment = require('../../../models/Comment');
const Post = require('../../../models/Post');




module.exports.postComment = async (req, res)=>{
    try{
        postList = await Post.findById(req.params.id);
      
        commentList = await Comment.create({
            content: req.body.content,
            post: req.params.id,
            contentowner: req.user._id
        });

        postList.comments.push(commentList._id)
        postList.save()
    
        res.redirect('back')
    }
    catch(err){
        console.log(err)
    }
}




module.exports.deleteComment = async (req, res)=>{
    try{
        commentList = await Comment.findByIdAndDelete(req.params.id);
        postList = await Post.findByIdAndUpdate(commentList.post, {$pull: {comments: req.params.id}});

        res.redirect('back')
    }
    catch(err){
        console.log(err)
    }
}