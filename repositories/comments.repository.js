const { Op } = require('sequelize');
const { Users, Comments } = require('../models');

class CommentRepository {
  //게시글 댓글 조회
  findComments = async (postId) => {
    const findCommentsData = await Comments.findAll({
      attributes: [
        'commentId',
        'userId',
        'postId',
        'comment',
        'createdAt',
        'updatedAt',
        [
          sequelize.literal(
            '(SELECT nickname FROM Users WHERE userId = Posts.userId)'
          ),
          'nickname',
        ],
      ],
      order: [['createdAt', 'DESC']],
      where: { postId },
    });

    return findCommentsData;
  };

  //댓글 작성
  createComment = async (userId, postId, comment) => {
    const createCommentData = await Comments.create({
      PostId: postId,
      UserId: userId,
      comment,
    });

    return createCommentData;
  };

  //댓글 존재여부 확인
  findComment = async (commentId) => {
    const findeCommentData = await Comments.findOne({
      where: { commentId },
    });
    return findeCommentData;
  };

  //댓글 수정
  updateComment = async (postId, commentId, comment) => {
    await Comments.update(
      { comment },
      {
        where: {
          [Op.and]: [{ postId }, { commentId }],
        },
      }
    );

    return '댓글이 수정되었습니다.';
  };

  //댓글 삭제
  deleteComment = async (postId, commentId) => {
    await Comments.destroy({
      where: {
        [Op.and]: [{ postId }, { commentId }],
      },
    });

    return '댓글이 삭제되었습니다.';
  };
}

module.exports = CommentRepository;
