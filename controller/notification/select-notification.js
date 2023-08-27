const selectNotificationFun = ({ selectNotificationSer }) => {
  return async function get(httpRequest) {
    console.log("User is ");
    console.log(httpRequest.user);
    const Notifications = await selectNotificationSer(httpRequest.user);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: Notifications,
    };
  };
};

module.exports = selectNotificationFun;
