const ValidationError = require("../../error/validationError");

const deleteShift = ({ shiftRepository, userRepository, clinicRepository }) => {
  return async function update(user, shiftID, model) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    let clinic = await shiftRepository.getOne(shiftID);
    if (!clinic) {
      throw new ValidationError("Invalid Shift ID ID");
    }
    let clinicOfUser = shiftRepository.getShift(loggedInUser.id, shiftID);
    if (!clinicOfUser) {
      throw new ValidationError(
        "User Does not have Permission to update This Shift"
      );
    }
    const deletedShift = await shiftRepository.del(shiftID);
    return deletedShift;
  };
};

module.exports = deleteShift;
