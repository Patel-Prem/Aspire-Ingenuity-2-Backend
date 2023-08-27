const signUpAuthFun = ({ signUpAuthSer }) => {
  return async function get(httpRequest) {
    const { email, password, role } = httpRequest.body;
    const user = await signUpAuthSer({ email, password, role });

    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: user,
    };
  };
};

module.exports = signUpAuthFun;
