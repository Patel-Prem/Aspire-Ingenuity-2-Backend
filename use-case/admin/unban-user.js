const ValidationError = require("../../error/validationError");

const banUser = ({ clinicRepository, userRepository, profileRepository }) => {
  return async function select(user, body) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    if (body.userIds == null || body.userIds.length < 0) {
      throw new ValidationError("User Ids can not be empty!");
    }
    // Get TSM Profile
    let users = [];
    for (let userId of body.userIds) {
      const user = await userRepository.getOne(userId);
      users.push(user);
      if (!user) {
        return new ValidationError("User Id does not exist! >" + userId);
      }
    }

    for (let userId of body.userIds) {
      const updatedUser = await userRepository.update(userId, {
        isBannedByAdmin: false,
      });
    }
    return users.map((u) => ({ ...u, isBannedByAdmin: false }));
  };
};

module.exports = banUser;
