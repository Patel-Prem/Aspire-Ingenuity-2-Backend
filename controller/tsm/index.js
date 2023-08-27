const {
  selectShiftSer,
  applyShiftSer,
  upcomingShiftSer,
  historyShiftSer,
  markCompleteShiftSer,
  addFavouriteClinicSer,
  getFavouriteClinicSer,
  cancelShiftSer,
} = require("../../use-case/tsm");
// #########

const selectShiftFun = require("./select-shift");
const applyShiftFun = require("./apply-shift");
const upcomingShiftFun = require("./upcoming-shift");
const histroyShiftFun = require("./history-shift");
const markCompleteShiftFun = require("./mark-complete-shift");
const cancelShiftFun = require("./cancel-shift");
const addFavouriteClinicFun = require("./add-favourite");
const getFavouriteClinicFun = require("./get-favourite");

// #########

const selectShiftController = selectShiftFun({ selectShiftSer });
const applyShiftController = applyShiftFun({ applyShiftSer });
const upcomingShiftController = upcomingShiftFun({ upcomingShiftSer });
const histroyShiftController = histroyShiftFun({ historyShiftSer });
const markCompleteShiftController = markCompleteShiftFun({
  markCompleteShiftSer,
});
const cancelShiftController = cancelShiftFun({
  cancelShiftSer,
});

const addFavouriteClinicController = addFavouriteClinicFun({
  addFavouriteClinicSer,
});

const getFavouriteClinicController = getFavouriteClinicFun({
  getFavouriteClinicSer,
});

// #########
const services = Object.freeze({
  selectShiftController,
  applyShiftController,
  upcomingShiftController,
  histroyShiftController,
  markCompleteShiftController,
  getFavouriteClinicController,
  cancelShiftController,
});

module.exports = services;
module.exports = {
  selectShiftController,
  applyShiftController,
  upcomingShiftController,
  histroyShiftController,
  markCompleteShiftController,
  addFavouriteClinicController,
  getFavouriteClinicController,
  cancelShiftController,
};
