const Post = require('../../../models/Post')
const User = require('../../../models/User')




module.exports.homePage = async (req, res)=>{
    try{
        userList = await User.findById(req.user._id)
        postList = await Post.find({})
        .populate('comments')
        .exec();
        res.render('homePage', {
            postList: postList,
            userList: userList});
    }
    catch(err){
        console.log(err)
    }  
}





module.exports.signInPage = (req, res)=>{
    res.render('signInPage');
}




module.exports.signUpPage = (req, res)=>{
    res.render('signUpPage');
}

