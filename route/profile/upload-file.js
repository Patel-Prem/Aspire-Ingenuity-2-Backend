const ValidationErrors = require("../../error/validationErrors");
const ValidationError = require("../../error/validationError");
const validateAddress = require("../../helper/validate-address");
const validateEducation = require("../../helper/validate-education");
const validateAvailabilities = require("../../helper/validate-availabilities");
const { PrismaClientKnownRequestError } = require("@prisma/client/runtime");

const { uploadFile } = require("../../util/s3");
const fs = require("fs");

const uploadFileFun = ({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  availabilityRepository,
}) => {
  return async function upload(files, user) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    const profile = await profileRepository.getByUserId(loggedInUser.id);

    if (!profile) {
      throw new ValidationError("Profile Does not Exist!");
    }

    // upload for files
    if (files.profilePicture) {
      const pfResponse = await uploadAndHandle(
        files.profilePicture[0],
        "profilePicture",
        loggedInUser.id
      );
      await profileRepository.update(profile.id, {
        profilePictureUrl: pfResponse.Location,
      });
    }
    if (files.resume) {
      const resResponse = await uploadFile(
        files.resume[0],
        "resume",
        loggedInUser.id
      );
      console.log("ResResponse is ");
      console.log(resResponse);
      await profileRepository.update(profile.id, {
        profilePictureUrl: resResponse.Location,
      });
    }
    if (files.certificate) {
      const certResponse = await uploadAndHandle(
        files.certificate[0],
        "certificate",
        loggedInUser.id
      );
      await profileRepository.update(profile.id, {
        profilePictureUrl: certResponse.Location,
        documentStatus: "PENDING_APPROVAL",
      });
    }
    const updatedProfile = await profileRepository.getByUserId(loggedInUser.id);
    return updatedProfile;
  };
};

const uploadAndHandle = async (file, folder, loggedInUserId) => {
  await uploadFile(file, folder, loggedInUserId)
    .then((value) => {
      console.log("after upload i am here");
      console.log("Deleting the file from internal storage");
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(err);
        }
      });
      return value;
    })
    .catch((error) => {
      console.log(error);
      throw new ValidationError("Error in AWS service", 500);
    });
};

module.exports = uploadFileFun;
