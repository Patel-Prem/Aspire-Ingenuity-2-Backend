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
  return async function insert(availabilityId, model, user) {
    console.log("Insert availability");
    console.log(model);

    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    model.userId = loggedInUser.id;

    let errors = new ValidationErrors();

    const existingProfile = await profileRepository.getByUserId(
      loggedInUser.id
    );
  };
};

module.exports = createAvailabilityFun;
