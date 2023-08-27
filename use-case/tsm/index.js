const shiftRepository = require("../../data-access/shift");
const userRepository = require("../../data-access/user");
const clinicRepository = require("../../data-access/clinic");
const userShiftRepository = require("../../data-access/user-shift");
const profileRepository = require("../../data-access/profile");
const userClinicRepository = require("../../data-access/user-clinic");

const selectShiftFun = require("./select-shift");
const applyShiftFun = require("./apply-shift");
const upcomingShiftFun = require("./upcoming-shift");
const historyShiftFun = require("./history-shift");
const markCompleteShiftFun = require("./mark-complete-shift");
const cancelShiftFun = require("./cancel-shift");
const addFavouriteClinicFun = require("./fav-clinic");
const getFavouriteClinicFun = require("./get-fav-clinic");

const selectShiftSer = selectShiftFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
  profileRepository,
});

const upcomingShiftSer = upcomingShiftFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
  profileRepository,
});

const historyShiftSer = historyShiftFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
  profileRepository,
});

const applyShiftSer = applyShiftFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
  profileRepository,
});

const markCompleteShiftSer = markCompleteShiftFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
});

const cancelShiftSer = cancelShiftFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
});

const addFavouriteClinicSer = addFavouriteClinicFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
  userClinicRepository,
});

const getFavouriteClinicSer = getFavouriteClinicFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
  userClinicRepository,
});

const services = Object.freeze({
  selectShiftSer,
  upcomingShiftSer,
  historyShiftSer,
  markCompleteShiftSer,
  addFavouriteClinicSer,
  getFavouriteClinicSer,
  cancelShiftSer,
});

module.exports = services;
module.exports = {
  selectShiftSer,
  applyShiftSer,
  upcomingShiftSer,
  historyShiftSer,
  markCompleteShiftSer,
  addFavouriteClinicSer,
  getFavouriteClinicSer,
  cancelShiftSer,
};
