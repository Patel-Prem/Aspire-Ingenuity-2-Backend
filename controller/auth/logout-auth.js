const ValidationError = require("../../error/validationError");
require("dotenv").config();

const logoutAuthFun = ({ logoutAuthSer }) => {
  return async function get(httpRequest, httpResponse) {
    const cookies = httpRequest.cookies;
    if (!cookies.jwt) {
      return { body: { message: "No cookie to logout" }, statusCode: 200 };
    }
    const jwtcookie = cookies.jwt;
    await logoutAuthSer({ jwtcookie, httpResponse });
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: { message: "Logged out" },
    };
  };
};

module.exports = logoutAuthFun;
