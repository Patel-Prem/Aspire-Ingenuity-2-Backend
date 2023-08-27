const selectPostsFun = require("./select-post");
const createPostFun = require("./insert-post");
const updatePostFun = require("./update-post");
const deletePostFun = require("./delete-post");
const notificationTestFun = require("./notification-test");

const postRepository = require("../../data-access/post");

const selectPostSer = selectPostsFun({ postRepository });
const createPostSer = createPostFun({ postRepository });
const updatePostSer = updatePostFun({ postRepository });
const deletePostSer = deletePostFun({ postRepository });
const notificationTestSer = notificationTestFun({ postRepository });

const services = Object.freeze({
  selectPostSer,
  createPostSer,
  updatePostSer,
  deletePostSer,
});

module.exports = services;
module.exports = {
  selectPostSer,
  createPostSer,
  updatePostSer,
  deletePostSer,
  notificationTestSer,
};
