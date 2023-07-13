const express = require('express');
const router = express.Router();

const postsRouter = require('./posts.route');
const usersRouter = require('./users.route');
const commentsRouter = require('./comments.route');

router.use('/posts/', postsRouter);
router.use('/sign/', usersRouter);
router.use('/posts/', commentsRouter);

module.exports = router;
