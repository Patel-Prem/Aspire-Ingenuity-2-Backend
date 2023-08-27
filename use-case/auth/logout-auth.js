const ValidationError = require("../../error/validationError");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const logoutAuth = ({ authRepository }) => {
  return async function logout(info) {
    const { jwtcookie, httpResponse } = info;
    const user = await authRepository.getByRefreshToken(jwtcookie);
    if (!user) {
      httpResponse.clearCookie("jwt", { httpOnly: true });
      throw new ValidationError("No user with the given JWT exists");
    } else {
      user.refreshToken = "";
      user.device_token_firebase = "";
      const id = user.id;
      delete user.id;
      authRepository.update(id, user);
    }
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: { message: "Logged out" },
    };
  };
};

module.exports = logoutAuth;
