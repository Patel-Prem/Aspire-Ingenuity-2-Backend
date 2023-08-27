const selectNotificationFun = require("./select-notification");
const markNotificationFun = require("./mark-notification");
const selectFAQFun = require("./select-faqs");

const notificationRepository = require("../../data-access/notification");
const userRepository = require("../../data-access/user");

const selectNotificationSer = selectNotificationFun({
  userRepository,
  notificationRepository,
});

const markNotificationSer = markNotificationFun({
  userRepository,
  notificationRepository,
});

const selectFAQSer = selectFAQFun({
  userRepository,
  notificationRepository,
});

const services = Object.freeze({
  selectNotificationSer,
  markNotificationSer,
  selectFAQSer,
});

module.exports = services;
module.exports = {
  selectNotificationSer,
  markNotificationSer,
  selectFAQSer,
};
