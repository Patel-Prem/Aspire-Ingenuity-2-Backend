const sendEmailBlast = ({ sendEmailBlastSer }) => {
  return async function get(httpRequest) {
    console.log("The user is : " + httpRequest.user);
    const clinic = await sendEmailBlastSer(httpRequest.user, httpRequest.body);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: clinic,
    };
  };
};

module.exports = sendEmailBlast;
