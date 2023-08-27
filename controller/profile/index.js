const {
  createShiftSer,
  selectShiftSer,
  selectClinicShiftSer,
  updateShiftSer,
  deleteShiftSer,
} = require("../../use-case/shift");
const {
  createUserProfileSer,
  updateUserProfileSer,
  uploadFileSer,
  createUserAvailabilitySer,
  updateUserAvailabilitySer,
  selectUserProfileSer,
  createUserEducationSer,
  updateUserEducationSer,
  deleteUserEducationSer,
} = require("../../use-case/profile");
// #########

const createUserFun = require("./insert-user-profile");
const updateUserFun = require("./update-user-profile");

const selectShiftFun = require("./select-shift");
const selectClinicShiftFun = require("./select-clinic-shift");
const updateShiftFun = require("./update-shift");
const deleteShiftFun = require("./delete-shift");

const uploadFileFun = require("./upload-file");
const createUserAvailabilityFun = require("./insert-availability");
const updateUserAvailabilityFun = require("./update-availability");
const selectUserProfileFun = require("./select-user-profile");
const createUserEducationFun = require("./insert-education");
const updateUserEducationFun = require("./update-education");
const deleteUserEducationFun = require("./delete-education");

// #########

const createUserProfileController = createUserFun({ createUserProfileSer });
const updateUserProfileController = updateUserFun({ updateUserProfileSer });
const selectShiftController = selectShiftFun({ selectShiftSer });
const selectClinicShiftController = selectClinicShiftFun({
  selectClinicShiftSer,
});
const updateShiftController = updateShiftFun({ updateShiftSer });
const deleteShiftController = deleteShiftFun({ deleteShiftSer });
const uploadFileController = uploadFileFun({ uploadFileSer });
const createUserAvailabilityController = createUserAvailabilityFun({
  createUserAvailabilitySer,
});
const updateUserAvailabilityController = updateUserAvailabilityFun({
  updateUserAvailabilitySer,
});
const selectUserProfileController = selectUserProfileFun({
  selectUserProfileSer,
});
const createUserEducationController = createUserEducationFun({
  createUserEducationSer,
});
const updateUserEducationController = updateUserEducationFun({
  updateUserEducationSer,
});
const deleteUserEducationController = deleteUserEducationFun({
  deleteUserEducationSer,
});
// #########
const services = Object.freeze({
  createUserProfileController,
  updateUserProfileController,
  selectShiftController,
  selectClinicShiftController,
  updateShiftController,
  deleteShiftController,
  uploadFileController,
  createUserAvailabilityController,
  updateUserAvailabilityController,
  selectUserProfileController,
  createUserEducationController,
  updateUserEducationController,
  deleteUserEducationController,
});

module.exports = services;
module.exports = {
  createUserProfileController,
  updateUserProfileController,
  selectShiftController,
  selectClinicShiftController,
  updateShiftController,
  deleteShiftController,
  uploadFileController,
  createUserAvailabilityController,
  updateUserAvailabilityController,
  selectUserProfileController,
  createUserEducationController,
  updateUserEducationController,
  deleteUserEducationController,
};
