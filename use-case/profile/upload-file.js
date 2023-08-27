const ValidationErrors = require("../../error/validationErrors");
const ValidationError = require("../../error/validationError");

const { uploadFile } = require("../../util/s3");
const fs = require("fs");

const uploadFileFun = ({ userRepository, profileRepository }) => {
  return async function upload(files, user) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    const exProfile = await profileRepository.getByUserId(loggedInUser.id);

    if (!exProfile) {
      await profileRepository.addInclusive({
        userId: loggedInUser.id,
      });
    }

    const profile = await profileRepository.getByUserId(loggedInUser.id);

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
      const resResponse = await uploadAndHandle(
        files.resume[0],
        "resume",
        loggedInUser.id
      );
      console.log("ResResponse is ");
      console.log(resResponse);
      await profileRepository.update(profile.id, {
        resumeUrl: resResponse.Location,
      });
    }
    if (files.certificate) {
      const certResponse = await uploadAndHandle(
        files.certificate[0],
        "certificate",
        loggedInUser.id
      );
      await profileRepository.update(profile.id, {
        certificateUrl: certResponse.Location,
        documentStatus: "PENDING_APPROVAL",
        status: "PENDING_APPROVAL",
      });
    }
    const updatedProfile = await profileRepository.getByUserId(loggedInUser.id);
    return updatedProfile;
  };
};

const uploadAndHandle = async (file, folder, loggedInUserId) => {
  try {
    const res = await uploadFile(file, folder, loggedInUserId);
    console.log("Upload to AWS complete...");
    console.log("Deleting from Local Storage...");
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error(err);
      }
    });
    return res;
  } catch (error) {
    throw new ValidationError("Error in AWS service", 500);
  }
};

module.exports = uploadFileFun;
