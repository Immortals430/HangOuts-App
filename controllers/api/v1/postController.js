const Post = require('../../../models/Post')
const Comment = require('../../../models/Comment')




module.exports.createPost = async (req, res)=>{
    try{
        postList = await Post.create({
            content: req.body.content.trim(),
            contentowner: req.user._id
        });

        res.redirect('back');
    }
    catch(err){
        console.log(err);
    }    
}




module.exports.deletePost = async (req, res)=>{
    try{
        commentList = await Comment.deleteMany({post: req.params.id})
        postList = await Post.findByIdAndDelete(req.params.id);
        
        res.redirect('back');
    }
    catch(err){
        console.log(err)
    }
}
    