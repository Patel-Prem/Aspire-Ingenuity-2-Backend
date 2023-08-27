const ValidationError = require("../../error/validationError");

const selectFavTsm = ({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
  clinicUserRepository,
}) => {
  return async function markComplete(user, clinicId) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    const tsmUser = await clinicRepository.getOne(clinicId);
    if (!tsmUser) {
      throw new ValidationError("Clinic Id does not exist!");
    }

    return clinicUserRepository.getFavouriteUserByClincId(clinicId);
  };
};

module.exports = selectFavTsm;
