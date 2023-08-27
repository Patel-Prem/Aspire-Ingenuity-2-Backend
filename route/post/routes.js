const {
  selectPostController,
  createPostController,
  updatePostController,
  deletePostController,
  notificationTestController,
} = require("../../controller/post");

const route = ({ router, makeExpressCallback }) => {
  router.get(
    "/notificationtest/notify",
    makeExpressCallback(notificationTestController)
  );
  router.get("/", makeExpressCallback(selectPostController));
  router.get("/:id", makeExpressCallback(selectPostController));
  router.post("/", makeExpressCallback(createPostController));
  router.post("/:id", makeExpressCallback(updatePostController));
  router.delete("/:id", makeExpressCallback(deletePostController));

  return router;
};

module.exports = route;
