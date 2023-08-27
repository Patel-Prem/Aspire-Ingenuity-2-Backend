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
    let shiftOfUserAndClinic = shiftRepository.getShiftsByUserAndClnic(
      loggedInUser.id,
      clinicId
    );
    if (!shiftOfUserAndClinic) {
      throw new ValidationError(
        "User Does not have Permission to View This Shift"
      );
    }
    return shiftOfUserAndClinic;
  };
};

module.exports = selectClinicShift;
