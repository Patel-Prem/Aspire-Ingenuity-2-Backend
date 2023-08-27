const ValidationError = require("../../error/validationError");

const selectClinic = ({ clinicRepository, userRepository }) => {
  return async function select(user, id) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    if (id) {
      const clinic = await clinicRepository.getOne(id);
      if (!clinic) {
        throw new ValidationError("Invalid Clinic ID");
      }
      let clinicOfUser = clinicRepository.getClinic(loggedInUser.id, id);
      if (!clinicOfUser) {
        throw new ValidationError(
          "User Does not have Permission to View This Clinic"
        );
      }
      return clinicOfUser;
    } else {
      return clinicRepository.getAllTheClinics(loggedInUser.id);
    }
  };
};

module.exports = selectClinic;
