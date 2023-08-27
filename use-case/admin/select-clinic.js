const ValidationError = require("../../error/validationError");

const selectClinic = ({ clinicRepository, userRepository }) => {
  return async function select(user, id, { page, size }, searchKey) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    if (Number(page) <= 0 || Number(size) <= 0) {
      throw new ValidationError("Page or size should be greater than 0");
    }
    if (id) {
      const clinic = await clinicRepository.getOneForAdmin(id);
      return { clinic: clinic };
    } else {
      const clinicsAll = await clinicRepository.get();
      const clinic = await clinicRepository.getWithPage(
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

module.exports = selectClinic;
