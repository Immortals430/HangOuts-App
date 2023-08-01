const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const avatarPath = path.join('/uploads/images/avatars')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', avatarPath))
    },
    filename: function (req, file, cb) {
      cb(null, 'avatar' + '-' + Date.now())
    }
  });


userSchema.statics.uploadAvatar =  multer({ storage: storage }).single('avatar');
userSchema.statics.avatarPath = avatarPath;


const User = mongoose.model('users', userSchema);
module.exports = User;

