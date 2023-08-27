const selectPost = ({ postRepository }) => {
  return async function select(id) {
    if (id) {
      return postRepository.getOne(id);
    } else {
      return postRepository.get();
    }
  };
};

module.exports = selectPost;
