const ValidationError = require("../../error/validationError");
const { verifyToken } = require("../../util/tokenUtils");

const verifyEmail = ({ authRepository }) => {
  return async function verify({ user, code }) {
    const loggedInUser = await authRepository.getOne(user);

    if (!loggedInUser) {
      throw new ValidationError("Error! No user found", 400);
    }

    if (loggedInUser.isVerified) {
      throw new ValidationError("User Already Verified", 400);
    }

    let payload = null;
    try {
      payload = await verifyToken(code, user);
    } catch (ex) {
      console.log(ex);
      throw new ValidationError("Invalid Token");
    }
    if (!payload) {
      throw new ValidationError(
        "Invalid Token. Email could not be verified",
        400
      );
    } else {
      const model = { isVerified: true };
      await authRepository.update(user, model);
      return { message: "Email verification successful" };
    }
  };
};

module.exports = verifyEmail;
