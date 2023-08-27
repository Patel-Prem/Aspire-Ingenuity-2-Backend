const {
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
} = require("../../use-case/dcp");

// #########

const acceptShiftFun = require("./accept-shift");
const availableTSMFun = require("./available-tsm");
const markCompleteShiftFun = require("./mark-complete-shift");
const selectShiftHistoryFun = require("./history-shift");
const rateTSMFun = require("./rate-tsm");
const favTSMFun = require("./fav-tsm");
const selectFavTSMFun = require("./select-fav-tsm");
const setUpPaymentFun = require("./setup-payment");
const getPaymentMethodFun = require("./get-payment-method");
const getPaymentMethod = require("./get-payment-method");
const deletePaymentMethod = require("./del-payment-method");

// #########

const acceptShiftController = acceptShiftFun({ acceptShiftSer });
const availableTSMController = availableTSMFun({ availableTSMSer });
const markCompleteShiftController = markCompleteShiftFun({
  markCompleteShiftSer,
});

const selectShiftHistoryController = selectShiftHistoryFun({
  selectShiftHistorySer,
});

const rateTSMController = rateTSMFun({ rateTSMSer });
const favTSMController = favTSMFun({ favTSMSer });
const selectFavTSMController = selectFavTSMFun({ selectFavTSMSer });
const setUpPaymentController = setUpPaymentFun({ setUpPaymentSer });
const getPaymentMethodController = getPaymentMethod({ getPaymentMethodSer });
const deletePaymentMethodController = deletePaymentMethod({
  deletePaymentMethodSer,
});

// #########
const services = Object.freeze({
  acceptShiftController,
  availableTSMController,
  markCompleteShiftController,
  rateTSMController,
  favTSMController,
  selectFavTSMController,
  setUpPaymentController,
  getPaymentMethodController,
  deletePaymentMethodController,
});

module.exports = services;
module.exports = {
  acceptShiftController,
  availableTSMController,
  markCompleteShiftController,
  selectShiftHistoryController,
  rateTSMController,
  favTSMController,
  selectFavTSMController,
  setUpPaymentController,
  getPaymentMethodController,
  deletePaymentMethodController,
};
