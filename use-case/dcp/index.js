const shiftRepository = require("../../data-access/shift");
const userRepository = require("../../data-access/user");
const clinicRepository = require("../../data-access/clinic");
const userShiftRepository = require("../../data-access/user-shift");
const profileRepository = require("../../data-access/profile");
const clinicUserRepository = require("../../data-access/clinic-user");

const acceptShiftFun = require("./accept-shift");
const availableTSMFun = require("./available-tsm");
const markCompleteShiftFun = require("./mark-complete-shift");
const selectShiftHistoryFun = require("./history-shift");
const rateTSMFun = require("./rate-tsm");
const favTSMFun = require("./fav-tsm");
const selectFavTSMFun = require("./select-fav-tsm");
const setUpPaymentFun = require("./setup-payment");
const getPaymentMethodFun = require("./get-payment-method");
const deletePaymentMethodFun = require("./del-payment-method");

const acceptShiftSer = acceptShiftFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
});

const availableTSMSer = availableTSMFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
});

const markCompleteShiftSer = markCompleteShiftFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
});

const rateTSMSer = rateTSMFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
});

const favTSMSer = favTSMFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
  clinicUserRepository,
});

const selectFavTSMSer = selectFavTSMFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
  clinicUserRepository,
});

const selectShiftHistorySer = selectShiftHistoryFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
});

const setUpPaymentSer = setUpPaymentFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
});

const getPaymentMethodSer = getPaymentMethodFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
});

const deletePaymentMethodSer = deletePaymentMethodFun({
  shiftRepository,
  userRepository,
  clinicRepository,
  userShiftRepository,
});

const services = Object.freeze({
  acceptShiftSer,
  availableTSMSer,
  rateTSMSer,
  favTSMSer,
  selectFavTSMSer,
  setUpPaymentSer,
  getPaymentMethodSer,
  deletePaymentMethodSer,
});

module.exports = services;
module.exports = {
  acceptShiftSer,
  availableTSMSer,
  markCompleteShiftSer,
  selectShiftHistorySer,
  rateTSMSer,
  favTSMSer,
  selectFavTSMSer,
  setUpPaymentSer,
  getPaymentMethodSer,
  deletePaymentMethodSer,
};
