const updatePostFun = ({ updatePostSer }) => {
  return async function get(httpRequest) {
    const id = httpRequest.params.id;
    const model = httpRequest.body;
    const posts = await updatePostSer(id, model);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: posts,
    };
  };
};

module.exports = updatePostFun;
