const updateUserProfileFun = ({ updateUserProfileSer }) => {
  return async function get(httpRequest) {
    const model = httpRequest.body;
    const shift = await updateUserProfileSer(model, httpRequest.user);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: shift,
    };
  };
};

module.exports = updateUserProfileFun;
