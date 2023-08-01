const User = require('../../../models/User')
const path = require('path')
const fs = require('fs')



module.exports.signIn = (req, res)=>{
    res.redirect('/');
}




module.exports.signUp = async (req, res)=>{
    try{
        userList = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.redirect('/signInPage')
    }
    catch(err){
        console.log(err)
    } 
}




module.exports.profile = async (req, res)=>{
    try{
        userList = await User.findById(req.user._id)
        res.render('profile', {userList: userList})
    }
    catch(err){
        console.log(err)
    }

}

    


module.exports.updateUser = async (req, res)=>{
    try{
        User.uploadAvatar(req, res, async (err)=>{

            if(req.body.username){
                userList = await User.findByIdAndUpdate(req.user._id, {username: req.body.username});
            }
            if(req.body.email){
                userList = await User.findByIdAndUpdate(req.user._id, {username: req.body.email});
            } 
    
            if(req.file){
    
                userList = await User.findById(req.user);
         
                if(userList.avatar){
                    fs.unlinkSync(path.join(__dirname, '../../..', userList.avatar));
                }
    
                userList.avatar = User.avatarPath + '/' + req.file.filename;
                userList.save();
            }
        })
        res.redirect('back')

    }
    catch(err){
        console.log(err)
    }
}




module.exports.logOut = (req, res)=>{
    req.logOut(()=>{
        res.redirect('/signInPage');
    })
}

