const ValidationError = require("../../error/validationError");
const { sendMultipleMail } = require("../../util/emailUtils");

const selectTSM = ({ clinicRepository, userRepository }) => {
  return async function select(user, body) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("UnAuthorized!");
    }
    if (body.userIds == null || body.userIds.length < 0) {
      throw new ValidationError("User Ids can not be empty!");
    }

    if (body.subject == null || body.subject.trim() == "") {
      throw new ValidationError("Email Subject can not be empty!");
    }

    if (body.text == null || body.text.trim() == "") {
      throw new ValidationError("Email Text can not be empty!");
    }
    // console.log(body);
    // console.log(body);
    let emails = [];
    for (let userId of body.userIds) {
      console.log("userId");
      console.log(userId);
      const user = await userRepository.getOne(userId);
      if (!user) {
        throw new ValidationError(
          "Invalid! User id does not exist! =>" + userId
        );
      }
      emails.push(user.email);
    }

    console.log("emails");
    console.log(emails);
    if (emails.length < 0) {
      return {
        message: "No email Sent!",
      };
    } else {
      const response = await sendMultipleMail({
        emails: emails,
        from: "admin@tempsii.com",
        subject: body.subject,
        text: body.text,
      });
      return response;
    }
  };
};

module.exports = selectTSM;
