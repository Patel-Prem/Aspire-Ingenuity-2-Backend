const ValidationError = require("../../error/validationError");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const refreshTokenAuth = ({ authRepository }) => {
  return async function refresh(info) {
    const { jwtcookie } = info;
    const user = await authRepository.getByRefreshToken(jwtcookie);
    if (!user)
      throw new ValidationError("No user with the given JWT exists", 401);

    console.log("The cookie passed is ");
    console.log(jwtcookie);

    jwt.verify(
      jwtcookie,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || user.email !== decoded.email)
          throw new ValidationError("Invalid JWT", 401);
      }
    );
    const accessToken = jwt.sign(
      { email: user.email, role: user.role },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY || "120s" }
    );
    return accessToken;
  };
};

module.exports = refreshTokenAuth;
