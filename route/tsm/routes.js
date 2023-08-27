const {
  selectShiftController,
  applyShiftController,
  upcomingShiftController,
  histroyShiftController,
  markCompleteShiftController,
  addFavouriteClinicController,
  getFavouriteClinicController,
  cancelShiftController,
} = require("../../controller/tsm");

const verifyTemporarayStaffMemberJWT = require("../../middleware/verifyTmpStaffMemJWT");

const validateRequestSchema = require("../../middleware/validate-request-schema");
const { body } = require("express-validator");
const { createShiftBodyValidator } = require("../../validation/shift");

const route = ({ router, makeExpressCallback }) => {
  router.get(
    "/shift",
    verifyTemporarayStaffMemberJWT,
    makeExpressCallback(selectShiftController)
  );

  router.get(
    "/shift/history",
    verifyTemporarayStaffMemberJWT,
    makeExpressCallback(histroyShiftController)
  );

  router.get(
    "/shift/upcoming",
    verifyTemporarayStaffMemberJWT,
    makeExpressCallback(upcomingShiftController)
  );

  router.post(
    "/apply",
    verifyTemporarayStaffMemberJWT,
    makeExpressCallback(applyShiftController)
  );

  router.post(
    "/markcomplete",
    verifyTemporarayStaffMemberJWT,
    makeExpressCallback(markCompleteShiftController)
  );

  router.post(
    "/cancelshift",
    verifyTemporarayStaffMemberJWT,
    makeExpressCallback(cancelShiftController)
  );

  router.post(
    "/addfavourite",
    verifyTemporarayStaffMemberJWT,
    makeExpressCallback(addFavouriteClinicController)
  );
  router.get(
    "/getfavourite",
    verifyTemporarayStaffMemberJWT,
    makeExpressCallback(getFavouriteClinicController)
  );

  return router;
};

module.exports = route;
