const shiftRepository = require("../../data-access/shift");
const userRepository = require("../../data-access/user");
const clinicRepository = require("../../data-access/clinic");
const userShiftRepository = require("../../data-access/user-shift");

const createShiftFun = require("./insert-shift");
const selectShiftFun = require("./select-shift");
const selectClinicShiftFun = require("./select-clinic-shift");
const updateShiftFun = require("./update-shift");
const deleteShiftFun = require("./delete-shift");

const createShiftSer = createShiftFun({
  shiftRepository,
  userRepository,
  clinicRepository,
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
  userShiftRepository,
});
const deleteShiftSer = deleteShiftFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
});

const services = Object.freeze({
  createShiftSer,
  selectShiftSer,
  selectClinicShiftSer,
  updateShiftSer,
  deleteShiftSer,
});

module.exports = services;
module.exports = {
  createShiftSer,
  selectShiftSer,
  selectClinicShiftSer,
  updateShiftSer,
  deleteShiftSer,
};
