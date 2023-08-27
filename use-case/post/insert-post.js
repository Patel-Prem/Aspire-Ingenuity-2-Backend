const createPost = ({ postRepository }) => {
  return async function create(model) {
    return postRepository.add(model);
  };
};

module.exports = createPost;
