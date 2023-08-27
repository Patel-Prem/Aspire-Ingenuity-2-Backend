const updatePost = ({ postRepository }) => {
  return async function update(id, model) {
    return postRepository.update(id, model);
  };
};

module.exports = updatePost;
