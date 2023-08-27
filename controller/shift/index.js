const {
  createShiftSer,
  selectShiftSer,
  selectClinicShiftSer,
  updateShiftSer,
  deleteShiftSer,
} = require("../../use-case/shift");
// #########

const createShiftFun = require("./insert-shift");
const selectShiftFun = require("./select-shift");
const selectClinicShiftFun = require("./select-clinic-shift");
const updateShiftFun = require("./update-shift");
const deleteShiftFun = require("./delete-shift");

// #########

const createShiftController = createShiftFun({ createShiftSer });
const selectShiftController = selectShiftFun({ selectShiftSer });
const selectClinicShiftController = selectClinicShiftFun({
  selectClinicShiftSer,
});
const updateShiftController = updateShiftFun({ updateShiftSer });
const deleteShiftController = deleteShiftFun({ deleteShiftSer });
// #########
const services = Object.freeze({
  createShiftController,
  selectShiftController,
  selectClinicShiftController,
  updateShiftController,
  deleteShiftController,
});

module.exports = services;
module.exports = {
  createShiftController,
  selectShiftController,
  selectClinicShiftController,
  updateShiftController,
  deleteShiftController,
};
