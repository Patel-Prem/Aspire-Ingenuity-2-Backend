const uploadFileFun = ({ uploadFileSer }) => {
  return async function get(httpRequest) {
    const res = await uploadFileSer(httpRequest.files, httpRequest.user);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: res,
    };
  };
};

module.exports = uploadFileFun;
