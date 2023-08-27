const banUserFun = ({ banUserSer }) => {
  return async function get(httpRequest) {
    const tsmId = httpRequest.params.id;
    const model = httpRequest.body;
    console.log("The user is : " + httpRequest.user);
    const clinic = await banUserSer(httpRequest.user, httpRequest.body);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
    };
  };
};

module.exports = banUserFun;
