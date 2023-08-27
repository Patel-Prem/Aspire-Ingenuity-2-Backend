const deletePost = ({ postRepository }) => {
  return async function del(id) {
    return postRepository.del(id);
  };
};

module.exports = deletePost;
