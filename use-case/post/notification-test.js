const gettAccessToken = require("../../config/firebase/firebaseconfig");
var request = require("request");
const sendNotification = require("../../util/notification");

const selectPost = ({ postRepository }) => {
  return async function select(token) {
    sendNotification({
      token: token,
      title: "Congratulations!",
      body: "You got a new shift At Fox Dental",
    });
    return {
      token: token,
      title: "Congratulations!",
      body: "You got a new shift At Fox Dental",
      Notificationstatus: "Send",
    };
  };
};

module.exports = selectPost;
