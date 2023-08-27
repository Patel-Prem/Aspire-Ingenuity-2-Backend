const postDelete = ({ deletePostSer }) => {
  return async function get(httpRequest) {
    const id = httpRequest.params.id;

    const posts = await deletePostSer(id);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: posts,
    };
  };
};

module.exports = postDelete;
