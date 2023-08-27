const {
  selectNotificationSer,
  markNotificationSer,
  selectFAQSer,
} = require("../../use-case/notification");

// #########

const selectNotificationFun = require("./select-notification");
const markNotificationFun = require("./mark-notification");
const selectFAQFun = require("./select-faqs");

// #########

const selectNotificationController = selectNotificationFun({
  selectNotificationSer,
});

const markNotificationController = markNotificationFun({
  markNotificationSer,
});

const selectFAQController = selectFAQFun({
  selectFAQSer,
});

// #########
const services = Object.freeze({
  selectNotificationController,
  markNotificationController,
  selectFAQController,
});

module.exports = services;
module.exports = {
  selectNotificationController,
  markNotificationController,
  selectFAQController,
};
