const ValidationErrors = require("../../error/validationErrors");
const ValidationError = require("../../error/validationError");
const validateAddress = require("../../helper/validate-address");
const validateEducation = require("../../helper/validate-education");
const validateAvailabilities = require("../../helper/validate-availabilities");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");
const { profile } = require("winston");

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

    //insert Address
    const addressdto = model.address;
    let errors = new ValidationErrors();

    //validate address
    const e1s = validateAddress(addressdto);
    errors.addMsgs(e1s);

    if (errors.getMsgs().length > 0) {
      throw errors;
    }
    const existingProfile = await profileRepository.getByUserId(
      loggedInUser.id
    );
    if (!existingProfile) {
      throw new ValidationError("User Profile Does not exist");
    } else {
      //update address
      if (addressdto) {
        let address = existingProfile.address;
        if (!address) {
          model.address.profileId = existingProfile.id;
          console.log("The profile Is is ");
          console.log(model.address);
          await addressRepository.add(model.address);
        } else {
          await addressRepository.update(
            existingProfile.address.id,
            model.address
          );
        }
      }
      //update other parts
      let ob = {};
      if (model.firstName) {
        ob.firstName = model.firstName;
      }
      if (model.lastName) {
        ob.lastName = model.lastName;
      }
      if (model.middleName) {
        ob.middleName = model.middleName;
      }
      if (model.expectedSalary) {
        ob.expectedSalary = model.expectedSalary;
      }
      if (model.position) {
        ob.position = model.position;
      }
      await profileRepository.update(existingProfile.id, ob);
      //return object
      return profileRepository.getOne(existingProfile.id);
    }
  };
};

module.exports = createShiftFun;
