const { Op } = require('sequelize');
const { Posts, Users, Likes, sequelize } = require('../models');
const { Transaction } = require('sequelize');

class PostRepository {
  //전체 게시글 조회
  findAllPost = async () => {
    const posts = await Posts.findAll({
      attributes: [
        'postId',
        'title',
        'likeCount',
        'createdAt',
        'updatedAt',
        [
          sequelize.literal(
            '(SELECT nickname FROM Users WHERE userId = Posts.userId)'
          ),
          'nickname',
        ],
        'usreId',
      ],
      order: [['createdAt', 'DESC']],
      raw: true,
      nest: true,
    });

    return posts;
  };

  //게시글 상세 조회
  findOnePost = async (postId) => {
    const post = await Posts.findOne({
      attributes: [
        'postId',
        'title',
        'content',
        'likeCount',
        'createdAt',
        'updatedAt',
        [
          sequelize.literal(
            '(SELECT nickname FROM Users WHERE userId = Posts.userId)'
          ),
          'nickname',
        ],
        'usreId',
      ],
      where: { postId },
      raw: true,
      nest: true,
    });

    return post;
  };

  //좋아요 게시글 조회
  findLikeAllPost = async (userId) => {
    const likesPosts = await Likes.findAll({
      attributes: [],
      include: [
        {
          model: Posts,
          attributes: [
            'postId',
            'title',
            'likeCount',
            'createdAt',
            'updatedAt',
            [
              sequelize.literal(
                '(SELECT nickname FROM Users WHERE userId = Posts.userId)'
              ),
              'nickname',
            ],
            'usreId',
          ],
        },
      ],
      where: {
        UserId: userId,
      },
      order: [[{ model: Posts }, 'likeCount', 'DESC']],
      raw: true,
      nest: true,
    });

    return likesPosts;
  };

  //게시글 작성
  createPost = async (userId, title, content) => {
    const createPostData = await Posts.create({
      UserId: userId,
      title,
      content,
      likeCount: 0,
    });

    return createPostData;
  };

  //게시글 수정
  updatePost = async (userId, postId, title, content) => {
    const updatePostData = await Posts.update(
      { title, content },
      {
        where: {
          [Op.and]: [{ postId }, { UserId: userId }],
        },
      }
    );

    return updatePostData;
  };

  //게시글 삭제
  deletePost = async (userId, postId) => {
    const deletePostData = await Posts.destroy({
      where: { [Op.and]: [{ postId }, { UserId: userId }] },
    });

    return deletePostData;
  };

  //좋아요
  likePost = async (userId, postId) => {
    try {
      const post = await Posts.findOne({
        attributes: ['postId', 'likeCount', 'UserId'],
        where: { postId },
      });
      if (!post) {
        return '존재하지 않는 게시글 입니다.';
      }
      if (userId == post.UserId) {
        return '자신의 글에는 좋아요를 누를 수 없습니다.';
      }

      const likes = await Likes.findOne({
        where: { [Op.and]: [{ PostId: postId }, { UserId: userId }] },
      });

      const t = await sequelize.transaction({
        isolationLeverl: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
      });
      try {
        if (!likes) {
          await Likes.create(
            {
              UserId: userId,
              PostId: postId,
            },
            { transaction: t }
          );

          await post.update(
            { likeCount: post.likeCount + 1 },
            { transaction: t }
          );
        } else {
          await Likes.destroy({ where: { postId }, transaction: t });
          await post.update(
            { likeCount: post.likeCount - 1 },
            { transaction: t }
          );
        }
        await t.commit();
        return '좋아요 변경이 완료되었습니다.';
      } catch (error) {
        await t.rollback();
        return '좋아요 변경에 실패했습니다.';
      }
    } catch (error) {
      return '좋아요 변경에 실패했습니다.';
    }
  };
}

module.exports = PostRepository;
