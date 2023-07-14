const PostService = require('../services/posts.service');

class PostsController {
  postService = new PostService();

  //게시글 전체 조회
  findAllPost = async (req, res, next) => {
    try {
      const posts = await this.postService.findAllPost();
      return res.status(200).json({ data: posts });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: '게시글 전체 조회에 실패했습니다.' });
    }
  };

  //게시글 상세 조회
  findOnePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await this.postService.findOnePost(postId);
      return res.status(200).json({ data: post });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: '게시글 상세 조회에 실패했습니다.' });
    }
  };

  //좋아요 게시글 조회
  findLikeAllPost = async (req, res, next) => {
    try {
      const userId = res.locals.user;
      const likePost = await this.postService.findLikeAllPost(userId);
      res.status(200).json({ data: likePost });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: '좋아요 게시글 조회에 실패했습니다.' });
    }
  };

  //게시글 작성
  createPost = async (req, res, next) => {
    try {
      const userId = res.locals.user;
      const { title, content } = req.body;
      const createPostData = await this.postService.createPost(
        userId,
        title,
        content
      );

      return res.status(201).json({ data: createPostData });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: '게시글 작성에 실패했습니다.' });
    }
  };

  //게시글 수정
  updatePost = async (req, res, next) => {
    try {
      const userId = res.locals.user;
      const { postId } = req.params;
      const { title, content } = req.body;
      const [updatePostData] = await this.postService.updatePost(
        userId,
        postId,
        title,
        content
      );

      if (!updatePostData) {
        return res.status(400).json({ data: '게시글 수정에 실패했습니다.' });
      }
      return res.status(201).json({ data: '게시글 수정에 성공했습니다.' });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: '게시글 수정에 실패했습니다.' });
    }
  };

  //게시글 삭제
  deletePost = async (req, res, next) => {
    try {
      const userId = res.locals.user;
      const { postId } = req.params;
      const deletePostData = await this.postService.deletePost(userId, postId);

      if (!deletePostData) {
        return res.status(400).json({ data: '게시글 삭제에 실패했습니다.' });
      }
      return res.status(201).json({ data: '게시글 삭제에 성공했습니다.' });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: '게시글 삭제에 실패했습니다.' });
    }
  };

  //좋아요
  likePost = async (req, res, next) => {
    try {
      const userId = res.locals.user;
      const { postId } = req.params;
      const likePostData = await this.postService.likePost(userId, postId);

      return res.status(201).json({ data: likePostData });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: '좋아요 변경에 실패했습니다.' });
    }
  };
}

module.exports = PostsController;
