const ValidationError = require("../../error/validationError");

const marClinicAsFav = ({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
  userClinicRepository,
}) => {
  return async function markComplete(user, clinicId) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    const favuserclinics =
      await userClinicRepository.getFavouriteClinicsByUserId(loggedInUser.id);

    const clinics = [];
    for (let fav of favuserclinics) {
      const clinic = await clinicRepository.getOne(fav.clinicId);
      clinics.push(clinic);
    }
    return clinics;
  };
};

module.exports = marClinicAsFav;
