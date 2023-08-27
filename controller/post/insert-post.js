const createPostFun = ({ createPostSer }) => {
  return async function get(httpRequest) {
    const model = { title: httpRequest.body.title };
    const posts = await createPostSer(model);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: posts,
    };
  };
};

module.exports = createPostFun;
