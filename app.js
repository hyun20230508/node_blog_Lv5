const express = require('express');
const cookiParser = require('cookie-parser');
const dotenv = require('dotenv');
const app = express();
const port = 3002;

dotenv.config();
const userRouter = require('./router/users.route.js');
// const postsRouter = require('./router/posts.route.js');
const commentRouter = require('./router/comments.route.js');
const router = require('./router');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiParser());
app.use('/api', [userRouter, router, commentRouter]);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
