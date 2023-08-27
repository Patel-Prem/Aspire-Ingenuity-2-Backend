const createUserEducationFun = ({ createUserEducationSer }) => {
  return async function get(httpRequest) {
    const model = httpRequest.body;
    const shift = await createUserEducationSer(model, httpRequest.user);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: shift,
    };
  };
};

module.exports = createUserEducationFun;
