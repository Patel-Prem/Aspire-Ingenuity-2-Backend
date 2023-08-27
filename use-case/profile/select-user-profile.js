const ValidationErrors = require("../../error/validationErrors");
const ValidationError = require("../../error/validationError");
const validateAddress = require("../../helper/validate-address");
const validateEducation = require("../../helper/validate-education");
const validateAvailabilities = require("../../helper/validate-availabilities");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");
const { getRewardMetrics } = require("../../util/reward");

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

    const existingProfile = await profileRepository.getByUserId(
      loggedInUser.id
    );

    const reward = getRewardMetrics(loggedInUser);

    if (existingProfile) {
      const profile = await profileRepository.getOne(existingProfile.id);
      profile.reward = reward;
      return profile;
    } else {
      const profile = await profileRepository.addInclusive({
        userId: loggedInUser.id,
      });
      profile.reward = reward;
      return profile;
    }
  };
};

module.exports = createShiftFun;
