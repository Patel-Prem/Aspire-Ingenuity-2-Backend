const ValidationError = require("../../error/validationError");

const favTsm = ({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
  clinicUserRepository,
}) => {
  return async function markComplete(user, clinicId, tsmId) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    const tsmUser = await userRepository.getOne(tsmId);
    if (!tsmUser) {
      throw new ValidationError("TSM Id does not exist!");
    }

    const clinic = await clinicRepository.getClnicsByIdAndUserId(
      clinicId,
      loggedInUser.id
    );
    if (!clinic) {
      throw new ValidationError("User does not have permission of this clinic");
    }

    const alreadyFav =
      await clinicUserRepository.getclinic_Fav_UsersByUserAndClnic(
        loggedInUser.id,
        clinic.id
      );
    if (alreadyFav) {
      throw new ValidationError("Already Favourited");
    }
    const added = await clinicUserRepository.add({
      tsmId: tsmUser.id,
      clinicId: clinic.id,
      isFavourite: true,
    });
    return clinicUserRepository.getOne(added.id);
  };
};

module.exports = favTsm;
