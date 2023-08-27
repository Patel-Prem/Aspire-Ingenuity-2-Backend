const ValidationError = require("../../error/validationError");

const selectClinicShift = ({
  shiftRepository,
  userRepository,
  clinicRepository,
}) => {
  return async function select(user, clinicId) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    const clinic = await clinicRepository.getOne(clinicId);
    if (!clinic) {
      throw new ValidationError("Invalid Clinic ID");
    }
    let shiftOfUserAndClinic = await shiftRepository.getShiftsByUserAndClnic(
      loggedInUser.id,
      clinicId
    );
    if (!shiftOfUserAndClinic) {
      throw new ValidationError(
        "User Does not have Permission to View This Shift"
      );
    }
    shiftOfUserAndClinic = shiftOfUserAndClinic.map((s) => {
      const offerAv = s.user_shifts.length;
      let isConfirmed = false;
      for (const us of s.user_shifts) {
        if (us.isAcceptedByCP) {
          isConfirmed = true;
          break;
        }
      }
      return {
        ...s,
        confirmed: isConfirmed,
        offersAvailable: offerAv,
        Unfilled: !isConfirmed,
      };
    });
    return shiftOfUserAndClinic;
  };
};

module.exports = selectClinicShift;
