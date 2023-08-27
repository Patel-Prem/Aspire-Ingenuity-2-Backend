const ValidationError = require("../../error/validationError");

const updateShift = ({ shiftRepository, userRepository, clinicRepository }) => {
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
    const updatedShift = await shiftRepository.update(shiftId, model);
    return updatedShift;
  };
};

module.exports = updateShift;
