const express = require('express');
const router = express.Router()
const commentController = require('../../../controllers/api/v1/commentController')

router.post('/postComment/:id', commentController.postComment);
router.get('/deleteComment/:id', commentController.deleteComment)


module.exports = router;