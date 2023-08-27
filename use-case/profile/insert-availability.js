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
  return async function insert(model, user) {
    console.log("Insert availability");
    console.log(model);

    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    model.userId = loggedInUser.id;

    let errors = new ValidationErrors();

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
      console.log("I am in add new availability");
      const exAvailabilities = existingProfile.availabilities;
      console.log(await profileRepository.getOne(existingProfile.id));
      if (exAvailabilities.length == 0) {
        console.log("No Availabilities! Inserting Availabilities");

        for (index = 0; index < availabilities.length; index++) {
          let insertAvailability = availabilities[index];
          insertAvailability.profileId = existingProfile.id;
          await availabilityRepository.add(insertAvailability);
        }
        return profileRepository.getOne(existingProfile.id);
      } else {
        //delete existing availabilities
        for (index = 0; index < exAvailabilities.length; index++) {
          await availabilityRepository.del(exAvailabilities[index].id);
        }
        //add new availabilities
        for (index = 0; index < availabilities.length; index++) {
          let insertAvailability = availabilities[index];
          insertAvailability.profileId = existingProfile.id;
          await availabilityRepository.add(insertAvailability);
        }
        return profileRepository.getOne(existingProfile.id);
      }
    }
  };
};

module.exports = createAvailabilityFun;
