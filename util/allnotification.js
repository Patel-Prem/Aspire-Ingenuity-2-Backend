const notificationRepository = require("../data-access/notification");
const userRepository = require("../data-access/user");
const { sendMail } = require("../util/emailUtils");
const sendPushNotifiation = require("./notification");

const sendAllNotification = async ({
  userId,
  subject,
  bodyPlain,
  bodyHtml,
}) => {
  try {
    const user = await userRepository.getOne(userId);
    // notification Repository
    notificationRepository.add({
      userId: user.id,
      message: subject,
      time: new Date(),
      isRead: false,
    });
    // mail
    sendMail({
      to: user.email,
      from: "aspiringingenuity@gmail.com",
      subject: subject,
      text: "text",
      html: bodyHtml,
    });
    //push notification

    if (user.device_token_firebase) {
      await sendPushNotifiation({
        token: user.device_token_firebase,
        title: subject,
        body: bodyPlain,
      });
    }
  } catch (error) {
    console.log("Error in Notifiying");
    console.log(error);
  }
};

module.exports = { sendAllNotification };
