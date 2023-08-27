const ValidationError = require("../../error/validationError");

const updateShift = ({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
}) => {
  return async function update(user, shiftId, model) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    let clinic = await shiftRepository.getOne(shiftId);
    if (!clinic) {
      throw new ValidationError("Invalid Shift ID");
    }
    let clinicOfUser = shiftRepository.getShift(loggedInUser.id, shiftId);
    if (!clinicOfUser) {
      throw new ValidationError(
        "User Does not have Permission to update This Shift"
      );
    }

    // you can not delete shift because shifts has been already accepted or applied
    let userShift = await userShiftRepository.getByShiftId(shiftId);
    if (userShift.length > 0) {
      throw new ValidationError(
        "You can not delete shift because tsm has already accepted or applied to this shift"
      );
    }

    const updatedShift = await shiftRepository.update(shiftId, model);
    return updatedShift;
  };
};

module.exports = updateShift;
