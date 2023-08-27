const {
  selectClinicController,
  selectTSMController,
  reviewDocumentController,
  sendEmailBlastController,
  banUserController,
  unbanUserController,
} = require("../../controller/admin");

const verifyAdminMemberJWT = require("../../middleware/verifyAdminPersonJWT");

const validateRequestSchema = require("../../middleware/validate-request-schema");
const { body } = require("express-validator");
const { createShiftBodyValidator } = require("../../validation/shift");

const route = ({ router, makeExpressCallback }) => {
  router.get(
    "/clinics",
    verifyAdminMemberJWT,
    makeExpressCallback(selectClinicController)
  );
  router.get(
    "/clinics/:id",
    verifyAdminMemberJWT,
    makeExpressCallback(selectClinicController)
  );
  router.get(
    "/tsms",
    verifyAdminMemberJWT,
    makeExpressCallback(selectTSMController)
  );

  router.get(
    "/tsms/:id",
    verifyAdminMemberJWT,
    makeExpressCallback(selectTSMController)
  );

  router.post(
    "/reviewdocument/tsm/:id",
    verifyAdminMemberJWT,
    makeExpressCallback(reviewDocumentController)
  );

  router.post(
    "/sendEmailBlast",
    verifyAdminMemberJWT,
    makeExpressCallback(sendEmailBlastController)
  );

  router.post(
    "/banuser",
    verifyAdminMemberJWT,
    makeExpressCallback(banUserController)
  );

  router.post(
    "/unbanuser",
    verifyAdminMemberJWT,
    makeExpressCallback(unbanUserController)
  );
  return router;
};

module.exports = route;
