const ValidationErrors = require("../../error/validationErrors");
const ValidationError = require("../../error/validationError");
const validateAddress = require("../../helper/validate-address");
const validateEducation = require("../../helper/validate-education");
const validateAvailabilities = require("../../helper/validate-availabilities");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

const createShiftFun = ({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  availabilityRepository,
}) => {
  return async function insert(model, user) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    model.userId = loggedInUser.id;

    //insert Address
    const address = model.address;
    let errors = new ValidationErrors();

    //validate address
    const e1s = validateAddress(address);
    errors.addMsgs(e1s);

    // validate education
    const educations = model.educations;
    const e2s = validateEducation(educations);
    errors.addMsgs(e2s);

    //validate availabilities
    const availabilities = model.availabilities;
    const e3s = validateAvailabilities(availabilities);
    errors.addMsgs(e3s);

    if (errors.getMsgs().length > 0) {
      throw errors;
    }
    const existingProfile = await profileRepository.getByUserId(
      loggedInUser.id
    );
    if (!existingProfile) {
      const userProfile = await profileRepository.addInclusive(model);
      return profileRepository.getOne(userProfile.id);
    } else {
      throw new ValidationError("Use update api! Profile Already Exists");
    }
  };
};

module.exports = createShiftFun;
