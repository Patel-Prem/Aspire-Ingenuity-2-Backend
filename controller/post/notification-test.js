const selectPostFun = ({ notificationTestSer }) => {
  return async function get(httpRequest) {
    const token = httpRequest.body.token;
    const posts = await notificationTestSer(token);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: posts,
    };
  };
};

module.exports = selectPostFun;
