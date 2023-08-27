const ValidationError = require("../../error/validationError");

const saveDeviceToken = ({ authRepository }) => {
  return async function update(model, user) {
    const loggedInUser = await authRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }

    // check if other userwith same device token exists
    const usersWithToken = await authRepository.getAllUserwithTheDeviceToken(
      model.token
    );

    if (usersWithToken.length > 0) {
      const ids = usersWithToken
        .filter((user) => user.id != loggedInUser.id)
        .map((user) => user.id);

      //set the notification token for all other users to ""
      console.log("Multiple users loggeed in from same device found===>");
      console.log("Deleting the other access token");
      await authRepository.updateMany(ids, { device_token_firebase: null });
    }

    return authRepository.update(loggedInUser.id, {
      device_token_firebase: model.token,
    });
  };
};

module.exports = saveDeviceToken;
