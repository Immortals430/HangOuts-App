const express = require('express');
const passport = require('../../../config/passportLocal');
const router = express.Router();
const homeController = require('../../../controllers/api/v1/homeController');


router.use('/user', require('./user'));
router.use('/post', require('./post'));
router.use('/comment', require('./comment'))

router.get('/', passport.checkAuthentication, homeController.homePage);
router.get('/signInPage', homeController.signInPage);
router.get('/signUpPage', homeController.signUpPage);


module.exports = router;