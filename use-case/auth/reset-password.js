const ValidationError = require("../../error/validationError");
const { sendMail } = require("../../util/emailUtils");
const { verifyToken, generateToken } = require("../../util/tokenUtils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const resetPassword = ({ authRepository }) => {
  return async function reset({ resetToken, password }) {
    if (!resetToken || resetToken.trim() == "") {
      throw new ValidationError("Reset token can not be empty!", 400);
    }
    if (!password || password.trim() == "") {
      throw new ValidationError("Password  can not be empty!", 400);
    }

    jwt.verify(
      resetToken,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          if (err instanceof jwt.TokenExpiredError)
            res.status(401).json({ message: "Expired Token" });
          res.status(401).json({ message: "Unable to verify token!" });
        } else {
          // get user
          const user = await authRepository.getOne(decoded.id);
          const encryptedPassword = await bcrypt.hash(password, 12);

          await authRepository.update(user.id, {
            password: encryptedPassword,
          });
        }
      }
    );
    return { messgae: "Password Reset successful" };
  };
};

module.exports = resetPassword;
