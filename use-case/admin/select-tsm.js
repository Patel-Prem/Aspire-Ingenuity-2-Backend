const ValidationError = require("../../error/validationError");

const selectTSM = ({ clinicRepository, userRepository }) => {
  return async function select(user, id, { page, size }, searchKey) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    if (Number(page) <= 0 || Number(size) <= 0) {
      throw new ValidationError("Page or size should be greater than 0");
    }
    console.log("I am hered!");
    if (id) {
      const clinic = await userRepository.getUserWithProfile(id);
      return { clinic: clinic };
    } else {
      const clinicsAll = await userRepository.getAllTSM();
      const clinic = await userRepository.getWithPage(
        { page, size },
        searchKey
      );
      return {
        clinic: clinic,
        count: searchKey ? clinic.length : clinicsAll.length,
      };
    }
  };
};

module.exports = selectTSM;
