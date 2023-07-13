const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  //전체 게시글 조회
  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();

    return allPost;
  };

  //게시글 상세 조회
  findOnePost = async (postId) => {
    const onePost = await this.postRepository.findOnePost(postId);

    return onePost;
  };

  //좋아요 게시글 조회
  findLikeAllPost = async (userId) => {
    const likeAllPost = await this.postRepository.findLikeAllPost(userId);

    return likeAllPost;
  };

  //게시글 작성
  createPost = async (userId, title, content) => {
    const createPostData = await this.postRepository.createPost(
      userId,
      title,
      content
    );

    return createPostData;
  };

  //게시글 수정
  updatePost = async (userId, postId, title, content) => {
    const updatePostData = await this.postRepository.updatePost(
      userId,
      postId,
      title,
      content
    );

    return updatePostData;
  };

  //게시글 삭제
  deletePost = async (userId, postId) => {
    const deletePostsData = await this.postRepository.deletePost(
      userId,
      postId
    );

    return deletePostsData;
  };

  //좋아요
  likePost = async (userId, postId) => {
    const likePostData = await this.postRepository.likePost(userId, postId);

    return likePostData;
  };
}

module.exports = PostService;
