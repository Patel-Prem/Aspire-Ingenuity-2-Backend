const ValidationError = require("../../error/validationError");
const { acceptEmail, rejectEmail } = require("../../util/emailTemplates");
const { sendMail } = require("../../util/emailUtils");
const { sendAllNotification } = require("../../util/allnotification");

const reviewDocument = ({
  clinicRepository,
  userRepository,
  profileRepository,
  notificationRepository,
}) => {
  return async function select(user, tsmId, model) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    // Get TSM Profile

    const existingProfile = await profileRepository.getByUserId(tsmId);
    const tsmUSer = await userRepository.getOne(tsmId);

    if (!existingProfile) {
      throw new ValidationError("No profile exists to review the documents");
    }
    if (
      ![
        "APPROVED",
        "PENDING_APPROVAL",
        "REUPLOAD_REQUEST_CERTIFICATE",
        "NO_CERTIFICATE_PROVIDED",
      ].includes(model.documentStatus)
    ) {
      throw new ValidationError(
        "Document Status should be either APPROVED, PENDING_APPROVAL, REUPLOAD_REQUEST_CERTIFICATE "
      );
    }

    model.status = model.documentStatus;
    await profileRepository.update(existingProfile.id, model);

    if (model.documentStatus == "APPROVED") {
      const html = acceptEmail(tsmUSer.email);
      const text = "text";

      // Send notification to TSM
      sendAllNotification({
        userId: tsmUSer.id,
        subject: "Your Documents Are Approved",
        bodyPlain: "Your Documents Are Approved",
        bodyHtml: html,
      });
    }
    if (model.documentStatus == "REUPLOAD_REQUEST_CERTIFICATE") {
      const html = rejectEmail(tsmUSer.email);
      const text = "text";

      sendAllNotification({
        userId: tsmUSer.id,
        subject: "Your Documents Are rejected. Please reupload",
        bodyPlain: "Your Documents Are rejected. Please reupload",
        bodyHtml: html,
      });
    }

    return profileRepository.getOne(existingProfile.id);
  };
};

module.exports = reviewDocument;
