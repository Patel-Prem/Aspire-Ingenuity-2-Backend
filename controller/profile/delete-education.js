const deleteUserEducationFun = ({ deleteUserEducationSer }) => {
  return async function get(httpRequest) {
    const model = httpRequest.body;
    const educationId = httpRequest.params.id;
    const shift = await deleteUserEducationSer(
      educationId,
      model,
      httpRequest.user
    );
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: shift,
    };
  };
};

module.exports = deleteUserEducationFun;
