const ValidationError = require("../../error/validationError");

const selectNotification = ({ userRepository, notificationRepository }) => {
  return async function select(user, body) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    // mark the notification as read
    if (
      body.notificationIds == null ||
      body.notificationIds == "" ||
      body.notificationIds.length == 0
    ) {
      throw new ValidationError(
        "Invalid Request! Notifications Ids can not be empty"
      );
    }

    if (body.isRead == null || ![true, false].includes(body.isRead)) {
      throw new ValidationError(
        "Invalid Request! isRead is missing or isRead can only be boolean true or false"
      );
    }

    for (const id of body.notificationIds) {
      const notification =
        await notificationRepository.getNotificationsByUserIdAndId(
          loggedInUser.id,
          id
        );
      if (!notification) {
        throw new ValidationError(
          "Invalid Request! one of notifications does not belong to logged in user"
        );
      }
    }
    for (const id of body.notificationIds) {
      await notificationRepository.update(id, { isRead: body.isRead });
    }
    return notificationRepository.getNotificationsOfUser(loggedInUser.id);
  };
};

module.exports = selectNotification;
