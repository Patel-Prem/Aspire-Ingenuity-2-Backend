const loginAuthFun = ({ loginAuthSer }) => {
  return async function get(httpRequest, httpResponse) {
    const { email, password } = httpRequest.body;
    const user = await loginAuthSer({ email, password });
    httpResponse
      .cookie("jwt", user.refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("sub", email, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: user,
    };
  };
};

module.exports = loginAuthFun;
