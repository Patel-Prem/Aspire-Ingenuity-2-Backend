const selectNotification = ({ userRepository, notificationRepository }) => {
  return async function select(user) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    return notificationRepository.getNotificationsOfUser(loggedInUser.id);
  };
};

module.exports = selectNotification;
