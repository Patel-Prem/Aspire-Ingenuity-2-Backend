const {
  selectNotificationController,
  markNotificationController,
  selectFAQController,
} = require("../../controller/notification");

const loggedInVerify = require("../../middleware/verifyLoggedInUser");

const route = ({ router, makeExpressCallback }) => {
  router.get(
    "/notifications",
    loggedInVerify,
    makeExpressCallback(selectNotificationController)
  );
  router.post(
    "/notifications/mark",
    loggedInVerify,
    makeExpressCallback(markNotificationController)
  );
  router.get("/faqs", makeExpressCallback(selectFAQController));
  return router;
};

module.exports = route;
