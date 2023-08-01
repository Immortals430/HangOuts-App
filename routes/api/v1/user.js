const express = require('express');
const passport = require('../../../config/passportLocal');
const router = express.Router();
const userController = require('../../../controllers/api/v1/userController');

router.get('/profile', userController.profile)
router.post('/updateUser', userController.updateUser)
router.post('/signIn', passport.authenticate('local', {failureRedirect: '/signUpPage'}), userController.signIn);
router.post('/signUp', userController.signUp);
router.get('/logOut', userController.logOut);

module.exports = router;