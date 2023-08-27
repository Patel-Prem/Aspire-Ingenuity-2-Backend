const ValidationErrors = require("../../error/validationErrors");
const ValidationError = require("../../error/validationError");
const validateAddress = require("../../helper/validate-address");
const validateEducation = require("../../helper/validate-education");
const validateAvailabilities = require("../../helper/validate-availabilities");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

const createAvailabilityFun = ({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  availabilityRepository,
}) => {
  return async function insert(id, model, user) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    // model.userId = loggedInUser.id;

    const existingProfile = await profileRepository.getByUserId(
      loggedInUser.id
    );
    if (!existingProfile) {
      throw new ValidationError("Profile Does not exist");
    } else {
      await educationRepository.update(id, model);
      return profileRepository.getOne(existingProfile.id);
    }
  };
};

module.exports = createAvailabilityFun;
