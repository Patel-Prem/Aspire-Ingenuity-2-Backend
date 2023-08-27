const {
  selectShiftController,
  selectClinicShiftController,
  createShiftController,
  updateShiftController,
  deleteShiftController,
} = require("../../controller/shift");

const verifyClinicPersonJWT = require("../../middleware/verifyClinicPersonJWT");

const validateRequestSchema = require("../../middleware/validate-request-schema");
const { body } = require("express-validator");
const { createShiftBodyValidator } = require("../../validation/shift");

const route = ({ router, makeExpressCallback }) => {
  router.get(
    "/",
    verifyClinicPersonJWT,
    makeExpressCallback(selectShiftController)
  );
  router.get(
    "/:id",
    verifyClinicPersonJWT,
    makeExpressCallback(selectShiftController)
  );
  router.get(
    "/clinic/:id",
    verifyClinicPersonJWT,
    makeExpressCallback(selectClinicShiftController)
  );
  router.post(
    "/",
    createShiftBodyValidator,
    validateRequestSchema,
    verifyClinicPersonJWT,
    makeExpressCallback(createShiftController)
  );
  router.post(
    "/:id",
    createShiftBodyValidator,
    validateRequestSchema,
    verifyClinicPersonJWT,
    makeExpressCallback(updateShiftController)
  );
  router.delete(
    "/:id",
    verifyClinicPersonJWT,
    makeExpressCallback(deleteShiftController)
  );
  return router;
};

module.exports = route;
