const markNotificationFun = ({ markNotificationSer }) => {
  return async function get(httpRequest) {
    console.log("User is ");
    console.log(httpRequest.user);
    const Notifications = await markNotificationSer(
      httpRequest.user,
      httpRequest.body
    );
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: Notifications,
    };
  };
};

module.exports = markNotificationFun;
