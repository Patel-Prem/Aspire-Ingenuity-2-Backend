const shiftRepository = require("../../data-access/shift");
const userRepository = require("../../data-access/user");
const clinicRepository = require("../../data-access/clinic");
const profileRepository = require("../../data-access/profile");
const addressRepository = require("../../data-access/address");
const educationRepository = require("../../data-access/education");
const availabilityRepository = require("../../data-access/availability");

const createUserProfileFun = require("./insert-user-profile");
const updateUserProfileFun = require("./update-user-profile");
const uploadFileFun = require("./upload-file");
const createUserAvailabilityFun = require("./insert-availability");
const updateUserAvailabilityFun = require("./update-availability");
const selectUserProfileFun = require("./select-user-profile");
const createUserEducationFun = require("./insert-education");
const updateUserEducationFun = require("./update-education");
const deleteUserEducationFun = require("./delete-education");

const selectShiftFun = require("./select-shift");
const selectClinicShiftFun = require("./select-clinic-shift");
const updateShiftFun = require("./update-shift");
const deleteShiftFun = require("./delete-shift");

const createUserProfileSer = createUserProfileFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  availabilityRepository,
});

const updateUserProfileSer = updateUserProfileFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  availabilityRepository,
});

const uploadFileSer = uploadFileFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  availabilityRepository,
});

const createUserAvailabilitySer = createUserAvailabilityFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  availabilityRepository,
});

const updateUserAvailabilitySer = updateUserAvailabilityFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  availabilityRepository,
});

const selectUserProfileSer = selectUserProfileFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  availabilityRepository,
});

const createUserEducationSer = createUserEducationFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  availabilityRepository,
});

const updateUserEducationSer = updateUserEducationFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  availabilityRepository,
});

const deleteUserEducationSer = deleteUserEducationFun({
  userRepository,
  profileRepository,
  addressRepository,
  educationRepository,
  availabilityRepository,
});

const selectShiftSer = selectShiftFun({
  shiftRepository,
  userRepository,
  clinicRepository,
});
const selectClinicShiftSer = selectClinicShiftFun({
  shiftRepository,
  userRepository,
  clinicRepository,
});
const updateShiftSer = updateShiftFun({
  shiftRepository,
  userRepository,
  clinicRepository,
});
const deleteShiftSer = deleteShiftFun({
  shiftRepository,
  userRepository,
  clinicRepository,
});

const services = Object.freeze({
  createUserProfileSer,
  updateUserProfileSer,
  uploadFileSer,
  createUserAvailabilitySer,
  updateUserAvailabilitySer,
  selectUserProfileSer,
  createUserEducationSer,
  updateUserEducationSer,
  deleteUserEducationSer,
  selectShiftSer,
  selectClinicShiftSer,
  updateShiftSer,
  deleteShiftSer,
});

module.exports = services;
module.exports = {
  createUserProfileSer,
  updateUserProfileSer,
  uploadFileSer,
  createUserAvailabilitySer,
  updateUserAvailabilitySer,
  selectUserProfileSer,
  createUserEducationSer,
  updateUserEducationSer,
  deleteUserEducationSer,
  selectShiftSer,
  selectClinicShiftSer,
  updateShiftSer,
  deleteShiftSer,
};
