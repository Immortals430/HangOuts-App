
const express = require('express');
const router = express.Router();
const postController = require('../../../controllers/api/v1/postController');
const passport = require('../../../config/passportLocal');


router.post('/createPost', passport.checkAuthentication, postController.createPost);
router.get('/deletePost/:id', passport.checkAuthentication, postController.deletePost)

module.exports = router;