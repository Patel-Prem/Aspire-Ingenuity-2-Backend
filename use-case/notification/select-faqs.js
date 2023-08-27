const faqs = require("./faq");
const selectNotification = ({ userRepository, notificationRepository }) => {
  return async function select(user) {
    return faqs;
  };
};

module.exports = selectNotification;
