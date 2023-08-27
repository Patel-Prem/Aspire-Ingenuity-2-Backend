const ValidationError = require("../../error/validationError");
const { sendMail } = require("../../util/emailUtils");

const availableTSM = ({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
}) => {
  return async function select(user, shiftId) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    console.log("Shift id i ds" + shiftId);
    const shift = await shiftRepository.getOne(shiftId);
    if (!shift) {
      throw new ValidationError("Shift Id does not exist");
    }

    return shiftRepository.getOneWithUser(shift.id);
  };
};

module.exports = availableTSM;
