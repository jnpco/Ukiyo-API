const express = require('express');
const router = express.Router();

const Controller = require('../controller');

router.get('/:threadId', Controller.Post.getAllPosts);
router.post('/', Controller.Post.createPost);
router.delete('/:postId', Controller.Post.deletePost);

module.exports = router;