const ValidationError = require("../../error/validationError");
require("dotenv").config();

const refreshTokenAuthFun = ({ refreshTokenAuthSer }) => {
  return async function get(httpRequest, httpResponse) {
    const cookies = httpRequest.cookies;
    const jwtcookie = cookies.jwt;
    if (!cookies.jwt)
      return new ValidationError("UnAthorized! No cookies passed", 401);
    const response = await refreshTokenAuthSer({ jwtcookie });
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: { accessToken: response },
    };
  };
};

module.exports = refreshTokenAuthFun;
