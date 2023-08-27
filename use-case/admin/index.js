const clinicRepository = require("../../data-access/clinic");
const userRepository = require("../../data-access/user");
const profileRepository = require("../../data-access/profile");
const notificationRepository = require("../../data-access/notification");

const selectClinicFun = require("./select-clinic");
const selectTSMFun = require("./select-tsm");
const reviewDocumentFun = require("./review-document");
const sendEmailBlastFun = require("./send-email-blast");
const banUserFun = require("./bann-user");
const unbanUserFun = require("./unban-user");

const selectClinicSer = selectClinicFun({ clinicRepository, userRepository });
const selectTSMSer = selectTSMFun({ clinicRepository, userRepository });
const reviewDocumentSer = reviewDocumentFun({
  profileRepository,
  clinicRepository,
  userRepository,
  notificationRepository,
});

const banUserSer = banUserFun({
  profileRepository,
  clinicRepository,
  userRepository,
});

const unbanUserSer = unbanUserFun({
  profileRepository,
  clinicRepository,
  userRepository,
});

const sendEmailBlastSer = sendEmailBlastFun({
  clinicRepository,
  userRepository,
});

const services = Object.freeze({
  selectClinicSer,
  selectTSMSer,
  reviewDocumentSer,
  sendEmailBlastSer,
  banUserSer,
  unbanUserSer,
});

module.exports = services;
module.exports = {
  selectClinicSer,
  selectTSMSer,
  reviewDocumentSer,
  sendEmailBlastSer,
  banUserSer,
  unbanUserSer,
};
