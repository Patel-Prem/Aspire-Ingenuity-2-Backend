const {
  createClinicController,
  selectClinicController,
  updateClinicController,
  deleteClinicController,
} = require("../../controller/clinic");
const verifyClinicPersonJWT = require("../../middleware/verifyClinicPersonJWT");
const route = ({ router, makeExpressCallback }) => {
  router.post(
    "/",
    verifyClinicPersonJWT,
    makeExpressCallback(createClinicController)
  );
  router.get(
    "/",
    verifyClinicPersonJWT,
    makeExpressCallback(selectClinicController)
  );
  router.get(
    "/:id",
    verifyClinicPersonJWT,
    makeExpressCallback(selectClinicController)
  );
  router.post(
    "/:id",
    verifyClinicPersonJWT,
    makeExpressCallback(updateClinicController)
  );
  router.delete(
    "/:id",
    verifyClinicPersonJWT,
    makeExpressCallback(deleteClinicController)
  );
  return router;
};

module.exports = route;
