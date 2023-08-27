const ValidationError = require("../../error/validationError");

const selectShift = ({ shiftRepository, userRepository, clinicRepository }) => {
  return async function select(user, id) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    if (id) {
      const clinic = await shiftRepository.getOne(id);
      if (!clinic) {
        throw new ValidationError("Invalid Shift ID");
      }
      let shiftOfUser = shiftRepository.getShift(loggedInUser.id, id);
      if (!shiftOfUser) {
        throw new ValidationError(
          "User Does not have Permission to View This Shift"
        );
      }
      return shiftOfUser;
    } else {
      return shiftRepository.getAllTheShifts(loggedInUser.id);
    }
  };
};

module.exports = selectShift;
