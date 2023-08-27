const {
  selectClinicSer,
  selectTSMSer,
  reviewDocumentSer,
  sendEmailBlastSer,
  banUserSer,
  unbanUserSer,
} = require("../../use-case/admin");
// #########

const selectClinicFun = require("./select-clinic");
const selectTSMFun = require("./select-tsm");
const reviewDocumentFun = require("./review-documents");
const sendEmailBlastFun = require("./send-email-blast");
const banUserFun = require("./ban-user");
const unbanUserFun = require("./unban-user");

// #########

const selectClinicController = selectClinicFun({ selectClinicSer });
const selectTSMController = selectTSMFun({ selectTSMSer });
const reviewDocumentController = reviewDocumentFun({ reviewDocumentSer });
const sendEmailBlastController = sendEmailBlastFun({ sendEmailBlastSer });
const banUserController = banUserFun({ banUserSer });
const unbanUserController = unbanUserFun({ unbanUserSer });

// #########
const services = Object.freeze({
  selectClinicController,
  selectTSMController,
  reviewDocumentController,
  sendEmailBlastController,
  banUserController,
  unbanUserController,
});

module.exports = services;
module.exports = {
  selectClinicController,
  selectTSMController,
  reviewDocumentController,
  sendEmailBlastController,
  banUserController,
  unbanUserController,
};
