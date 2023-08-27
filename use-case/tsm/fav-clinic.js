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

    const clinic = await clinicRepository.getOne(clinicId);
    if (!clinic) {
      throw new ValidationError("Clinic Id does not exist");
    }

    const favclinic =
      await userClinicRepository.getuser_Fav_ClinicsByUserAndClnic(
        loggedInUser.id,
        clinic.id
      );

    if (favclinic.length > 0) {
      throw new ValidationError("Already marked as favourite!");
    }

    const newFav = await userClinicRepository.add({
      tsmId: loggedInUser.id,
      clinicId: clinic.id,
      isFavourite: true,
    });

    return userClinicRepository.getOne(newFav.id);
  };
};

module.exports = marClinicAsFav;
