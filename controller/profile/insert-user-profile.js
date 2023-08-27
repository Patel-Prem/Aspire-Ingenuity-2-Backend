const createUserProfileFun = ({ createUserProfileSer }) => {
  return async function get(httpRequest) {
    const model = httpRequest.body;
    const shift = await createUserProfileSer(model, httpRequest.user);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: shift,
    };
  };
};

module.exports = createUserProfileFun;
