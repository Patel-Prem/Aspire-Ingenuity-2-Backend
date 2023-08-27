const ValidationError = require("../../error/validationError");

const deleteClinic = ({
  clinicRepository,
  userRepository,
  shiftRepository,
}) => {
  return async function update(user, clinicId, model) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    let clinic = await clinicRepository.getOne(clinicId);
    if (!clinic) {
      throw new ValidationError("Invalid Clinic ID");
    }
    let clinicOfUser = clinicRepository.getClinic(loggedInUser.id, clinicId);
    if (!clinicOfUser) {
      throw new ValidationError(
        "User Does not have Permission to update This Clinic"
      );
    }

    let allclinicsOfUser = await clinicRepository.getAllTheClinics(
      loggedInUser.id
    );
    console.log(allclinicsOfUser);
    if (allclinicsOfUser.length == 1) {
      throw new ValidationError(
        "You have only one clinic. You can not delete this clinic."
      );
    }

    const shiftsOfClinic = await shiftRepository.getShiftsByUserAndClnic(
      loggedInUser.id,
      clinicId
    );

    if (shiftsOfClinic.length > 0) {
      throw new ValidationError(
        "This clinic can not be deleted as there are shifts posted"
      );
    }

    const updatedClinic = await clinicRepository.del(clinicId);
    return updatedClinic;
  };
};

module.exports = deleteClinic;
