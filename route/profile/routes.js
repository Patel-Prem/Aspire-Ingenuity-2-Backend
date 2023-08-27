const {
  selectShiftController,
  selectClinicShiftController,
  createShiftController,
  updateShiftController,
  deleteShiftController,
} = require("../../controller/shift");
const {
  createUserProfileController,
  updateUserProfileController,
  uploadFileController,
  createUserAvailabilityController,
  updateUserAvailabilityController,
  selectUserProfileController,
  createUserEducationController,
  updateUserEducationController,
  deleteUserEducationController,
} = require("../../controller/profile");

const verifyTmpStaffMemJWT = require("../../middleware/verifyTmpStaffMemJWT");

const validateRequestSchema = require("../../middleware/validate-request-schema");
const { body } = require("express-validator");
const { createShiftBodyValidator } = require("../../validation/shift");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const cuUpload = upload.fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "resume", maxCount: 1 },
  { name: "certificate", maxCount: 1 },
]);

const route = ({ router, makeExpressCallback }) => {
  router.post(
    "/",
    verifyTmpStaffMemJWT,
    makeExpressCallback(createUserProfileController)
  );

  router.post(
    "/update",
    verifyTmpStaffMemJWT,
    makeExpressCallback(updateUserProfileController)
  );

  router.get(
    "/",
    verifyTmpStaffMemJWT,
    makeExpressCallback(selectUserProfileController)
  );

  router.post(
    "/availabilities",
    verifyTmpStaffMemJWT,
    makeExpressCallback(createUserAvailabilityController)
  );

  // router.post(
  //   "/availabilities/:id",
  //   verifyTmpStaffMemJWT,
  //   makeExpressCallback(updateUserAvailabilityController)
  // );

  router.post(
    "/educations",
    verifyTmpStaffMemJWT,
    makeExpressCallback(createUserEducationController)
  );

  router.post(
    "/educations/:id",
    verifyTmpStaffMemJWT,
    makeExpressCallback(updateUserEducationController)
  );

  router.delete(
    "/educations/:id",
    verifyTmpStaffMemJWT,
    makeExpressCallback(deleteUserEducationController)
  );

  router.post(
    "/upload",
    verifyTmpStaffMemJWT,
    cuUpload,
    makeExpressCallback(uploadFileController)
  );

  return router;
};

module.exports = route;
