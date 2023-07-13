const CommentRepository = require('../repositories/comments.repository');

class CommentService {
  commentRepository = new CommentRepository();
  //게시글 댓글 조회
  findComments = async (postId) => {
    const commentsData = await this.commentRepository.findComments(postId);

    return commentsData;
  };

  //댓글 작성
  createComment = async (userId, postId, comment) => {
    const createCommentData = await this.commentRepository.createComment(
      userId,
      postId,
      comment
    );
    return createCommentData;
  };

  //댓글 존재여부 확인
  findComment = async (commentId) => {
    const findCommentData = await this.commentRepository.findComment(commentId);

    return findCommentData;
  };

  //댓글 수정
  updateComment = async (postId, commentId, comment) => {
    const updateCommentData = await this.commentRepository.updateComment(
      postId,
      commentId,
      comment
    );

    return updateCommentData;
  };

  //댓글 삭제
  deleteComment = async (postId, commentId) => {
    const deleteCommentData = await this.commentRepository.deleteComment(
      postId,
      commentId
    );

    return deleteCommentData;
  };
}

module.exports = CommentService;
