const ValidationError = require("../../error/validationError");

const resetPasswordEmail = ({ resetPasswordEmailSer }) => {
  return async function get(httpRequest) {
    const resp = await resetPasswordEmailSer({
      email: httpRequest.body.email,
    });
    return {
      headers: {
        "Content-Type": "application/json",
      },
      statusCode: 200,
      body: resp,
    };
  };
};

module.exports = resetPasswordEmail;
