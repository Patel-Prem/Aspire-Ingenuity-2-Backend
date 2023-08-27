const {
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
} = require("../../controller/dcp");

const verifyDentalClinicPersonnel = require("../../middleware/verifyClinicPersonJWT");

const validateRequestSchema = require("../../middleware/validate-request-schema");
const { body } = require("express-validator");
const { createShiftBodyValidator } = require("../../validation/shift");

const route = ({ router, makeExpressCallback }) => {
  router.post(
    "/accept",
    verifyDentalClinicPersonnel,
    makeExpressCallback(acceptShiftController)
  );

  router.post(
    "/availabletsm/shift/:id",
    verifyDentalClinicPersonnel,
    makeExpressCallback(availableTSMController)
  );

  router.post(
    "/markcomplete",
    verifyDentalClinicPersonnel,
    makeExpressCallback(markCompleteShiftController)
  );

  router.post(
    "/ratetsm",
    verifyDentalClinicPersonnel,
    makeExpressCallback(rateTSMController)
  );

  router.post(
    "/favtsm",
    verifyDentalClinicPersonnel,
    makeExpressCallback(favTSMController)
  );
  router.post(
    "/favtsm",
    verifyDentalClinicPersonnel,
    makeExpressCallback(favTSMController)
  );

  router.post(
    "/get-favtsm",
    verifyDentalClinicPersonnel,
    makeExpressCallback(selectFavTSMController)
  );

  router.get(
    "/shift/history",
    verifyDentalClinicPersonnel,
    makeExpressCallback(selectShiftHistoryController)
  );
  router.post(
    "/payment/setup",
    verifyDentalClinicPersonnel,
    makeExpressCallback(setUpPaymentController)
  );

  router.post(
    "/payment/retrieve",
    verifyDentalClinicPersonnel,
    makeExpressCallback(getPaymentMethodController)
  );

  router.post(
    "/payment/delete",
    verifyDentalClinicPersonnel,
    makeExpressCallback(deletePaymentMethodController)
  );

  return router;
};

module.exports = route;
