const gettAccessToken = require("../config/firebase/firebaseconfig");
var request = require("request");

const sendNotification = async ({ token, title, body }) => {
  gettAccessToken().then(function (access_token) {
    console.log("Device token");
    console.log(token);
    request.post(
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
        url: "https://fcm.googleapis.com/v1/projects/aspiringingenuity-dac7c/messages:send",
        body: JSON.stringify({
          message: {
            token: token,
            notification: {
              body: body,
              title: title,
            },
          },
        }),
      },
      (error, response, body) => {
        console.log(body);
      }
    );
  });
};

module.exports = sendNotification;
