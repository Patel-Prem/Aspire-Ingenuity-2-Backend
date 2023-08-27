const {
  selectPostSer,
  createPostSer,
  updatePostSer,
  deletePostSer,
  notificationTestSer,
} = require("../../use-case/post");
// #########

const selectPostFun = require("./select-post");
const createPostFun = require("./insert-post");
const updatePostFun = require("./update-post");
const deletePostFun = require("./delete-post");
const notificationTestFun = require("./notification-test");

// #########

const selectPostController = selectPostFun({ selectPostSer });
const createPostController = createPostFun({ createPostSer });
const updatePostController = updatePostFun({ updatePostSer });
const deletePostController = deletePostFun({ deletePostSer });
const notificationTestController = notificationTestFun({ notificationTestSer });

// #########
const services = Object.freeze({
  selectPostController,
  createPostController,
  updatePostController,
  deletePostController,
  notificationTestController,
});

module.exports = services;
module.exports = {
  selectPostController,
  createPostController,
  updatePostController,
  deletePostController,
  notificationTestController,
};
