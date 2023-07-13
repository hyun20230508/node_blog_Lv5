const CommentService = require('../services/comments.service');

class CommentsController {
  commentService = new CommentService();

  //게시글 댓글 조회
  findComments = async (req, res, next) => {
    try {
      const { postId } = req.params;

      const commentsData = await this.commentService.findComments(postId);
      return res.status(200).json({ data: commentsData });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: '댓글 조회에 실패했습니다.' });
    }
  };

  //댓글 작성
  createComment = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId } = req.params;
      const { comment } = req.body;
      if (comment.length === 0) {
        return res.status(403).json({
          message: '댓글 내용을 입력해주세요.',
        });
      }

      const createCommentData = await this.commentService.createComment(
        userId,
        postId,
        comment
      );
      return res.status(200).json({ data: createCommentData });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: '댓글 작성에 실패했습니다.' });
    }
  };

  //게시글 수정
  updateComment = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId, commentId } = req.params;
      const { comment } = req.body;

      if (comment.length === 0) {
        return res.status(403).json({
          message: '댓글 내용을 입력해주세요.',
        });
      }

      const findComment = await this.commentService.findComment(commentId);
      if (!findComment) {
        return res.status(404).json({
          message: '해당 댓글이 존재하지 않습니다.',
        });
      }
      if (findComment.UserId !== userId) {
        return res.status(404).json({
          message: '수정 권한이 존재하지 않습니다.',
        });
      }

      const updateCommentData = await this.commentService.updateComment(
        postId,
        commentId,
        comment
      );

      return res.status(200).json({ message: updateCommentData });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: '댓글 수정에 실패했습니다.' });
    }
  };

  //게시글 삭제
  deleteComment = async (req, res, next) => {
    try {
      const { userId } = res.locals.user;
      const { postId, commentId } = req.params;

      const findComment = await this.commentService.findComment(commentId);
      if (!findComment) {
        return res.status(404).json({
          message: '해당 댓글이 존재하지 않습니다.',
        });
      }
      if (findComment.UserId !== userId) {
        return res.status(404).json({
          message: '삭제 권한이 존재하지 않습니다.',
        });
      }

      const deleteCommentData = await this.commentService.deleteComment(
        postId,
        commentId
      );

      return res.status(200).json({ message: deleteCommentData });
    } catch (error) {
      return res
        .status(400)
        .json({ errorMessage: '댓글 삭제에 실패했습니다.' });
    }
  };
}

module.exports = CommentsController;
