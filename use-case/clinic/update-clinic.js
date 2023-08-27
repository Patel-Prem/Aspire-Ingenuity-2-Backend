const ValidationError = require("../../error/validationError");

const updateClinic = ({ clinicRepository, userRepository }) => {
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
    const updatedClinic = await clinicRepository.update(clinicId, model);
    return updatedClinic;
  };
};

module.exports = updateClinic;
