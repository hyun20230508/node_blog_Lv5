const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth-middleware');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.findAllPost);
router.get('/detail/:postId', postsController.findOnePost);
router.get('/likePosts', authMiddleware, postsController.findLikeAllPost);
router.post('/', authMiddleware, postsController.createPost);
router.put('/:postId', authMiddleware, postsController.updatePost);
router.delete('/:postId', authMiddleware, postsController.deletePost);
router.patch('/:postId/like', authMiddleware, postsController.likePost);

module.exports = router;
