const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ValidationError = require("../../error/validationError");
const ValidationErrors = require("../../error/validationErrors");
const { getDateDifference } = require("../../util/dateTimeUtil");
const { getRewardMetrics } = require("../../util/reward");
require("dotenv").config();

const loginAuth = ({ authRepository, localStategyPassport }) => {
  return async function login(info) {
    const { email, password, role } = info;

    if (!email) {
      let validationErrors = new ValidationErrors("Validation Error", 400);
      validationErrors.addMsg("Email Can not be Empty!");
      validationErrors.addMsg("Password Can not be Empty!");
      console.log("The validation error messages are");
      console.log(validationErrors.getMsgs());
      throw validationErrors;
    }

    if (!email || !password) {
      throw new ValidationError("Password can not be Empty!");
    }
    const existingUser = await authRepository.getByEmail(email);
    if (!existingUser) {
      throw new ValidationError("User does not exists!");
    }

    const match = await bcrypt.compare(password, existingUser.password);
    if (match) {
      if (existingUser.isBannedByAdmin) {
        throw new ValidationError(
          "Your account is on hold! Please contact support"
        );
      }
      if (existingUser.role == "USER" && existingUser.noOfCanceledShift > 0) {
        // check for TSM User if they are penalized for cancelling shift
        let diff = getDateDifference(existingUser.cancledShiftDate, new Date());
        if (existingUser.noOfCanceledShift == 1 && diff < 72) {
          throw new ValidationError(
            "Account is blocked for 3 days due to canceling the shift! Able to login After " +
              Math.round(Number(72 - diff)) +
              " Hrs."
          );
        } else if (existingUser.noOfCanceledShift == 2 && diff < 168) {
          throw new ValidationError(
            "Account is blocked for 7 days due to canceling the shift! Able to login After " +
              Math.round(Number(168 - diff)) +
              " Hrs."
          );
        } else if (existingUser.noOfCanceledShift == 3 && diff < 720) {
          throw new ValidationError(
            "Account is blocked for 30 days due to canceling the shift! Able to login After " +
              Math.round(Number(720 - diff)) +
              " Hrs."
          );
        } else if (existingUser.noOfCanceledShift == 4) {
          throw new ValidationError(
            "Account is blocked for cancelling shifts! Please contact admin"
          );
        }
      }

      const accessToken = jwt.sign(
        { email: existingUser.email, role: existingUser.role },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY || "120s" }
      );
      const refreshToken = jwt.sign(
        { email: existingUser.email, role: existingUser.role },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY || "300s" }
      );
      existingUser.refreshToken = refreshToken;
      const id = existingUser.id;
      delete existingUser.id;
      await authRepository.update(id, existingUser);

      delete existingUser.password;
      if (existingUser.role == "USER") {
        const reward = getRewardMetrics(existingUser);
        existingUser.reward = reward;
      }
      return {
        user: existingUser,
        accessToken,
        refreshToken,
      };
    } else {
      throw new ValidationError("Email or Password Incorrect!");
    }
  };
};

module.exports = loginAuth;
